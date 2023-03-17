import { get } from 'svelte/store'
import {push} from 'svelte-spa-router'
import { gameScore, gameState, gameData, userGuess,gameTimer, gameAnswers } from "../routes/store"

export function startGame() {
    if (get(gameState) >= 5) {
        // Results Page
        gameState.set(-1)
        gameData.set(null)
        userGuess.set({lng: 0, lat: 0})
        push('/results/')
    }  else {
        // Next Round
        userGuess.set({lng: 0, lat: 0})
        push('/game/')
    }
}

export function goHome() {
    // go Home
    gameData.set(null)
    gameScore.set(0)
    gameState.set(0)
    gameTimer.set({current: 0, total: 0})
    userGuess.set({lng: 0, lat: 0})
    gameAnswers.set({})
    push('/')
}
