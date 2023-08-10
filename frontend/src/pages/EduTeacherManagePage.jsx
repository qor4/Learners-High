// 강사 수업 관리 목록 페이지
import { styled } from "styled-components";
import { Container } from "@mui/material";
import Button from "../components/common/Button";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LessonItemBoxList from "../components/class/LessonItemBoxList";
import tokenHttp, { url } from "../api/APIPath";

// 탭바 버튼 wrap
const StyledButtonWrap = styled.div`
    margin-top: 2rem;
    & > *:not(:first-child) {
        margin-left: 0.5rem;
    }
`;

const EduTeacherManagePage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const [teacherLessonDataSet, setTeacherLessonDataSet] = useState([]);

    useEffect(() => {
        tokenHttp
            .get(`${url}/teacher/lesson/list/${userNo}?status=전체`)
            .then((response) => {
                console.log(response.data.result)
                setTeacherLessonDataSet(response.data.result);
            });
    }, []);
    return (
        <>
            <h1>강사 수업 관리 목록 페이지입니다.</h1>
            {/* 수업 만족도 / 총 강사 만족도를 나타내주는 공간 */}
            <Container maxWidth="md">
                {/* 탭바 + 강의 개설 버튼 */}
                <StyledButtonWrap>
                    <Button>수업 중인 강의</Button>
                    <Button>수업 예정 강의</Button>
                    <Button>종료된 강의</Button>
                </StyledButtonWrap>

                {/* 강의 목록들이 들어갈 공간 */}
                <LessonItemBoxList
                    lessonList={teacherLessonDataSet}
                ></LessonItemBoxList>
            </Container>
        </>
    );
};

export default EduTeacherManagePage;
