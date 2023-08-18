import React from "react";
import { useDispatch } from "react-redux";

import { logOutUser } from "../../store/UserStore";

export const UserLogOut = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // 로그아웃 액션을 dispatch
        dispatch(logOutUser());
    };

    return <div onClick={handleLogout}>로그아웃</div>;
};
