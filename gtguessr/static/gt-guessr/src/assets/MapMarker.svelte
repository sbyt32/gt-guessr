<script>
	import { getContext } from 'svelte';
	import { mapboxgl, key } from './mapbox';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;

	export let answer = false


	const marker = new mapboxgl.Marker({
		color: `${answer ? "#333333": "#aeb0dd"}`
		}).setLngLat([lon, lat]).addTo(map);
</script>

<div class="text-orange-500">

</div>