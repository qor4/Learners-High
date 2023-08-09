import React, { useState, useEffect } from "react";
import axios from "axios";

import tokenHttp, { url } from "../../api/APIPath";

import TeacherJobItem from "./TeacherJobItem";
import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";

const TeacherJobList = ({ userNo }) => {
    const [teacherJobList, setTeacherJobList] = useState([]);
    useEffect(() => {
        tokenHttp.get(`${url}/mypage/job/list/${userNo}`).then((res) => {
            console.log(res.data.result);
            setTeacherJobList(res.data.result);
        });
    }, []);

    console.log(teacherJobList)
    return (
        <>
            <Card>
                <LessonStatusBox $point $round>
                    경력
                </LessonStatusBox>
                {teacherJobList.map((item) => (
                    <div key={item?.classNo}>
                        <TeacherJobItem item={item} />
                    </div>
                ))}
            </Card>
        </>
    );
};

export default TeacherJobList;
