// 로그인 여부 파악 및 userNo 확인

import { createSlice } from "@reduxjs/toolkit";

export const UserStore = createSlice({
    name: 'user',
    initialState: {
        userNo: "",
        userId: "",
        isLogin: null,
    },
    reducers: {
        logInUser: (state, action) => {
            state.userNo = action.payload.userNo
            state.userId = action.payload.userId
            state.isLogin = true
        },
        logOutUser: (state) => {
            state.userNo = ""
            state.userId = ""
            state.isLogin = false
        }
    }
})

export const {logInUser, logOutUser} = UserStore.actions
export default UserStore.reducer