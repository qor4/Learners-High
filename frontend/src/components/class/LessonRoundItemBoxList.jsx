// 메인 페이지에서 사용되는 수업 회차별 박스를 묶는 List
// GET 요청으로 요일별 데이터를 받아와 밑의 LessonRoundItemBox에 보내주는 공간

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/APIPath";

import LessonRoundItemBox from "./LessonRoundItemBox";
import Card from "../common/Card";

const LessonRoundItemBoxList = ({ selectedDay, dayName }) => {
    const userNo = useSelector((state) => state.user.userNo);
    const [dayLessonListDataSet, setDayLessonListDataSet] = useState([]);

    useEffect(() => {
        if (selectedDay) {
            axios
                .get(`${url}/teacher/lesson/main/${userNo}`)
                .then((response) => {
                    console.log(response);
                    console.log(response.data)
                    setDayLessonListDataSet(response.data.list[0]);
                });
        }
    }, [selectedDay, userNo]);

    // prop 받은 (선택된) 요일에 맞는 수업들을 담아둔 곳
    const selectedDayLessons = dayLessonListDataSet[selectedDay];

    return (
        <>
            {selectedDayLessons && selectedDayLessons.length > 0 ? (
                selectedDayLessons.map((lessonItem, index) => (
                    <LessonRoundItemBox lessonInfo={lessonItem} key={index} />
                ))
            ) : (
                <Card>{dayName}요일 수업 없음</Card>
            )}
        </>
    );
};

export default LessonRoundItemBoxList;
