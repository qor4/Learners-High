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
import { StyledTitleText } from "../components/class/LessonItemBox";

import Button from "../components/common/Button";
import EduManageStudentsTable from "../components/manage/EduManageStudentsTable";
import LessonInfoPage from "./LessonInfoPage";
import EduManageReportTable from "../components/manage/EduManageReportTable";
import { StyledThumbnail } from "../components/class/LessonInfoBox";

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

    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]); // LessonInfo 다 가져옴

    const [attendRateDataSet, setAttendRateDataSet] = useState(0); // 출석률

    const [selectedTabBar, setSelectedTabBar] = useState("학생"); // 탭바 선택별

    const [lessonNameData, setLessonNameData] = useState("");
    const [totalRoundNumber, setTotalRoundNumber] = useState(0); // 총 회차 수
    const [lessonRoundDataSet, setLessonRoundDataSet] = useState([]); // lessonRoundInfo

    useEffect(() => {
        // 수업 출석 / 과제 체출 GET 요청
        tokenHttp
            .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
            .then((response) => {
                setAttendRateDataSet(response.data.result.attendRate);
            });

        // 수업 상세 GET 요청 (수업 이름을 불러오기 위한...)
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            setLessonInfoDataSet(response.data.result);
            setLessonNameData(response.data.result.lessonInfo.lessonName);

            setTotalRoundNumber(
                response.data.result.lessonInfo.lessonTotalRound
            );
            setLessonRoundDataSet(response.data.result.lessonRoundInfo);
        });

        // table에 필요한 기반 데이터 불러오기
    }, []);

    const [thumbnailURL, setThumbnailURL] = useState("")
    useEffect(() => {
        axios
        .get(`${url}/s3/thumbnail-load/${lessonNo}`)
        .then((res) => {
            if (res.data.resultCode === -1){
                setThumbnailURL(false)
                return
            }
            setThumbnailURL(res.data.resultMsg);
        });
    }, [])
    return (
        <>
            {/* 수업 출석률과 과제 제출률에 관한 차트와 수업 이름 등이 들어갈 정보박스 */}
            <StyledTeacherInfoWrap>
                <Container maxWidth="md">
                    <ImgInfoWrap>
                        {/* 썸네일 */}
                        <StyledThumbnail
                            src={
                                thumbnailURL
                                    ? thumbnailURL
                                    : "/assets/item-banner.png"
                            }
                            alt="thumbnail-img"
                            crossOrigin="anonymous"
                        />

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
                                                {attendRateDataSet.toFixed(0)} %
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
                </StyledButtonWrap>

                {/* 해당 탭바에 따른 정보가 담긴 테이블 */}
                <div>
                    {selectedTabBar === "학생" && <EduManageStudentsTable />}
                    {selectedTabBar === "분석" && (
                        <EduManageReportTable
                            lessonInfoDataSet={lessonInfoDataSet}
                            lessonNo={lessonNo}
                            lessonTotalRound={totalRoundNumber}
                            lessonRoundInfo={lessonRoundDataSet}
                        />
                    )}
                    {selectedTabBar === "소개" && (
                        <LessonInfoPage pathByEduStudentLessonPage={true} />
                    )}
                </div>
            </Container>
        </>
    );
};

export default EduTeacherLessonPage;
