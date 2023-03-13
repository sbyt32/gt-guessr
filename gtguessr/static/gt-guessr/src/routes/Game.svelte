<script lang="ts">
    import Image from "../lib/Image.svelte";
    import { gameState, type GameLocationData, gameData, gameScore, userGuess, gameTimer} from "./store";
    import Map from '../lib/Map.svelte'
    import {push} from 'svelte-spa-router'
    import { onDestroy } from "svelte";

    async function startNewRound() {
        if ($gameData === null) {
            let resp = await fetch("http://127.0.0.1:8000/api/game_sequence/")
            let gameSessionData:GameLocationData = await resp.json()
            
            $gameData = gameSessionData
        }
        $gameState += 1
        return $gameData.loc_ids[$gameState - 1]
    }

    function submitResults() {
        push('#/results/')
        
    }
    let timer = setInterval(() => {$gameTimer.current += 1}, 1000)
    onDestroy(() => {
        clearInterval(timer)
    })
</script>
{#await startNewRound() then roundData}
    <div class="m-0 h-screen grid grid-rows-1 grid-cols-8  relative">
        <!-- Left Panel -->
        <div class="col-span-1 text-left sidebar pt-4 bg-white pb-8">
            <h1>GTGuessr</h1>
            <div class="title">Round</div>
            <div class="info">{$gameState}</div>
            <div class="title">Timer</div>
            <div class="info">{$gameTimer.current}</div>
            <div class="title">Score</div>
            <div class="info">{$gameScore}</div>
            <button class="w-fit px-8 m-12 p-4 shadow-md" on:click={() => submitResults()}>Submit</button>


            {#if $userGuess.lat != 0}
            <div class="text-lg">
                <div class="text">
                    Selected Position
                </div>
                <div class="text-base">
                    Longitude: {$userGuess.lng}
                </div>
                <div class="text-base">
                    Latitude: {$userGuess.lat}
                </div>
            </div>
     
            {/if}

        </div>


        <!-- Right Panel -->
        <div class="col-span-7">

                <Image image={roundData}/>

                <Map/>

        </div>
        

        
    </div>

    <!-- <Map>

    </Map> -->
{/await}

<style lang="postcss">
    .sidebar {
        @apply text-2xl;
    }
    .sidebar .info {
        @apply text-gray-500 ;
    }
    .sidebar .title {
        @apply text-lg font-bold;
    }
</style>

