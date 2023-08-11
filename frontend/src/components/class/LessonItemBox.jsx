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

/** 카드 flex */
const CardFlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LessonItemBox = ({ lessonInfo }) => {
    const userNo = useSelector((state) => state.user.userNo);
    const userType = useSelector((state) => state.user.userType);
    const lessonNo = lessonInfo.lessonNo;
    const [teacherSat, setTeacherSat] = useState(0);
    const [lessonSat, setLessonSat] = useState(0);
    const [attendRate, setAttendRate] = useState(0);
    const [homeworkRate, setHomeworkRate] = useState(0);
    useEffect(() => {
        if (userType === "T") {
            tokenHttp
                .get(`${url}/csat/onelesson/${lessonNo}`)
                .then((response) => {
                    setLessonSat(response.data);
                });
            tokenHttp
                .get(`${url}/csat/oneteacher/${lessonNo}`)
                .then((response) => {
                    setTeacherSat(response.data);
                });
            tokenHttp
                .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
                .then((response) => {
                    setAttendRate(response.data.result.attendRate);
                    setHomeworkRate(response.data.result.attendRate);
                });
        } else if (userType === "S") {
            tokenHttp
                .get(`${url}/student/${userNo}/lesson/${lessonNo}/rate`)
                .then((response) => {
                    setAttendRate(response.data.result.attendRate);
                    setHomeworkRate(response.data.result.attendRate);
                });
        }
    }, []);
    return (
        <>
            <Card>
                <CardFlexWrap>
                    <div>
                        <ColFlexWrap>
                            <div>
                                {lessonInfo.lessonStartDate} ~{" "}
                                {lessonInfo.lessonEndDate}
                            </div>
                            <LessonStatusBox>
                                {lessonInfo.lessonTypeName}
                            </LessonStatusBox>
                        </ColFlexWrap>
                        <div>{lessonInfo.lessonName}</div>
                        {/* 강사 이름 => 학생만 보이게 */}
                        {userType === "S" && (
                            <span>강사명: {lessonInfo.userName}</span>
                        )}
                    </div>
                    {userType === "T" && (
                        <div>
                            {/* 강사/수업 만족도 => 강사만 보이게 */}
                            <div>강사 만족도:{teacherSat}</div>
                            <div>수업 만족도:{lessonSat}</div>
                        </div>
                    )}
                    <div>
                        <div>출석률 :{attendRate}</div>
                        <div>과제 제출률:{homeworkRate}</div>
                    </div>
                </CardFlexWrap>
            </Card>
        </>
    );
};

export default LessonItemBox;
