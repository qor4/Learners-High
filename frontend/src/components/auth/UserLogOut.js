import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../store/UserStore";

export const UserLogOut = () => {
    console.log("로그아웃")
    const dispatch = useDispatch()
    dispatch(logOutUser)
}