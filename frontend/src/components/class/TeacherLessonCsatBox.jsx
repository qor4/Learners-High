// 강사의 총 수업 만족도와 총 강사 만족도를 담아둘 컴포넌트
// 해당 컴포넌트 내에 차트와 같이 수업 만족도와 강사 만족도를 시각적으로 보여줄 차트 추가

import { useEffect, useState } from "react";
import { url } from "../../api/APIPath";
import axios from "axios";
import { ImgInfoWrap } from "./TeacherIntroduceBox";
import { styled } from "styled-components";
import { InfoRateWrap, StyledRateWrap } from "../../pages/EduTeacherLessonPage";

// 차트
import ApexChart from "../chart/ApexChart";

export const StyledChart = styled.div`
    width: 35%;
`;

const ChartRateWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & > *:not(:first-child) {
        margin-top: 2rem;
    }
`;

const TeacherLessonCsatBox = ({ userNo }) => {
    const [teacherCsatLesson, setTeacherCsatLesson] = useState(0); // 강의 총 만족도
    const [csatLessonCount, setCsatLessonCount] = useState(0); // 강의 총 만족도 참여 인원 수
    const [teacherCsatTeacher, setTeacherCsatTeacher] = useState(0); // 강사 총 만족도
    const [csatTeacherCount, setCsatTeacherCount] = useState(0); // 강사 총 만족도 참여 인원 수
    

    const csatLessonData = {
        resultCode: 0,
        resultMsg: "강사의 모든 수업 총 만족도 뽑기",
        result: {
            oneCnt: 1,
            twoCnt: 1,
            threeCnt: 1,
            fourCnt: 1,
            fiveCnt: 1,
            totalCnt: 5.0,
            result: 0.0,
        },
    };

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
                {/* 수업 총 만족도와 강사 총 만족도 */}
                <ChartRateWrap>
                    <StyledRateWrap>
                        <InfoRateWrap>
                            <InfoRateWrap>
                                <div>
                                    <strong>수업 총 만족도</strong>
                                </div>
                                <div>
                                    {isNaN(teacherCsatLesson)
                                        ? "데이터 없음"
                                        : teacherCsatLesson}{" "}
                                    ( {csatLessonCount} )
                                </div>
                            </InfoRateWrap>
                            <ApexChart width={350} />
                        </InfoRateWrap>
                        <InfoRateWrap>
                            <InfoRateWrap>
                                <div>
                                    <strong>강사 총 만족도</strong>
                                </div>
                                <div>
                                    {isNaN(teacherCsatTeacher)
                                        ? "데이터 없음"
                                        : teacherCsatTeacher}{" "}
                                    ( {csatTeacherCount} )
                                </div>
                            </InfoRateWrap>
                            <ApexChart width={350} />
                        </InfoRateWrap>
                    </StyledRateWrap>
                </ChartRateWrap>
            </ImgInfoWrap>
        </>
    );
};

export default TeacherLessonCsatBox;
