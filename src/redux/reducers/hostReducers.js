import actionTypes from "../actionTypes";

const hostStates = {
    picked: [],
    move: false,
}

const hostReducers = (state=hostStates, action) => {
    switch (action.type) {
        case actionTypes.HOST_INIT:
            return init()
        case actionTypes.HOST_START:
            return start(state)
        case actionTypes.HOST_END:
            return end(state)
        case actionTypes.HOST_ADD:
            return add(state, action.payload)
        default:
            return state
    }
}

const init = () => {
    return {
        picked: [],
        move: false
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
        move: false
    }
}

const add = (state, chosen) => {
    return {
        ...state,
        picked: [...state.picked, ...[chosen]]
    }
}

export default hostReducers