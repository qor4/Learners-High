// 메인 페이지에서 사용되는 수업 회차별 박스를 묶는 List
// GET 요청으로 요일별 데이터를 받아와 밑의 ClassRoundItemBox에 보내주는 공간

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/APIPath";

import ClassRoundItemBox from "./ClassRoundItemBox";

const ClassRoundItemBoxList = (props) => {
    const userNo = useSelector((state) => state.user.userName);
    // const [dayClassListDataSet, setDayClassListDataSet] = useState([]);

    // useEffect(() => {
    //     axios.get(`${url}/teacher/class/main/${userNo}`).then((response) => {
    //         setDayClassListDataSet(response.data);
    //     });
    // }, [props.selectedDay]);

    const dayClassListDataSet = {
        1: [],
        2: [
            {
                classRoundNo: 6,
                classNo: 1,
                userNo: 1,
                userName: "신딩",
                className: "수업 이름1",
                classRoundNumber: 7,
                classRoundTitle: "string",
                classRoundFileName: "string",
                classRoundFileOriginName: "string",
                classRoundStartDatetime: "2023-07-24T05:03:05",
                classRoundEndDatetime: "2023-07-24T05:03:05",
                classRoundClassroom: null,
                homework: true,
            },
            {
                classRoundNo: 7,
                classNo: 3,
                userNo: 1,
                userName: "신딩",
                className: "수업 이름2",
                classRoundNumber: 7,
                classRoundTitle: "string",
                classRoundFileName: "string",
                classRoundFileOriginName: "string",
                classRoundStartDatetime: "2023-07-24T05:03:05",
                classRoundEndDatetime: "2023-07-24T05:03:05",
                classRoundClassroom: null,
                homework: true,
            },
            {
                classRoundNo: 11,
                classNo: 4,
                userNo: 1,
                userName: "신딩",
                className: "수업 이름3",
                classRoundNumber: 7,
                classRoundTitle: "string",
                classRoundFileName: "string",
                classRoundFileOriginName: "string",
                classRoundStartDatetime: "2023-07-24T05:03:05",
                classRoundEndDatetime: "2023-07-24T05:03:05",
                classRoundClassroom: null,
                homework: true,
            },
        ],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [
            {
                classRoundNo: 5,
                classNo: 1,
                userNo: 1,
                userName: "신딩",
                className: "수업 이름",
                classRoundNumber: 4,
                classRoundTitle: "string",
                classRoundFileName: "string",
                classRoundFileOriginName: "string",
                classRoundStartDatetime: "2023-07-30T05:03:05",
                classRoundEndDatetime: "2023-07-30T05:03:05",
                classRoundClassroom: null,
                homework: true,
            },
        ],
    };

    // prop 받은 (선택된) 요일에 맞는 수업들을 담아둔 곳
    const selectedDayClasses = dayClassListDataSet[props.selectedDay];

    return (
        <>
            {selectedDayClasses.map((classItem, index) => (
                <ClassRoundItemBox classInfo={classItem} key={index} />
            ))}
        </>
    );
};

export default ClassRoundItemBoxList;
