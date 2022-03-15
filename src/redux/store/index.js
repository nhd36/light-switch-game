import {combineReducers, createStore} from "redux";
import hostReducers from "../reducers/hostReducers"
import userReducers from "../reducers/userReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import gameReducers from "../reducers/gameReducers";

const reducers = combineReducers({
    user: userReducers,
    host: hostReducers,
    game: gameReducers,
})

const store = createStore(reducers, composeWithDevTools())

export default store