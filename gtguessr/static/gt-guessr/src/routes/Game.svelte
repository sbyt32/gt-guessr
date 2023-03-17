<script lang="ts">
    import Image from "../lib/Image.svelte";
    import { gameState, type GameLocationData, gameData, gameScore, userGuess, gameTimer} from "./store";
    import Map from '../lib/Map.svelte'
    import {push} from 'svelte-spa-router'
    import { onDestroy } from "svelte";
    import { goHome } from "../assets/game";
    import {creators} from "../lib/Footer.svelte";

    async function startNewRound() {
        if ($gameState > 5) {
            goHome()
        }

        if ($gameData === null) {
            let resp = await fetch("http://127.0.0.1:8000/api/game_sequence/")
            let gameSessionData:GameLocationData = await resp.json()

            $gameData = gameSessionData
        }
        $gameState += 1
        return $gameData.loc_ids[$gameState - 1]
    }

    let timer = setInterval(() => {$gameTimer.current += 1}, 1000)

    $: timerString = `${Math.floor($gameTimer.current / 60)}:${$gameTimer.current % 60 < 10 ? `0${($gameTimer.current % 60)}`: $gameTimer.current % 60}`

    onDestroy(() => {
        clearInterval(timer)
    })
</script>
{#await startNewRound() then roundData}
    <div class="m-0 h-screen grid grid-rows-1 grid-cols-8  relative">
        <!-- Left Panel -->
        <div class="col-span-1 text-left sidebar pt-4 bg-white pb-8 max-sm:hidden flex-col flex">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h1 on:click={() => goHome()} class="cursor-pointer pb-4">GTGuessr</h1>
            <div class="title">Round</div>
            <div class="info">{$gameState}</div>
            <div class="title">Timer</div>
            <div class="info">{timerString}</div>
            <div class="title">Score</div>
            <div class="info">{$gameScore}</div>
            <button class="w-fit px-8 m-12 p-4 shadow-md disabled:opacity-50 " disabled='{$userGuess.lat == 0}' on:click={() => push('/results/')}>Submit</button>

            {#if $userGuess.lat != 0}
            <div class="text-lg grow">
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

            <!-- Credits -->
            <!-- <div class="place-content-end">
                {#each creators as creator}
                    <a href={creator.link} class="text-sm">
                        <p>        <i class="fa-brands fa-twitter"></i>{creator.user}</p>
                    </a>
                {/each}
            </div> -->

        </div>


        <!-- Right Panel -->
        <div class="col-span-7">
                <Image image={roundData}/>
                <Map/>
        </div>
    </div>

{/await}

<style lang="postcss">
    .sidebar {
        @apply text-2xl;
    }
    .sidebar .info {
        @apply text-ellipsis text-black ;
    }
    .sidebar .title {
        @apply text-gray-800 text-lg font-bold;
    }
</style>
