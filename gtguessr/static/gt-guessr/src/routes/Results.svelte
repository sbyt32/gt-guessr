<script lang="ts">
    import MapMarker from "../assets/MapMarker.svelte";
    import Map from "../lib/Map.svelte";
    import {startGame, goHome} from "../assets/game"
    import { gameState, gameData, gameScore, userGuess, gameTimer, gameAnswers } from "./store";
    import { onDestroy } from "svelte";

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

    const roundData:string = $gameData.loc_ids[$gameState - 1]

    async function submitResults():Promise<GameAnswer> {


        let resp = await fetch(`http://127.0.0.1:8000/api/answer/${roundData}/${$userGuess.lat}/${$userGuess.lng}`, {
            method: "POST",
            mode: "cors"
        })

        let result = await resp.json()
        $gameAnswers[roundData] = result.actual
        $gameScore += result.score

        return result
    }

    onDestroy(() => {
        $gameTimer.total += $gameTimer.current
        $gameTimer.current = 0
    })

    function computeTime(time:number) {
        return `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${(time % 60)}`: time % 60}`
    }
</script>
{#if $gameState == -1}

<Map zoom={15} h={"100vh"} w={"100vw"} interactive={false}>
{#each Object.entries($gameAnswers) as [title, points]}
    <MapMarker lat={points.lat} lon={points.long} answer={true} label={title}/>
{/each}
</Map>
<div class="relative flex text-center h-screen place-items-end">

    <div class="container z-20 mx-auto pb-10">
        <div class="max-w-sm text-center bg-white/90 m-auto py-3">
            <div>Final Results</div>
            <div>Time Elapsed: {computeTime($gameTimer.total)}</div>
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
        <MapMarker lat={results.actual.lat} lon={results.actual.long} answer={true} label={roundData}/>
        <MapMarker lat={results.guess.lat} lon={results.guess.long} label="Your Guess!"/>
    </Map>
    <div class="relative flex text-center h-screen place-items-end">

        <div class="container z-20 mx-auto pb-10">
            <div class="max-w-sm text-center bg-white/90 m-auto py-3">
                <div>Round {$gameState} of 5</div>
                <div>You guessed {results.distance.toFixed(1)} feet away in {computeTime($gameTimer.current)}</div>
                <div class="">Score:{results.score}</div>

                <button class="p-2 px-4" on:click={() => startGame()}>
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
