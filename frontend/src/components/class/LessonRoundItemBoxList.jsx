// 메인 페이지에서 사용되는 수업 회차별 박스를 묶는 List
// GET 요청으로 요일별 데이터를 받아와 밑의 LessonRoundItemBox에 보내주는 공간

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tokenHttp, { url } from "../../api/APIPath";
import styled from "styled-components";

import LessonRoundItemBox from "./LessonRoundItemBox";
import Card from "../common/Card";
import { useNavigate } from "react-router-dom";

export const StyledBox = styled.div`
    background-color: #fff;
    border-radius: 1.25rem;
    padding: 1.25rem;
    position: relative;
    margin-top: 1.25rem;

    &:first-child {
        margin-top: 0;
    }

    &:hover:not(${(props) => props.$hover}) {
        background-color: #edf1ff;
        cursor: pointer;
    }
`;

const StyledCenterText = styled.div`
    text-align: center;
`;

const LessonRoundItemBoxList = ({
    selectedDay,
    dayName,
    onSelectedDayLessonsChange,
}) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);
    const [dayLessonListDataSet, setDayLessonListDataSet] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedDay && userType === "T") {
            tokenHttp
                .get(`${url}/teacher/lesson/main/${userNo}`)
                .then((response) => {
                    setDayLessonListDataSet(response.data.result);
                    // 요일에 맞는 수업들의 개수를 전달하는 것
                    if (response.data.result[selectedDay]) {
                        onSelectedDayLessonsChange(
                            response.data.result[selectedDay].length
                        );
                    }
                });
        } else if (selectedDay && userType === "S") {
            tokenHttp
                .get(`${url}/student/lesson/main/${userNo}`)
                .then((response) => {
                    setDayLessonListDataSet(response.data.result);

                    // 요일에 맞는 수업들의 개수를 전달하는 것
                    if (response.data.result[selectedDay]) {
                        onSelectedDayLessonsChange(
                            response.data.result[selectedDay].length
                        );
                    }
                });
        }
    }, [selectedDay, userNo, userType, onSelectedDayLessonsChange]);

    // prop 받은 (선택된) 요일에 맞는 수업들을 담아둔 곳
    const selectedDayLessons = dayLessonListDataSet[selectedDay];

    return (
        <>
            <Card $skyBlue>
                {selectedDayLessons && selectedDayLessons.length > 0 ? (
                    selectedDayLessons.map((lessonItem, index) => (
                        <StyledBox
                            key={index}
                            $hover
                            onClick={(e) => {
                                if (
                                    !e.target.className.includes("singleEvent")
                                ) {
                                    if (userType === "T") {
                                        navigate(
                                            `/edu/teacher/${userNo}/${lessonItem.lessonNo}`
                                        );
                                    } else {
                                        navigate(
                                            `/edu/student/${userNo}/${lessonItem.lessonNo}`
                                        );
                                    }
                                }
                            }}
                        >
                            <LessonRoundItemBox lessonInfo={lessonItem} />
                        </StyledBox>
                    ))
                ) : (
                    <StyledBox>
                        <StyledCenterText>
                            오늘 예정된 수업이 없습니다.
                        </StyledCenterText>
                    </StyledBox>
                )}
            </Card>
        </>
    );
};

export default LessonRoundItemBoxList;
