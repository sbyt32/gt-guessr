import { writable, readable, derived } from "svelte/store";

export type GameLocationData = {
    loc_ids: Array<string>
}

export const gameState = writable(0)
// 0 = Have not Started
// 1-5 = In Game
// -1 = Done

export const gameData = writable<GameLocationData>(null)
// The files
export const gameScore = writable(0)
// User score
export const userGuess = writable({lng: 0, lat: 0})
// User Guess

export const gameTimer = writable({current: 0, total: 0})

export type GameAnswerData = {
    lat: Number
    long: Number
}
export const gameAnswers = writable<Object>({})
