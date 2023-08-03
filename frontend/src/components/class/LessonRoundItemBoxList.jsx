// 메인 페이지에서 사용되는 수업 회차별 박스를 묶는 List
// GET 요청으로 요일별 데이터를 받아와 밑의 LessonRoundItemBox에 보내주는 공간

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/APIPath";

import LessonRoundItemBox from "./LessonRoundItemBox";
import Card from "../common/Card";

const LessonRoundItemBoxList = ({ selectedDay, dayName }) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);
    const [dayLessonListDataSet, setDayLessonListDataSet] = useState([]);

    useEffect(() => {
        if (selectedDay && userType === "T") {
            axios
                .get(`${url}/teacher/lesson/main/${userNo}`)
                .then((response) => {
                    console.log(response);
                    setDayLessonListDataSet(response.data.list[0]);
                });
        } else if (selectedDay && userType === "S") {
            axios
                .get(`${url}/student/lesson/main/${userNo}`)
                .then((response) => {
                    console.log(response);
                    setDayLessonListDataSet(response.data.list[0]);
                });
        }
    }, [selectedDay, userNo, userType]);

    // prop 받은 (선택된) 요일에 맞는 수업들을 담아둔 곳
    const selectedDayLessons = dayLessonListDataSet[selectedDay];

    return (
        <>
            {/* 이 부분은 이후 요일 버튼에 작게 들어갈 수 있도록 변경 예정 => 후순위 */}
            {selectedDayLessons && <div>{selectedDayLessons.length} 건의 수업이 있습니다.</div>}
            
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
