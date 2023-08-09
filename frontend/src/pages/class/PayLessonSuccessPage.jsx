import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { url } from "../../api/APIPath"
import tokenHttp from "../../api/APIPath"
import axios from "axios"

import PayLessonSuccess from "../../components/class/PayLessonSuccess"
import { useSelector } from "react-redux"

const PayLessonSuccessPage = () => {
  const navigate = useNavigate()

  const userNo = useSelector(state => state.user.userNo)

  const [couplingWithServer, setCouplingWithServer] = useState(false)
  const [payDataset, setPayDataset] = useState({})
  
  useEffect(()=> {
    console.log("왔어?")
    const pg_token = new URL(window.location.href).searchParams.get("pg_token")
    console.log(pg_token)
    axios.get(`${url}/kakaoPay/success`, {params: {pg_token}})
    .then(res=>{
        const lessonNo = Number(res.data.item_code)
        const data = {userNo, lessonNo}
        // setCouplingWithServer(true)
        tokenHttp
        .post(`${url}/student/apply`, data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          alert(response.data.resultMsg)
        });
        // 강의 상세 vs 수강목록
        navigate(`/lesson/info/${lessonNo}`)
        // navigate(`/edu/student/${userNo}`)
      })
    .catch(err => console.log(err, "에러"))
}, [])



  return (
    <>
    {/* {
      couplingWithServer &&
      <PayLessonSuccess/>
    } */}
    </>

  )
}

export default PayLessonSuccessPage