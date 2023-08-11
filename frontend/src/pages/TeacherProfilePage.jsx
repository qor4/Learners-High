// 강사 프로필 페이지

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Container } from "@material-ui/core";
import tokenHttp, { url } from "../api/APIPath";

import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";
import LessonList from "../components/class/LessonList";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

// 선생님 wrap
const StyledTeacherInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

const TeacherProfilePage = () => {
    const { userNo } = useParams(); // teacherNo
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    const [teacherCsatLesson, setTeacherCsatLesson] = useState(0); // 강의 총 만족도
    const [csatLessonCount, setCsatLessonCount] = useState(0); // 강의 총 만족도 참여 인원 수
    const [teacherCsatTeacher, setTeacherCsatTeacher] = useState(0); // 강사 총 만족도
    const [csatTeacherCount, setCsatTeacherCount] = useState(0); // 강사 총 만족도 참여 인원 수

    const [selectedLessonStatus, setSelectedLessonStatus] = useState("전체");
    const [teacherLessonDataSet, setTeacherLessonDataSet] = useState([]);

    useEffect(() => {
        // 강사 프로필 GET 요청
        axios.get(`${url}/teacher/profile/${userNo}`).then((response) => {
            setTeacherInfoDataSet(response.data.result);
        });


        // @@@ 수정
        // // 강사의 모든 수업 총 만족도 GET 요청
        // axios.get(`${url}/csat/lesson/${userNo}`).then((response) => {
        //     console.log(response.data.result);
        //     setTeacherCsatLesson(response.data.result);
        //     setCsatLessonCount(response.data.satiCnt);
        // });

        // // 강사에 대한 모든 총 만족도 GET 요청
        // axios.get(`${url}/csat/teacher/${userNo}`).then((response) => {
        //     console.log(response);
        //     setTeacherCsatTeacher(response.data.result);
        //     setCsatTeacherCount(response.data.satiCnt);
        // });

        // 강사 수업 목록 GET 요청
        axios
            .get(`${url}/teacher/lesson/list/${userNo}?status=전체`)
            .then((response) => {
                console.log(response.data.result);
                setTeacherLessonDataSet(response.data.result);
            });
    }, [userNo]);

    // 강의 상태에 따른 데이터 GET 요청

    return (
        <div>
            <StyledTeacherInfoWrap>
                {/* 강사 정보 들어갈 공간 */}
                <TeacherIntroduceBox
                    teacherInfo={teacherInfoDataSet}
                    $profile
                />
            </StyledTeacherInfoWrap>

            <Container maxWidth="md">
                {/* 분석 내용(수업 만족도, 총 강사 만족도)이 들어갈 공간 */}
                <Card>
                    {/* 수업 만족도, 총 강사 만족도 GET 요청으로 받아오기@@@ */}
                    분석 내용(수업 만족도, 총 강사 만족도)이 들어갈 공간입니다!{" "}
                    <br />
                    수업 총 만족도 : {teacherCsatLesson} ( {csatLessonCount} ){" "}
                    <br />
                    강사 총 만족도 : {teacherCsatTeacher} ( {csatTeacherCount} )
                </Card>

                {/* 탭바 (전체 강의 / 수업 예정 / 진행 중 / 종료) */}
                <div>
                    <Button>전체</Button>
                    <Button>강의 중</Button>
                    <Button>강의 종료</Button>
                    <Button>강의 전</Button>
                </div>
                {/* 상태에 따른 강사의 강의 목록 */}
                <LessonList items={teacherLessonDataSet} />

                {/* 페이지네이션 */}
            </Container>
        </div>
    );
};

export default TeacherProfilePage;
