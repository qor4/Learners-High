// 학생 수업 상세 (수강 상세) 페이지
// 학생 수업 한 개 페이지

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { useParams } from "react-router-dom";

import { styled } from "styled-components";
import { Container } from "@mui/material";
import { StyledButtonWrap } from "./EduTeacherManagePage";

import LessonInfoBox from "../components/class/LessonInfoBox";
import Button from "../components/common/Button";
import EduManageReportTable from "../components/manage/EduManageReportTable";

// 강의 wrap
const StyledLessonInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

const EduStudentLessonPage = () => {
    const { lessonNo } = useParams();
    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]);
    const [selectedTabBar, setSelectedTabBar] = useState("현황"); // 탭바 선택별

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
            <Container maxWidth="md">
                {/* 탭바 */}
                <StyledButtonWrap>
                    <Button
                        onClick={() => setSelectedTabBar("현황")}
                        $point={selectedTabBar === "현황"}
                        disabled={selectedTabBar === "현황"}
                    >
                        현황
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("분석")}
                        $point={selectedTabBar === "분석"}
                        disabled={selectedTabBar === "분석"}
                    >
                        분석
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("과제")}
                        $point={selectedTabBar === "과제"}
                        disabled={selectedTabBar === "과제"}
                    >
                        과제
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("소개")}
                        $point={selectedTabBar === "소개"}
                        disabled={selectedTabBar === "소개"}
                    >
                        소개
                    </Button>
                </StyledButtonWrap>

                {/* 해당 탭바에 따른 정보가 담긴 테이블 */}
                <div>
                    {/* <DropTable /> */}
                    {selectedTabBar === "분석" && (
                        <EduManageReportTable lessonNo={lessonNo} />
                    )}
                </div>
            </Container>
        </>
    );
};

export default EduStudentLessonPage;
