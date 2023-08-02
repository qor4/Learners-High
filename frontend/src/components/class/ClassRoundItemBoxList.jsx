// 메인 페이지에서 사용되는 수업 회차별 박스를 묶는 List
// GET 요청으로 요일별 데이터를 받아와 밑의 ClassRoundItemBox에 보내주는 공간

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/APIPath";

import ClassRoundItemBox from "./ClassRoundItemBox";
import Card from "../common/Card";

const ClassRoundItemBoxList = ({ selectedDay, dayName }) => {
    const userNo = useSelector((state) => state.user.userNo);
    const [dayClassListDataSet, setDayClassListDataSet] = useState([]);

    useEffect(() => {
        if (selectedDay) {
            axios
                .get(`${url}/teacher/class/main/${userNo}`)
                .then((response) => {
                    console.log(response);
                    setDayClassListDataSet(response.data.list);
                });
        }
    }, [selectedDay, userNo]);

    // prop 받은 (선택된) 요일에 맞는 수업들을 담아둔 곳
    const selectedDayClasses = dayClassListDataSet[selectedDay];

    return (
        <>
            {selectedDayClasses && selectedDayClasses.length > 0 ? (
                selectedDayClasses.map((classItem, index) => (
                    <ClassRoundItemBox classInfo={classItem} key={index} />
                ))
            ) : (
                <Card>{dayName}요일 수업 없음</Card>
            )}
        </>
    );
};

export default ClassRoundItemBoxList;
