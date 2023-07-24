import { combineReducers } from "redux";
import UserStore from "../store/UserStore";

const rootReducer = combineReducers({
    user: UserStore
})

export default rootReducer