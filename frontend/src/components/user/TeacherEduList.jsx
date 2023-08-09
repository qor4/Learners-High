import React, { useState, useEffect } from "react";
import axios from "axios";

import { url } from "../../api/APIPath";

import TeacherEduItem from "./TeacherEduItem";
import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";

const TeacherEduList = ({ userNo }) => {
    const [teacherEduList, setTeacherEduList] = useState([]);
    useEffect(() => {
        axios.get(`${url}/mypage/edu/list/${userNo}`).then((res) => {
            console.log(res.data.result);
            setTeacherEduList(res.data.result);
        });
    }, []);

    return (
        <>
            <Card>
                <LessonStatusBox $point $round>
                    학력
                </LessonStatusBox>
                {teacherEduList.map((item) => (
                    <div key={item?.classNo}>
                        <TeacherEduItem item={item} />
                    </div>
                ))}
            </Card>
        </>
    );
};

export default TeacherEduList;
