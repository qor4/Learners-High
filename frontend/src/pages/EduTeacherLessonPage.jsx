// 강사 수업 상세 (내 수업 상세) 페이지

import { useParams } from "react-router-dom";

// 스타일 import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import tokenHttp, { url } from "../api/APIPath";

import { Container } from "@mui/material";
import { StyledButtonWrap } from "./EduTeacherManagePage";
import { StyledTeacherInfoWrap } from "./TeacherProfilePage";
import { ImgInfoWrap, InfoWrap } from "../components/class/TeacherIntroduceBox";
import { StyledChart } from "../components/class/TeacherLessonCsatBox";

import Button from "../components/common/Button";
import DropTable from "../components/common/table/DropTable";

const EduTeacherLessonPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();

    const [attendRateDataSet, setAttendRateDataSet] = useState(0); // 출석률
    const [homeworkRateDataSet, setHomeworkRateDataSet] = useState(0); // 과제 제출률

    const [selectedTabBar, setSelectedTabBar] = useState("학생"); // 탭바 선택별

    // 수업 출석 / 과제 체출 GET 요청
    useEffect(() => {
        tokenHttp
            .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
            .then((response) => {
                console.log(response.data);
                setAttendRateDataSet(response.data.result.attendRate);
                setHomeworkRateDataSet(response.data.result.homeworkRate);
            });
    }, []);
    return (
        <>
            {/* 수업 출석률과 과제 제출률에 관한 차트와 수업 이름 등이 들어갈 정보박스 */}
            <StyledTeacherInfoWrap>
                <Container maxWidth="md">
                    <h1>
                        강사 수업 상세 페이지 (내 수업 상세) {lessonNo} 번~!!!
                    </h1>
                    <ImgInfoWrap>
                        {/* 분석 차트가 들어갈 공간입니다!@@@ */}
                        <StyledChart>차트 들어가욧</StyledChart>
                        {/* 수업 총 만족도와 강사 총 만족도 */}
                        <InfoWrap>
                            {/* 수업 이름 */}

                            {/* 수업 출석률 / 과제 제출률 */}
                            <div>
                                출석률 :{" "}
                                {attendRateDataSet ===
                                "아직 집계할 데이터가 없습니다."
                                    ? "데이터 없음"
                                    : attendRateDataSet}
                            </div>
                            <div>
                                과제 제출률 :{" "}
                                {homeworkRateDataSet ===
                                "아직 집계할 데이터가 없습니다."
                                    ? "데이터 없음"
                                    : homeworkRateDataSet}
                            </div>
                        </InfoWrap>
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
                    <h2>여기에 정보가 들어와요~~ (테이블)</h2>
                    <DropTable />
                </div>
            </Container>
        </>
    );
};

export default EduTeacherLessonPage;
