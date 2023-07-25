import React, {useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../api/APIPath";

const TeacherJobItem = () => {
  const [response, setResponse] = useState({})
  // const userNo = useSelector(state => state.user.userNo)
  const userNo = 1

  // 임시값!!!
  axios.get(`${url}/user/modify/job/1`)
  .then(res => {
    setResponse({
      ...response
      ,res
    })
  })
  

  const {carrerNo, companyName, departName, hireStartDate, hireEndDate} = response
  
  const handleOnClickUpdate = () => {
    console.log(response)
    axios.put(`${url}/user/modify/edu/${userNo}`,
    response,
    {headers: {"Content-Type": 'application/json'}}
    )
  }

  const onChange = (e) => {
    const {value, name} = e.currentTarget
    setResponse({
      ...response,
      [name]: value
    })
  }

  const handleOnClickDelete = () => {
    axios.delete(`${url}/user/modify/edu/${userNo}`,
    carrerNo,
    {headers: {"Content-Type": 'application/json'}}
    )
  }

  return (
    <>
    <form onSubmit={(e)=> e.preventDefault()}>
    <div>
        <p>경력 {carrerNo}</p>

        <span>직장명</span>
        <input
        type="text"
        name="companyName"
        className="companyName"
        onChange={e=>onChange(e)}
        value={companyName}
        />

        <span>부서/직무</span>
        <input
        type="text"
        name="departName"
        className="departName"
        onChange={e=>onChange(e)}
        value={departName}
        />

        <span>입사년월</span>
        <input
        type="text"
        name="hireStartDate"
        className="hireStartDate"
        onChange={e=>onChange(e)}
        value={hireStartDate}
        /> 
        <span>퇴사년월</span>
        <input
        type="text"
        name="hireEndDate"
        className="hireEndDate"
        onChange={e=>onChange(e)}
        value={hireEndDate}
        /> 
      </div>
      <button onClick={handleOnClickUpdate} >수정</button>
      <button onClick={handleOnClickDelete}>삭제</button>
    </form>


    </>
  )
}

export default TeacherJobItem