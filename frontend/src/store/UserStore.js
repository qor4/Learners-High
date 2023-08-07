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
            console.log(action, "action", action.payload, "액션이 갔니?")
            state.userNo = action.payload.userNo
            state.userType = action.payload.userType
            state.userId = action.payload.userId
            state.userName = action.payload.userName
            state.isLogin = true
        },
        logOutUser: (state) => {
            console.log("로그아웃됐니?")
            state.userNo = "";
            state.userType = "";
            state.userId = "";
            state.userName = "";
            state.isLogin = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const { logInUser, logOutUser } = UserStore.actions;
export default UserStore.reducer;
