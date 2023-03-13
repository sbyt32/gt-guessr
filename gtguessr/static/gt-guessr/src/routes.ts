import Home from './routes/Home.svelte'
import Game from './routes/Game.svelte'
import Results from './routes/Results.svelte'

export const routes=  {
    '/': Home,
    '/game/': Game,
    '/results/': Results,
}