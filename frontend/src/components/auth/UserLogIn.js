import React, {useState} from "react";
import axios from 'axios'
import { url } from "../../api/APIPath";
import { logInUser } from "../../store/UserStore";
import { useDispatch, useSelector } from "react-redux";

const UserLogIn = () => {
    const user = useSelector((state)=> state.user)
    const [logInForm, setLogInForm] = useState({
        userId: '',
        userPassword: ''
    })
    const dispatch = useDispatch()
    const onChange = (e) => {
        const {name, value} = e.currentTarget
        setLogInForm({
            ...logInForm,
            [name]: value
        })
    }
    
    const userLogIn = () => {
        console.log(logInForm, "로그인")
        axios.post(`${url}/user/login`, 
        logInForm,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res=> {
            console.log(res.data, "나는 로그인데이터!")
            console.log(res)
            if (res.data.resultCode === 0) {
                // 로그인 성공
                alert("로그인!")// 여기 꼭 확인하기!!
                dispatch(logInUser(res.data.userInfo))
            } else {
                alert("로그인 실패!")
            }
        })
    }
    return (
        <>
        <form onSubmit={e=> e.preventDefault()}>
            <span>아이디:</span>
            <input
            type="text"
            name="userId"
            // value={logInForm.userId}
            onChange={onChange}
            />
            <span>비밀번호:</span>
            <input
            type="password"
            name="userPassword"
            // value={logInForm.userPassword}
            onChange={onChange}
            />
            <button onClick={userLogIn}>로그인</button>
        </form>
        </>
    )
}

export default UserLogIn