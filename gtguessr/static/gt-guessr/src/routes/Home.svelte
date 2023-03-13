<script>
    import Footer from '../lib/Footer.svelte';
    import {push} from 'svelte-spa-router'
    import {gameScore, gameState, gameData} from "./store"
    import {startGame} from "../assets/game"
</script>

<div class="grid grid-cols-6 grid-row-3">
    <div class="flex flex-col col-span-2 col-start-3">
        <h1 class="text-4xl font-bold mt-8">GTGuessr</h1>
        <div class="text-left font-semibold text-base">
            <p class="italic text-center">
                How well do YOU know Georgia Tech?
            </p>
            <br>
            <h3 class="text-3xl text-center">Instructions</h3>
            <p class="text-lg">
                Look at a series of images and panoramas taken from various spots on the Georgia Tech campus. Use the minimap to pin where you think the picture was taken. The faster you guess, and the closer you are, the more points you'll score!
            </p>
        </div>
        <div>
            <button class="w-1/4 m-12 p-4" on:click={() => startGame()}>
                Play!
            </button>    
        </div>
    </div>
</div>

<Footer/>
