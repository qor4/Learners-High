// 수업 관리, 수강 목록에서 사용되는 강의별 박스
// 들어가는 내용 : 수업 시작일 ~ 종료일, 수업 이름, 수업 만족도, 강사 만족도, 출석률, 과제 제출률

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import tokenHttp, { url } from "../../api/APIPath";

import styled from "styled-components";

import Card from "../common/Card";
import LessonStatusBox from "../common/LessonStatusBox";

/** 가로 flex */
const ColFlexWrap = styled.div`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

/** 세로 flex */
const RowFlexWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

/** 카드 flex */
const CardFlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;

    & > div > * {
        margin: 1rem 0;
    }
`;

/** 큰 사이즈 텍스트 20px bold */
export const StyledTitleText = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`;

/** 회색 텍스트 */
export const NoneDataText = styled.div`
    color: #ccc;
    margin-left: 1rem;
`;

const DataText = styled.div`
    margin-left: 2rem;
`;

const LessonItemBox = ({ lessonInfo }) => {
    const userNo = useSelector((state) => state.user.userNo);
    const userType = useSelector((state) => state.user.userType);
    const lessonNo = lessonInfo.lessonNo;
    const [teacherCsat, setTeacherCsat] = useState(0); // 수업 하나당 강사 만족도
    const [teacherCsatCount, setTeacherCsatCount] = useState(0); // 수업 하나당 강사 만족도 참여 인원
    const [lessonCsat, setLessonCsat] = useState(0); // 수업 하나당 수업 만족도
    const [lessonCsatCount, setLessonCsatCount] = useState(0); // 수업 하나당 수업 만족도 참여 인원

    const [attendRate, setAttendRate] = useState(0); // 출석률

    useEffect(() => {
        if (userType === "T") {
            // 수업 하나당 강사 만족도
            tokenHttp
                .get(`${url}/csat/oneteacher/${lessonNo}`)
                .then((response) => {
                    const oneTeacherData = response.data.result;
                    // 만약 데이터를 잘 받아 왔다면
                    if (response.data.resultCode === 0) {
                        setTeacherCsat(oneTeacherData.result.toFixed(1));
                        setTeacherCsatCount(oneTeacherData.totalCnt);
                    } else if (response.data.resultCode === -1) {
                        setTeacherCsat(null);
                    }
                });
            // 수업 하나당 수업 만족도
            tokenHttp
                .get(`${url}/csat/onelesson/${lessonNo}`)
                .then((response) => {
                    const oneLessonData = response.data.result;
                    // 만약 데이터를 잘 받아 왔다면
                    if (response.data.resultCode === 0) {
                        setLessonCsat(oneLessonData.result.toFixed(1));
                        setLessonCsatCount(oneLessonData.totalCnt);
                    } else if (response.data.resultCode === -1) {
                        setLessonCsat(null);
                    }
                });

            // 강사 출석률 / 과제 제출률
            tokenHttp
                .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
                .then((response) => {
                    setAttendRate(response.data.result.attendRate);
                });
        } else if (userType === "S") {
            // 학생 출석률 / 과제 제출률
            tokenHttp
                .get(`${url}/student/${userNo}/lesson/${lessonNo}/rate`)
                .then((response) => {
                    setAttendRate(response.data.result.attendRate);
                });
        }
    }, [lessonNo, userNo, userType]);
    return (
        <>
            <Card>
                <CardFlexWrap>
                    <RowFlexWrap>
                        <ColFlexWrap>
                            <LessonStatusBox>
                                {lessonInfo.lessonTypeName}
                            </LessonStatusBox>
                            <div>
                                {lessonInfo.lessonStartDate} ~{" "}
                                {lessonInfo.lessonEndDate}
                            </div>
                        </ColFlexWrap>
                        <ColFlexWrap>
                            <StyledTitleText>
                                {lessonInfo.lessonName}
                            </StyledTitleText>
                            {/* 강사 이름 => 학생만 보이게 */}
                            {userType === "S" && (
                                <span>{lessonInfo.userName}</span>
                            )}
                        </ColFlexWrap>
                    </RowFlexWrap>
                    {userType === "T" && (
                        <RowFlexWrap>
                            {/* 강사/수업 만족도 => 강사만 보이게 */}
                            <ColFlexWrap>
                                <strong>
                                    <div>강사 만족도</div>
                                </strong>
                                <div>
                                    {teacherCsat === null ? (
                                        <NoneDataText>데이터 없음</NoneDataText>
                                    ) : (
                                        `⭐ ${teacherCsat} ( ${teacherCsatCount}명 )`
                                    )}
                                </div>
                            </ColFlexWrap>
                            <ColFlexWrap>
                                <strong>
                                    <div>수업 만족도</div>
                                </strong>
                                <div>
                                    {lessonCsat === null ? (
                                        <NoneDataText>데이터 없음</NoneDataText>
                                    ) : (
                                        `⭐ ${lessonCsat} ( ${lessonCsatCount}명 )`
                                    )}
                                </div>
                            </ColFlexWrap>
                        </RowFlexWrap>
                    )}
                    <RowFlexWrap>
                        <CardFlexWrap>
                            <strong>
                                <div>출석률</div>
                            </strong>

                            {attendRate === "아직 집계할 데이터가 없습니다." ? (
                                <NoneDataText>데이터 없음</NoneDataText>
                            ) : (
                                <DataText>{attendRate.toFixed(0)} %</DataText>
                            )}
                        </CardFlexWrap>
                    </RowFlexWrap>
                </CardFlexWrap>
            </Card>
        </>
    );
};

export default LessonItemBox;
