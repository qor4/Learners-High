import React, {useState, useEffect} from "react";
import axios from "axios";

import { url } from "../../api/APIPath";

import TeacherJobItem from "./TeacherJobItem"

const TeacherJobList = ({userNo}) => {
    const [teacherJobList, setTeacherJobList] = useState([]);
    useEffect(()=> {
        axios.get(`${url}/user/job-all-list/${userNo}`)
        .then(res=> {
            console.log(res.data, res)
            setTeacherJobList([res.data])
        })
    }, [])

    return (
        <>
        <h1>경력</h1>
        {
            teacherJobList.map((item,index) => (
                <div key={item?.classNo}>
                    <p>경력 {index+1}</p>
                    <TeacherJobItem item={item}></TeacherJobItem>
                </div>
            ))
        }
        </>
    )
}

export default TeacherJobList