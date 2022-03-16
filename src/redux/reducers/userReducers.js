import actionTypes from "../actionTypes";

const userStates = {
    picked: [],
    move: false,
    score: 0,
    life: 3
}

const userReducers = (state=userStates, action) => {
    switch (action.type) {
        case actionTypes.USER_INIT:
            return init()
        case actionTypes.USER_START:
            return start(state)
        case actionTypes.USER_END:
            return end(state)
        case actionTypes.USER_ADD:
            return add(state, action.payload)
        case actionTypes.USER_SCORE:
            return score(state)
        case actionTypes.USER_LOSE:
            return lose(state)
        default:
            return state
    }
}

const init = () => {
    return {
        picked: [],
        move: false,
        score: 0,
        life: 3
    }
}

const start = (state) => {
    return {
        ...state,
        move: true
    }
}

const end = (state) => {
    return {
        ...state,
        move: false,
        picked: []
    }
}

const add = (state, chosen) => {
    return {
        ...state,
        picked: [...state.picked, ...[chosen]]
    }
}

const score = (state) => {
    return {
        ...state,
        score: state.score + 1
    }
}

const lose = (state) => {
    return {
        ...state,
        life: state.life - 1,
        picked: [],
        move: false
    }
}

export default userReducers