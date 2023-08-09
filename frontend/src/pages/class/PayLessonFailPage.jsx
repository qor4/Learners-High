import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { url } from "../../api/APIPath"
import tokenHttp from "../../api/APIPath"
import axios from "axios"

import { useSelector } from "react-redux"



const PayLessonFailPage = () => {
  const navigate = useNavigate()
  const userNo = useSelector(state => state.user.userNo)

  useEffect(()=> {
    console.log("실패 왔음?")
    const lessonNo = new URL(window.location.href).searchParams.get("lessonNo")
    // const pg_token = new URL(window.location.href).searchParams.get("pg_token")
    // console.log(pg_token)
    axios.get(`${url}/kakaoPay/fail`)
    .then(res=>{
        console.log(res, "Fail")
        alert("결제 실패")
        navigate(`/lesson/info/${lessonNo}`)
        
    })
    .catch(err => console.log(err, "에러"))
}, [])



  return (
    <>
      {/* <PayLessonSuccess/> */}
    </>

  )
}

export default PayLessonFailPage