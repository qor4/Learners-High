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

    const initialState = {
        oneCnt: 0,
        twoCnt: 0,
        threeCnt: 0,
        fourCnt: 0,
        fiveCnt: 0,
    };
    const [csatLessonDataSet, setCsatLessonDataSet] = useState(initialState);
    const [csatTeacherDataSet, setCsatTeacherDataSet] = useState(initialState);

    useEffect(() => {
        // 강사의 모든 수업 총 만족도 GET 요청
        axios.get(`${url}/csat/lesson/${userNo}`).then((response) => {
            const lessonData = response.data.result;
            if (response.data.resultCode === 0) {
                const lessonDataSet = {
                    oneCnt: lessonData.oneCnt,
                    twoCnt: lessonData.twoCnt,
                    threeCnt: lessonData.threeCnt,
                    fourCnt: lessonData.fourCnt,
                    fiveCnt: lessonData.fiveCnt,
                };
                setCsatLessonDataSet(lessonDataSet);
                setTeacherCsatLesson(lessonData.result.toFixed(1));
                setCsatLessonCount(lessonData.totalCnt);
            } else if (response.data.resultCode === -1) {
                setCsatLessonDataSet(null);
                setTeacherCsatLesson(null);
                // setCsatLessonCount(0);
            }
        });

        // 강사에 대한 모든 총 만족도 GET 요청
        axios.get(`${url}/csat/teacher/${userNo}`).then((response) => {
            const teacherData = response.data.result;
            if (response.data.resultCode === 0) {
                const teacherDataSet = {
                    oneCnt: teacherData.oneCnt,
                    twoCnt: teacherData.twoCnt,
                    threeCnt: teacherData.threeCnt,
                    fourCnt: teacherData.fourCnt,
                    fiveCnt: teacherData.fiveCnt,
                };
                setCsatTeacherDataSet(teacherDataSet);
                setTeacherCsatTeacher(teacherData.result.toFixed(1));
                setCsatTeacherCount(teacherData.totalCnt);
            } else if (response.data.resultCode === -1) {
                setCsatTeacherDataSet(null);
                setTeacherCsatTeacher(null);
            }
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
                                    {teacherCsatLesson === null
                                        ? "데이터 없음"
                                        : `⭐ ${teacherCsatLesson}`}{" "}
                                    ( {csatLessonCount}명 )
                                </div>
                            </InfoRateWrap>
                            <ApexChart
                                width={350}
                                chartType="pie"
                                type="csatpie"
                                seriesData={csatLessonDataSet}
                            />
                        </InfoRateWrap>
                        <InfoRateWrap>
                            <InfoRateWrap>
                                <div>
                                    <strong>강사 총 만족도</strong>
                                </div>
                                <div>
                                    {teacherCsatTeacher === null
                                        ? "데이터 없음"
                                        : `⭐ ${teacherCsatTeacher}`}{" "}
                                    ( {csatTeacherCount}명 )
                                </div>
                            </InfoRateWrap>
                            <ApexChart
                                width={350}
                                chartType="pie"
                                type="csatpie"
                                seriesData={csatTeacherDataSet}
                            />
                        </InfoRateWrap>
                    </StyledRateWrap>
                </ChartRateWrap>
            </ImgInfoWrap>
        </>
    );
};

export default TeacherLessonCsatBox;
