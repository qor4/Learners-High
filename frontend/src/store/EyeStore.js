// 로그인 여부 파악 및 userNo 확인

import { createSlice } from "@reduxjs/toolkit";

export const EyeStore = createSlice({
    name: "Eye",
    initialState: {
        EyeTracker: {}
    },
    reducers: {
        EyeTracker: (state, action) => {
            console.log(action, "action", action.payload, "액션이 갔니?")
            console.log(action, "action", action.payload.EyeTracker, "액션EyeTrack")
            console.log(action, "action", action.payload.EasySeeso, "액션EyeTrack")
            state.EyeTracker = action.payload;
            console.log(state.EyeTracker, "tests")
        },

    },
});

export const { EyeTracker } = EyeStore.actions;
export default EyeStore.reducer;
