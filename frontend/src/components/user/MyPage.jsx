import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { url } from "../../api/APIPath";

// 컴포넌트
import TeacherJobList from "./TeacherJobList"

const MyPage = () => {
    const navigate = useNavigate()
    const userNo = useSelector((state) => state.user.userNo);
    const [myPageUserDataSet, setMyPageUserDataSet] = useState({});
    useEffect(()=> {
        axios.get(`${url}/user/mypage/${userNo}`)
        .then(res=> {
            if(userNo === res.data.userNo){
                console.log(res.data, res)
                setMyPageUserDataSet(res.data)
            } else {
                return alert("잘못된 접근입니다.")
            }
        })
    }, [])
    
    const {userId, userName, userEmail, userTel, userInfo, profileImg, userType} = myPageUserDataSet
    
    const [isEditing, setIsEditing] = useState(false)

    const handleOnClickUpdateStart = () => {
        setIsEditing(true)
    }
    const handleOnClickUpdateEnd = () => {
        axios.put(`${url}/user/mypage/modify/${userNo}`,
        myPageUserDataSet,
        {headers: {"Content-Type": 'application/json'}}
        )
        setIsEditing(false)
        navigate("/", {state: {msg: "수정완료"}}) // 임시로 홈으로 보냈지만, 현재 mypage 경로로 보낼 것!
        
    }
    // 여기서도 유효성 검사해야함...
    const onChange = (e) => {
        const {name, value} = e.currentTarget
        setMyPageUserDataSet({
            ...myPageUserDataSet,
            [name]: value
        })
    }

    return (
        <>
        <p> {userType} </p>
        <p> {userId} </p>
        <p> {userEmail} </p>
    {
        !isEditing ? (
            <>
            <p> {userName} </p>
            <p> {userTel} </p>
            <p> {userInfo} </p>
            <button onClick={handleOnClickUpdateStart}>공용폼 수정</button>
            </>
        )
        : (
            <>
            <form onSubmit={e=> e.preventDefault()}>
                <span>이름</span>
                <input
                name="userName"
                value={userName}
                onChange={onChange}
                />
                <span>전화번호</span>
                <input
                name="userTel"
                value={userTel}
                onChange={onChange}
                />
                <span>유저 소개</span>
                <input
                name="userInfo"
                value={userInfo}
                onChange={onChange}
                />
                <button onClick={handleOnClickUpdateEnd}>수정 완료</button>
            </form>
            </>
        )

    }

        {/* <Link to="">강사페이지</Link> // 추후 강사페이지 이동 */}
        {
            (userType=="T") ? (
                <TeacherJobList userNo={userNo}/>
            ) : null
        }
    </>
    );
};

export default MyPage;
