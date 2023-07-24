import { combineReducers } from "redux";
import UserStore from "./UserStore";

const rootReducer = combineReducers({
    user: UserStore
})

export default rootReducer