// 로그인 여부 파악 및 userNo 확인

import { createSlice } from "@reduxjs/toolkit";

export const UserStore = createSlice({
    name: "user",
    initialState: {
        userNo: "",
        userType: "",
        userId: "",
        userName: "",
        isLogin: null,
    },
    reducers: {
        logInUser: (state, action) => {
            state.userNo = action.payload.userNo
            state.userType = action.payload.userType
            state.userId = action.payload.userId
            state.userName = action.payload.userName
            state.isLogin = true
        },
        logOutUser: (state) => {
            state.userNo = "";
            state.userType = "";
            state.userId = "";
            state.userName = "";
            state.isLogin = false;
        },
    },
});

export const { logInUser, logOutUser } = UserStore.actions;
export default UserStore.reducer;
