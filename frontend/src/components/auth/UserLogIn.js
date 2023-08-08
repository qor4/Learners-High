import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { url } from "../../api/APIPath";
import { clientId } from "../../api/Ignore";

import { logInUser } from "../../store/UserStore";
import Input from "../common/Input";
import Button from "../common/Button";

const ButtonWrap = styled.div`
    margin-top: 1.5rem;

    & > * {
        margin-bottom: 0.5rem;
    }
`;

const UserLogIn = (props) => {
    const navigate = useNavigate();
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
        console.log(logInForm, "로그인")
        axios
            .post(`${url}/user/login`, logInForm, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    // 로그인 성공
                    alert("로그인!"); // 여기 꼭 확인하기!!
                    localStorage.setItem(
                        "accessToken",
                        res.data.result.token.accessToken
                    );
                    localStorage.setItem(
                        "refreshToken",
                        res.data.result.token.refreshToken
                    );
                    dispatch(logInUser(res.data.result));
                    navigate(`/`);
                    props.onClose();
                } else {
                    alert("로그인 실패!");
                }
            })
            .catch((err)=> {
                alert("로그인이 실패했습니다.")
            })

    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            userLogIn();
        }
    };
    
    // const getCode = (()=> {
    //     const newCode = new URL(window.location.href).searchParams.get("code")
    //     console.log(newCode)
    //     // axios.get(`${url}/login/kakao/callback`, {headers: {newCode}})
    // })

    const kakaoLogIn = () => {
        // 인가코드를 받아서... 이걸 받아서.. useEffect를 써서.... 이걸 백으로 보내자....
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=http://localhost:3000/kakao/join&response_type=code&scope=account_email,profile_nickname,profile_image`
        // navigate('/test')
        // axios.get(`${url}/login/kakao/callback`, {headers: {code}})
        // console.log(name)
        // getCode()
    }
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
                    onKeyPress={handleKeyPress}
                />

                <ButtonWrap>
                    <Button $fullWidth $kakao onClick={kakaoLogIn}>
                        카카오로그인
                    </Button>
                    <Button $fullWidth $point onClick={userLogIn}>
                        로그인
                    </Button>
                    <Link to="/join">
                        <Button onClick={props.onClose} $fullWidth $skyBlue>
                            회원가입
                        </Button>
                    </Link>
                </ButtonWrap>
            </form>

            {/* <KakaoPassing code={code}/> */}
        </>
    );
};

export default UserLogIn;
