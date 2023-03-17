import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // relative path based on the subpath the site will be served from
  plugins: [svelte()],
})
