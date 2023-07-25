import { combineReducers } from "redux";
import UserStore from "./UserStore";
import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: UserStore
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // 유지하고 싶은 값을 배열로 전달
    blacklist: [], // 유지하기 싫은 값을 배열로 전달
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer