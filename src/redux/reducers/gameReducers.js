import actionTypes from "../actionTypes";
import G4 from "../../assets/sounds/G4.mp3"
import A4 from "../../assets/sounds/A4.mp3"
import C5 from "../../assets/sounds/C5.mp3"
import B4 from "../../assets/sounds/B4.mp3"
import D5 from "../../assets/sounds/D5.mp3"
import E5 from "../../assets/sounds/E5.mp3"

const gameStates = {
    musicButtons: [
        {
            color: "red",
            music: G4
        },
        {
            color: "blue",
            music: A4
        },
        {
            color: "yellow",
            music: C5
        },
        {
            color: "purple",
            music: B4
        },
        {
            color: "black",
            music: D5
        },
        {
            color: "silver",
            music: E5
        }
    ],
    play: 0,
}

// 3 states: 0 - init, 1 - start, 2 - over

const gameReducers = (state=gameStates, action) => {
    switch (action.type) {
        case actionTypes.GAME_INIT:
            return init(state)
        case actionTypes.GAME_START:
            return start(state)
        case actionTypes.GAME_OVER:
            return over(state)
        default:
            return state
    }
}

const init = (state) => {
    return {
        ...state,
        play: 0
    }
}

const start = (state) => {
    return {
        ...state,
        play: 1
    }
}

const over = (state) => {
    return {
        ...state,
        play: 2
    }
}

export default gameReducers