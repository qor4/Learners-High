// 학생 수업 상세 (수강 상세) 페이지
// 학생 수업 한 개 페이지

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { styled } from "styled-components";

import { useParams } from "react-router-dom";
import LessonInfoBox from "../components/class/LessonInfoBox";

// 강의 wrap
const StyledLessonInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

const EduStudentLessonPage = () => {
    const { lessonNo } = useParams();
    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]);

    // 강의 상세 GET 요청
    useEffect(() => {
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            setLessonInfoDataSet(response.data.result);
        });
    }, [lessonNo]);
    return (
        <>
            <StyledLessonInfoWrap>
                {/* 강의 상세 정보 들어갈 공간 */}
                <LessonInfoBox lessonInfo={lessonInfoDataSet.lessonInfo} $edu />
            </StyledLessonInfoWrap>
            <h1>학생 수업 상세 페이지 (수업 한 개!)</h1>
            <div>{lessonNo}</div>
        </>
    );
};

export default EduStudentLessonPage;
