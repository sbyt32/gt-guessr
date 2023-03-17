<script>
	import { getContext } from 'svelte';
	import { mapboxgl, key } from './mapbox';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export const label = "Location!";

	export let answer = false

	const details = new mapboxgl.Popup({ offset: 25})
		.setText(label)

	const marker = new mapboxgl.Marker({
		color: `${answer ? "#333333": "#aeb0dd"}`
		}).setLngLat([lon, lat]).setPopup(details).addTo(map);
</script>

<!-- <div class="text-orange-500">

</div> -->
