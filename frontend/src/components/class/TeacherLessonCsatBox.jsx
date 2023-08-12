// 강사의 총 수업 만족도와 총 강사 만족도를 담아둘 컴포넌트
// 해당 컴포넌트 내에 차트와 같이 수업 만족도와 강사 만족도를 시각적으로 보여줄 차트 추가

import { useEffect, useState } from "react";
import { url } from "../../api/APIPath";
import axios from "axios";
import { ImgInfoWrap, InfoWrap } from "./TeacherIntroduceBox";
import { styled } from "styled-components";

export const StyledChart = styled.div`
    width: 35%;
    background-color: red;
`;

const TeacherLessonCsatBox = ({ userNo }) => {
    const [teacherCsatLesson, setTeacherCsatLesson] = useState(0); // 강의 총 만족도
    const [csatLessonCount, setCsatLessonCount] = useState(0); // 강의 총 만족도 참여 인원 수
    const [teacherCsatTeacher, setTeacherCsatTeacher] = useState(0); // 강사 총 만족도
    const [csatTeacherCount, setCsatTeacherCount] = useState(0); // 강사 총 만족도 참여 인원 수

    useEffect(() => {
        // 강사의 모든 수업 총 만족도 GET 요청
        axios.get(`${url}/csat/lesson/${userNo}`).then((response) => {
            console.log(response.data.result);
            setTeacherCsatLesson(response.data.result);
            setCsatLessonCount(response.data.satiCnt);
        });

        // 강사에 대한 모든 총 만족도 GET 요청
        axios.get(`${url}/csat/teacher/${userNo}`).then((response) => {
            console.log(response);
            setTeacherCsatTeacher(response.data.result);
            setCsatTeacherCount(response.data.satiCnt);
        });
    }, [userNo]);
    return (
        <>
            <ImgInfoWrap>
                {/* 분석 차트가 들어갈 공간입니다!@@@ */}
                <StyledChart>차트 들어가욧</StyledChart>
                {/* 수업 총 만족도와 강사 총 만족도 */}
                <InfoWrap>
                    <div>
                        수업 총 만족도 :{" "}
                        {isNaN(teacherCsatLesson)
                            ? "데이터 없음"
                            : teacherCsatLesson}{" "}
                        ( {csatLessonCount} )
                    </div>
                    <div>
                        강사 총 만족도 :{" "}
                        {isNaN(teacherCsatTeacher)
                            ? "데이터 없음"
                            : teacherCsatTeacher}{" "}
                        ( {csatTeacherCount} )
                    </div>
                </InfoWrap>
            </ImgInfoWrap>
        </>
    );
};

export default TeacherLessonCsatBox;
