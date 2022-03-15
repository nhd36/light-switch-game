import actionTypes from "../actionTypes";

const gameStates = {
    musicButtons: [
        {
            color: "red",
            music: ""
        },
        {
            color: "blue",
            music: ""
        },
        {
            color: "yellow",
            music: ""
        },
        {
            color: "purple",
            music: ""
        },
        {
            color: "black",
            music: ""
        },
        {
            color: "silver",
            music: ""
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