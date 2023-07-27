import React, {useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { url } from "../../api/APIPath";


const TeacherJobItem = ({item}) => {
  const [jobItem, setJobItem] = useState(item)
  const [isEditing, setIsEditing] = useState(false)

  const userNo = useSelector(state => state.user.userNo)

  const {urlId} = useParams()
  const userId = useSelector(state=> state.user.userId)
  const validCanModify = urlId===userId // 수정 가능한지 체크 

  const {carrerNo, companyName, departName, hireStartDate, hireEndDate} = jobItem
  

  const handleOnClickUpdateStart = () => {
    setIsEditing(true)
  }
  const handleOnClickUpdateEnd = () => {
    axios.put(`${url}/user/modify/job/${userNo}`,
    jobItem,
    {headers: {"Content-Type": 'application/json'}}
    )    
    // 마이페이지로 리다이렉트해야할듯. 
    setIsEditing(false)
  }

  const onChange = (e) => {
    const {value, name} = e.currentTarget
    setJobItem({
      ...jobItem,
      [name]: value
    })
  }

  const handleOnClickDelete = () => {
    axios.delete(`${url}/user/job/delete/${carrerNo}`,
    carrerNo,
    {headers: {"Content-Type": 'application/json'}}
    )
  }

  return (
    <>

    { 
      !isEditing && validCanModify ? (
        <>
        <p> 직장명: {companyName} </p>
        <p> 부서명: {departName} </p>
        <p> 입사년월: {hireStartDate} </p>
        <p> 퇴사년월: {hireEndDate} </p>
        <button onClick={handleOnClickUpdateStart}>수정하기</button>
        </>
        ) : (
        <form onSubmit={(e)=> e.preventDefault()}>
        <div>
        <p>경력</p>

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
      <button onClick={handleOnClickUpdateEnd}>수정완료</button>
      </form>
    )
  }


      <button onClick={handleOnClickDelete}>삭제</button>
    </>
  )
}

export default TeacherJobItem