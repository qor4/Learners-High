import React, {useState, useRef} from "react";
import {useSelector, userSelector} from "react-redux"
import axios from 'axios'
import { url } from "../../api/APIPath";

const UserJoinTeacherJob = () => {
    const nextId = useRef(1)
    const userNo = useSelector(state => state.user.userNo)
    const [jobInputList, setJobInputList] = useState(
        [
            {
                id: 0,
                userNo: userNo,
                companyName: '',
                departName: '',
                hireStartDate: '',
                hireEndDate: ''
            }
        ]
    )
    // input 객체 추가 이벤트
    const addJobInputItem = () => {
        const input = {
            id: nextId.current,
            userNo: userNo,
            companyName: '',
            departName: '',
            hireStartDate: '',
            hireEndDate: ''
        }
        setJobInputList([...jobInputList, input]) // 새로운 인풋 객체 추가
        nextId.current+=1
    }
    // input 객체 삭제 이벤트
    const deleteJobInputItem = (index) => {
        console.log(index)
        setJobInputList(jobInputList.filter(item => item.id !== index))
    }
    
    const onChange = (event, index) => {
        if (index > jobInputList.length) return // 예외처리

        const {value, name} = event.currentTarget


        // 인풋 배열의 copy
        const jobInputListCopy = JSON.parse(JSON.stringify(jobInputList))
        jobInputListCopy[index][name] = value
        setJobInputList(jobInputListCopy)
        console.log(jobInputList)
    }

    const [hireStartDateYear, setHireStartDateYear] = useState('')
    const [hireStartDateMonth, setHireStartDateMonth] = useState('')
    const [hireEndDateYear, setHireEndDateYear] = useState('')
    const [hireEndDateMonth, setHireEndDateMonth] = useState('')

    const postTeacherJob = () => {
        // 데이터를 [id: id, {data들} // or {id: userId, ... 이렇게?}]
        jobInputList.map((item) => (    
            axios.post(`${url}/user/join/job`, 
            item,
            {headers: {"Content-Type": 'application/json'}}
            )
        ))
    }

    return (
        <>
            <form onSubmit={(e)=>e.preventDefault()}>
                {
                    jobInputList.map((item, index) => (
                        <div key={index}>
                            <p>경력 {item.id+1}</p>

                            <span>직장명</span>
                            <input
                            type="text"
                            name="companyName"
                            className={`companyName-${index}`}
                            onChange={e=>onChange(e, index)}
                            value={item.companyName}
                            />

                            <span>부서/직무</span>
                            <input
                            type="text"
                            name="departName"
                            className={`departName-${index}`}
                            onChange={e=>onChange(e, index)}
                            value={item.departName}
                            />

                            <span>입사년월</span>
                            <input
                            type="text"
                            name="hireStartDate"
                            className={`hireStartDate-${index}`}
                            onChange={e=>onChange(e, index)}
                            value={item.hireStartDate}
                            /> 
                            <span>퇴사년월</span>
                            <input
                            type="text"
                            name="hireEndDate"
                            className={`hireEndDate-${index}`}
                            onChange={e=>onChange(e, index)}
                            value={item.hireEndDate}
                            /> 
                            <button onClick={()=>deleteJobInputItem(item.id)}>삭제</button>
                        </div>
                    ))
                }
            </form>
            <button onClick={addJobInputItem}>+</button>

            <button onClick={postTeacherJob}>이력 등록</button>
        </>
    )
}

export default UserJoinTeacherJob