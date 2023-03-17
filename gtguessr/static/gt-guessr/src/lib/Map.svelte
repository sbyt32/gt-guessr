<script>
    import { onDestroy, setContext } from "svelte";
    import { mapboxgl, key } from '../assets/mapbox'
    import { userGuess } from "../routes/store";

    setContext(key, {
		getMap: () => map,
	});

	export let lat = 33.77581881142522;
	export let lon = -84.3999417178747649;
	export let zoom = 15;

	let container
	let map
    let pos
    let marker
    export let interactive = true

	function load() {
		map = new mapboxgl.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [lon, lat],
			zoom
		});

        map.on('click', (e) => {
            if (interactive === true) {
            try {
                marker.remove();
                $userGuess = e.lngLat;
                marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
            }
            catch (TypeError) {
                $userGuess = e.lngLat;
                marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
                }
            }
        })
	}



	onDestroy(() => {
		if (map) map.remove();
	});

    export let h = "300px"
    export let w = "600px"
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css"
		on:load={load}
	/>
</svelte:head>
<div bind:this={container} style:--h={h} style:--w={w} class="border-4 border-black/40">
    {#if map}
    <slot/>
    {/if}
</div>
<style lang="postcss">

    div {
        position:absolute;
        right: 0px;
        bottom: 0px;
        height: var(--h);
        width: var(--w);
        z-index: 1;
    }

</style>
