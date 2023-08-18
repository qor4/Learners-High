// 학생 수업 관리 목록 페이지
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tokenHttp, { url } from "../api/APIPath";

import { styled } from "styled-components";
import { Container } from "@mui/material";

import { ImgInfoWrap } from "../components/class/TeacherIntroduceBox";
import { StyledChart } from "../components/class/TeacherLessonCsatBox";
import { InfoRateWrap } from "./EduTeacherLessonPage";
import {
    NoneDataText,
    StyledTitleText,
} from "../components/class/LessonItemBox";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LessonItemBoxList from "../components/class/LessonItemBoxList";
import LessonList from "../components/class/LessonList";

import ApexChart from "../components/chart/ApexChart";

// 강의 wrap
const StyledCsatInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

// 탭바 버튼 wrap
export const StyledButtonWrap = styled.div`
    margin: 2rem 0 1rem 0;
    & > *:not(:first-child) {
        margin-left: 0.5rem;
    }
`;

const EduStudentManagePage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const userName = useSelector((state) => state.user.userName);
    const [studentLessonDataSet, setStudentLessonDataSet] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("강의 중");
    const [studentWishDataSet, setStudentWishDataSet] = useState([]);

    const [highAttentionLesson, setHighAttentionLesson] = useState("");
    const [lessonTypeCountDataSet, setLessonTypeCountDataSet] = useState([]);

    useEffect(() => {
        tokenHttp
            .get(
                `${url}/student/lesson/list/${userNo}?status=${selectedStatus}`
            )
            .then((response) => {
                setStudentLessonDataSet(response.data.result);
            });
    }, [selectedStatus]);

    useEffect(() => {
        tokenHttp
            .get(`${url}/student/wish/list?userNo=${userNo}`)
            .then((response) => {
                setStudentWishDataSet(response.data);
            });

        tokenHttp
            .get(
                `${url}/attention/allLesson/onestudent/allavg?userNo=${userNo}`
            )
            .then((response) => {
                if (response.data.resultCode === 0) {
                    setHighAttentionLesson(response.data.result);
                } else if (response.data.resultCode === -1) {
                    setHighAttentionLesson("데이터 없음");
                }
            });

        tokenHttp
            .get(`${url}/student/allLesson/lesson-type-cnt/${userNo}`)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    setLessonTypeCountDataSet(response.data.result);
                } else if (response.data.resultCode === -1) {
                    setLessonTypeCountDataSet(null);
                }
                // -1이면 데이터가 없는 것
            });
    }, []);

    return (
        <>
            {/* 분석 내용이 들어갈 공간입니다.@@@ */}
            <StyledCsatInfoWrap>
                <Container maxWidth="md">
                    <ImgInfoWrap>
                        {/* 분석 차트가 들어갈 공간입니다!@@@ */}
                        <StyledChart>
                            <ApexChart
                                width={350}
                                chartType="pie"
                                type="typepie"
                                seriesData={lessonTypeCountDataSet}
                            />
                        </StyledChart>
                        <InfoRateWrap>
                            <StyledTitleText>
                                {userName}님의 수강 목록 분석
                            </StyledTitleText>
                            {highAttentionLesson !== "데이터 없음" ? (
                                <Card>
                                    {userName}님의 가장 집중도가 높은 수업은{" "}
                                    <strong>{highAttentionLesson}</strong>
                                    입니다.
                                </Card>
                            ) : (
                                <NoneDataText style={{ marginLeft: 0 }}>
                                    데이터 없음
                                </NoneDataText>
                            )}
                        </InfoRateWrap>
                    </ImgInfoWrap>
                </Container>
            </StyledCsatInfoWrap>

            <Container maxWidth="md">
                {/* 탭바 */}
                <StyledButtonWrap>
                    <Button
                        onClick={() => setSelectedStatus("강의 중")}
                        $point={selectedStatus === "강의 중"}
                        disabled={selectedStatus === "강의 중"}
                    >
                        수강 중
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("강의 전")}
                        $point={selectedStatus === "강의 전"}
                        disabled={selectedStatus === "강의 전"}
                    >
                        수강 예정
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("강의 완료")}
                        $point={selectedStatus === "강의 완료"}
                        disabled={selectedStatus === "강의 완료"}
                    >
                        수강 완료
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("내가 찜한 강의")}
                        $point={selectedStatus === "내가 찜한 강의"}
                        disabled={selectedStatus === "내가 찜한 강의"}
                    >
                        내가 찜한 강의
                    </Button>
                </StyledButtonWrap>

                {/* 강의 목록들이 들어갈 공간 => 찜한 강의 제외 */}
                {selectedStatus !== "내가 찜한 강의" &&
                    (studentLessonDataSet.length > 0 ? (
                        <LessonItemBoxList
                            lessonList={studentLessonDataSet}
                        ></LessonItemBoxList>
                    ) : (
                        <Card style={{ textAlign: "center" }}>데이터 없음</Card>
                    ))}

                {/* 찜한 강의를 보여주는 공간 */}
                {selectedStatus === "내가 찜한 강의" && (
                    <>
                        {studentWishDataSet.length > 0 ? (
                            <LessonList items={studentWishDataSet} />
                        ) : (
                            <Card style={{ textAlign: "center" }}>
                                데이터 없음
                            </Card>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default EduStudentManagePage;
