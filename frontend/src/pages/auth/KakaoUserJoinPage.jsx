// 회원가입 페이지
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import KakaoUserJoin from "../../components/auth/KakaoUserJoin";
import Title from "../../components/common/Title";

import { url } from "../../api/APIPath";
import axios from 'axios'
import { useNavigate } from "react-router";

const KakaoUserJoinPage = () => {
    const navigate = useNavigate()
    const [kakaoUser, setKakaoUser] = useState(false)
    const [kakaoUserInfo, setKakaoUserInfo] = useState({})
    useEffect(()=> {
        const code = new URL(window.location.href).searchParams.get("code")
        console.log(code)
        axios.get(`${url}/user/login/kakao/callback`, {params: {code}})
        .then(res=>{
            console.log(res)
            if(res.data.resultCode < 0) {
                alert("회원가입에 실패했습니다.")
            } else if (res.data.resultCode === 0 && res.data.result.userInfo !== null) {
                // JWT
                localStorage.setItem("accessToken", res.data.result.token.accessToken)
                localStorage.setItem("refreshToken", res.data.result.token.refreshToken)
                navigate('/')
            } else if (res.data.resultCode === 0 && res.data.result.userInfo === null) {
                localStorage.setItem("accessToken", res.data.result.token.accessToken)
                localStorage.setItem("refreshToken", res.data.result.token.refreshToken)
                setKakaoUserInfo(res.data.result)
                setKakaoUser(true)
            }
        })
        .catch(err => console.log(err, "에러"))
    }, [])
  
    return (
        <>
        {            
        kakaoUser &&
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>회원가입</Title>
                <KakaoUserJoin kakaoUserInfo={kakaoUserInfo}/>
            </Container>
        </Box>
        }
        </>
    );
};

export default KakaoUserJoinPage;
