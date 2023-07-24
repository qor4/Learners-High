import React, {useState} from "react";
import axios from 'axios'
import { url } from "../../api/APIPath";
import { logInUser } from "../../store/UserStore";
import { useDispatch, useSelector } from "react-redux";

const UserLogIn = () => {
    const user = useSelector((state)=> state.user)
    // console.log(useSelector())
    console.log(user, "ss")
    const [logInForm, setLogInForm] = useState({
        userId: '',
        userPassword: ''
    })
    console.log(logInForm)
    const dispatch = useDispatch()
    const onChange = (e) => {
        const {name, value} = e.currentTarget
        setLogInForm({
            ...logInForm,
            [name]: value
        })
    }
    
    const userLogIn = () => {
        alert("띠용")
        console.log(logInForm)
        axios.post(`${url}/user/local-login`, 
        logInForm,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res=> {
            console.log(res.data)
            if (res.data.code === 0) {
                // 로그인 성공
                alert("로그인!")
                dispatch(logInUser(res.data.userInfo))
            } else {
                // 로그인 실패 (비밀번호 틀림, 아이디 없음, 탈퇴회원)
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
            value={logInForm.userId}
            onChange={onChange}
            />
            <span>비밀번호:</span>
            <input
            type="password"
            name="userPassword"
            value={logInForm.userPassword}
            onChange={onChange}
            />
            <button onClick={userLogIn}>로그인</button>
        </form>
        </>
    )
}

export default UserLogIn