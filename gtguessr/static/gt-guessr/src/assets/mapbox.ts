import mapboxgl from 'mapbox-gl';
// Please don't actually do this in prod, this is just for demonstration purposes 💀
import { token } from './token';

// https://docs.mapbox.com/help/glossary/access-token/
mapboxgl.accessToken = token;

const key = {};

export { mapboxgl, key };