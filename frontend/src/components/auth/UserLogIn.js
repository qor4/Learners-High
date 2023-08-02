import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../api/APIPath";
import { logInUser } from "../../store/UserStore";
import { useDispatch, useSelector } from "react-redux";

import Input from "../common/Input";
import Button from "../common/Button";

const UserLogIn = (props) => {
    const user = useSelector((state) => state.user);
    console.log(user);
    const [logInForm, setLogInForm] = useState({
        userId: "",
        userPassword: "",
    });
    const dispatch = useDispatch();
    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setLogInForm({
            ...logInForm,
            [name]: value,
        });
    };

    const userLogIn = () => {
        axios
            .post(`${url}/user/login`, 
            logInForm, 
            {headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res.data, "나는 로그인데이터!");
                console.log(res);
                if (res.data.resultCode === 0) {
                    // 로그인 성공
                    alert("로그인!"); // 여기 꼭 확인하기!!
                    dispatch(logInUser(res.data.list[0]));
                    props.onClose()
                } else {
                    alert("로그인 실패!");
                }
            });
    };
    return (
        <>

            <form onSubmit={(e) => e.preventDefault()}>
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    type="text"
                    id="userId"
                    name="userId"
                    value={logInForm.userId}
                    onChange={onChange}
                />
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    id="userPassword"
                    name="userPassword"
                    value={logInForm.userPassword}
                    onChange={onChange}
                />

                <Button $fullWidth>카카오 로그인</Button>
                <Button $fullWidth onClick={userLogIn}>
                    로그인
                </Button>
                <Link to="/join">
                    <Button onClick={props.onClose} $fullWidth>
                        회원가입
                    </Button>
                </Link>
            </form>
        </>
    );
};

export default UserLogIn;
