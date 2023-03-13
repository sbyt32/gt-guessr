<script lang="ts">
    import { gameState, type GameLocationData, gameData } from "../routes/store";
    import {pannellum} from '../assets/pannellum';
    import { onMount } from "svelte";

    export let image

    async function setImg() {

        await fetch(`http://127.0.0.1:8000/api/image_loc/${image}`)
        .then( (response) => response.blob())
        .then( (blob) => {
            const objectURL = URL.createObjectURL(blob);
            pannellum.viewer('panorama', {
                "type": "equirectangular",
                "panorama": objectURL,
                "autoLoad": true
            })
        })
    }

    onMount(async () => {
        await setImg()
    })
</script>

<div id="panorama"/>

