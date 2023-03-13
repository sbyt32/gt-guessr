<script lang="ts">
    import MapMarker from "../assets/MapMarker.svelte";
    import Map from "../lib/Map.svelte";
    import {startGame, goHome} from "../assets/game"

    interface GameAnswer {
        guess: {
            lat: number
            long: number
        },
        actual: {
            lat: number
            long: number
        },
        score: number
        distance: number
    }

    import { gameState, gameData, gameScore, userGuess, gameTimer } from "./store";
    import { onDestroy } from "svelte";
    const roundData:string = $gameData.loc_ids[$gameState - 1]

    async function submitResults():Promise<GameAnswer> {
        
        let resp = await fetch(`http://127.0.0.1:8000/api/answer/${roundData}/${$userGuess.lat}/${$userGuess.lng}`, {
            method: "POST",
            mode: "cors"
        })

        let result = await resp.json()
        $gameScore += result.score

        return result
    }

    onDestroy(() => {
        $gameTimer.total += $gameTimer.current
        $gameTimer.current = 0
    })
</script>
{#if $gameState == -1}

<Map zoom={15} h={"100vh"} w={"100vw"} interactive={false}>

</Map>
<div class="relative flex text-center h-screen place-items-end">

    <div class="container z-20 mx-auto pb-10">
        <div class="max-w-sm text-center bg-white/90 m-auto py-3">
            <div>Final Results</div>
            <div>Time Elapsed:{$gameTimer.total}</div>
            <div class="">Score:{$gameScore}</div>

            <button on:click={() => goHome()}>
                Play Again!
            </button>
        </div>

    </div>
</div>

{:else}
    {#await submitResults() then results}
    <Map lat={results.actual.lat} lon={results.actual.long} zoom={15} h={"100vh"} w={"100vw"} interactive={false}>
        <MapMarker lat={results.actual.lat} lon={results.actual.long} answer={true}/>
        <MapMarker lat={results.guess.lat} lon={results.guess.long}/>
    </Map>
    <div class="relative flex text-center h-screen place-items-end">

        <div class="container z-20 mx-auto pb-10">
            <div class="max-w-sm text-center bg-white/90 m-auto py-3">
                <div>Round {$gameState} of 5</div>
                <div>You guessed {results.distance} feet away in {$gameTimer.current}</div>
                <div class="">Score:{results.score}</div>

                <button on:click={() => startGame()}>
                    Next Round
                </button>
            </div>


        </div>
    </div>
    {/await}
{/if}

<!-- {
    "guess": {
      "lat": 33.77567612307779,
      "long": -84.40236643482436
    },
    "actual": {
      "lat": 33.77509444444444,
      "long": -84.40070277777778
    },
    "score": 688,
    "distance": 548.1013498218488
} -->