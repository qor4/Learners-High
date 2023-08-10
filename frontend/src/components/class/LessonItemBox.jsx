// 수업 관리, 수강 목록에서 사용되는 강의별 박스
// 들어가는 내용 : 수업 시작일 ~ 종료일, 수업 이름, 수업 만족도, 강사 만족도, 출석률, 과제 제출률

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../common/Card";
import { useState } from "react";
import tokenHttp, { url } from "../../api/APIPath";

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
                수업 명: {lessonInfo.lessonName}
                <br />
                시작날짜: {lessonInfo.lessonStartDate}
                <br />
                종료날짜: {lessonInfo.lessonEndDate}
                <br />
                강사명: {lessonInfo.userName}
                <br />
                수업타입이름: {lessonInfo.lessonTypeName}
                <br />
                {userType === "T" && (
                    <>
                        {/* 강사/수업 만족도 => 강사만 보이게 */}
                        강사 만족도:{teacherSat}
                        수업 만족도:{lessonSat}
                    </>
                )}
                출석률 :{attendRate}
                과제 제출률:{homeworkRate}
            </Card>
        </>
    );
};

export default LessonItemBox;
