// 강사 수업 상세 (내 수업 상세) 페이지

import { useParams } from "react-router-dom";

// 스타일 import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import tokenHttp, { url } from "../api/APIPath";

import { styled } from "styled-components";
import { Container } from "@mui/material";

import { StyledButtonWrap } from "./EduTeacherManagePage";
import { StyledTeacherInfoWrap } from "./TeacherProfilePage";
import { ImgInfoWrap } from "../components/class/TeacherIntroduceBox";
import { StyledChart } from "../components/class/TeacherLessonCsatBox";
import { StyledTitleText } from "../components/class/LessonItemBox";

import Button from "../components/common/Button";
import DropTable from "../components/common/table/DropTable";

export const StyledRateWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const InfoRateWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;

    & > *:not(:first-child) {
        margin-top: 2rem;
    }
`;

const TableWrap = styled.div`
    margin-top: 1.25rem;
`;

const EduTeacherLessonPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();

    const [attendRateDataSet, setAttendRateDataSet] = useState(0); // 출석률
    const [homeworkRateDataSet, setHomeworkRateDataSet] = useState(0); // 과제 제출률

    const [selectedTabBar, setSelectedTabBar] = useState("학생"); // 탭바 선택별

    const [lessonNameData, setLessonNameData] = useState("");

    useEffect(() => {
        // 수업 출석 / 과제 체출 GET 요청
        tokenHttp
            .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
            .then((response) => {
                console.log(response.data);
                setAttendRateDataSet(response.data.result.attendRate);
                setHomeworkRateDataSet(response.data.result.homeworkRate);
            });

        // 수업 상세 GET 요청 (수업 이름을 불러오기 위한...)
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            console.log(response);
            setLessonNameData(response.data.result.lessonInfo.lessonName);
        });
    }, []);
    return (
        <>
            {/* 수업 출석률과 과제 제출률에 관한 차트와 수업 이름 등이 들어갈 정보박스 */}
            <StyledTeacherInfoWrap>
                <Container maxWidth="md">
                    <ImgInfoWrap>
                        {/* 분석 차트가 들어갈 공간입니다!@@@ */}
                        <StyledChart>차트 들어가욧</StyledChart>
                        {/* 수업 총 만족도와 강사 총 만족도 */}
                        <InfoRateWrap>
                            {/* 수업 이름 */}
                            <StyledTitleText>{lessonNameData}</StyledTitleText>
                            <StyledRateWrap>
                                {/* 수업 출석률 / 과제 제출률 */}
                                <InfoRateWrap>
                                    <div>출석률</div>
                                    <div>
                                        {attendRateDataSet ===
                                        "아직 집계할 데이터가 없습니다." ? (
                                            "데이터 없음"
                                        ) : (
                                            <StyledTitleText>
                                                {attendRateDataSet} %
                                            </StyledTitleText>
                                        )}
                                    </div>
                                </InfoRateWrap>
                                <InfoRateWrap>
                                    <div>과제 제출률</div>
                                    <div>
                                        {homeworkRateDataSet ===
                                        "아직 집계할 데이터가 없습니다." ? (
                                            "데이터 없음"
                                        ) : (
                                            <StyledTitleText>
                                                {homeworkRateDataSet} %
                                            </StyledTitleText>
                                        )}
                                    </div>
                                </InfoRateWrap>
                            </StyledRateWrap>
                        </InfoRateWrap>
                    </ImgInfoWrap>
                </Container>
            </StyledTeacherInfoWrap>

            {/* 탭바 */}
            <Container maxWidth="md">
                <StyledButtonWrap>
                    <Button
                        onClick={() => setSelectedTabBar("학생")}
                        $point={selectedTabBar === "학생"}
                        disabled={selectedTabBar === "학생"}
                    >
                        학생
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("분석")}
                        $point={selectedTabBar === "분석"}
                        disabled={selectedTabBar === "분석"}
                    >
                        분석
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("소개")}
                        $point={selectedTabBar === "소개"}
                        disabled={selectedTabBar === "소개"}
                    >
                        소개
                    </Button>
                    <Button
                        onClick={() => setSelectedTabBar("과제")}
                        $point={selectedTabBar === "과제"}
                        disabled={selectedTabBar === "과제"}
                    >
                        과제
                    </Button>
                </StyledButtonWrap>

                {/* 해당 탭바에 따른 정보가 담긴 테이블 */}
                <div>
                    <DropTable />
                </div>
            </Container>
        </>
    );
};

export default EduTeacherLessonPage;
