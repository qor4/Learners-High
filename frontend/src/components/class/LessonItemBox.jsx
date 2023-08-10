// 수업 관리, 수강 목록에서 사용되는 강의별 박스
// 들어가는 내용 : 수업 시작일 ~ 종료일, 수업 이름, 수업 만족도, 강사 만족도, 출석률, 과제 제출률

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../common/Card";
import { useState } from "react";
import tokenHttp, { url } from "../../api/APIPath";

const LessonItemBox = ({ lessonInfo }) => {
    const userNo = useSelector((state) => state.user.userNo);
    const lessonNo = lessonInfo.lessonNo;
    const [teacherSat, setTeacherSat] = useState(0);
    const [lessonSat, setLessonSat] = useState(0);
    const [attendRate, setAttendRate] = useState(0);
    const [homeworkRate, setHomeworkRate] = useState(0);
    useEffect(() => {
        tokenHttp.get(`${url}/csat/onelesson/${lessonNo}`).then((response) => {
            setLessonSat(response.data);
        });
        tokenHttp.get(`${url}/csat/oneteacher/${lessonNo}`).then((response) => {
            setTeacherSat(response.data);
        });
        tokenHttp
            .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/rate`)
            .then((response) => {
                setAttendRate(response.data.result.attendRate);
                setHomeworkRate(response.data.result.attendRate);
            });
    }, []);
    return (
        <>
            <Card>
                lessonName: {lessonInfo.lessonName}
                <br />
                lessonStartDate: {lessonInfo.lessonStartDate}
                <br />
                lessonEndDate: {lessonInfo.lessonEndDate}
                <br />
                userName: {lessonInfo.userName}
                <br />
                lessonTypeName: {lessonInfo.lessonTypeName}
                <br />
                강사 만족도:{teacherSat}
                수업 만족도:{lessonSat}
                출석률 :{attendRate}
                과제 제출률:{homeworkRate}
            </Card>
        </>
    );
};

export default LessonItemBox;
