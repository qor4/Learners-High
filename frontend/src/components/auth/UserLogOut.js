import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/UserStore";

export const UserLogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        // 로그아웃 액션을 dispatch
        console.log("로그아웃");
        dispatch(logOutUser());
        navigate("/");
    };

    return <button onClick={handleLogout}>로그아웃</button>;
};
