// 강사 수업 상세 (내 수업 상세) 페이지

import { useParams } from "react-router-dom";

// 스타일 import
import { StyledButtonWrap } from "./EduTeacherManagePage";
import { StyledTeacherInfoWrap } from "./TeacherProfilePage";
import { ImgInfoWrap, InfoWrap } from "../components/class/TeacherIntroduceBox";
import { StyledChart } from "../components/class/TeacherLessonCsatBox";

import { Container } from "@mui/material";
import Button from "../components/common/Button";
import { useEffect } from "react";

const EduTeacherLessonPage = () => {
    const { lessonNo } = useParams();

    useEffect(() => {
        
    }, [])
    return (
        <>
            {/* 수업 출석률과 과제 제출률에 관한 차트와 수업 이름 등이 들어갈 정보박스 */}
            <StyledTeacherInfoWrap>
                <Container maxWidth="md">
                    <h1>
                        강사 수업 상세 페이지 (내 수업 상세) {lessonNo} 번~!!!
                    </h1>
                    <ImgInfoWrap>
                        {/* 분석 차트가 들어갈 공간입니다!@@@ */}
                        <StyledChart>차트 들어가욧</StyledChart>
                        {/* 수업 총 만족도와 강사 총 만족도 */}
                        <InfoWrap>
                            {/* 수업 이름 */}

                            {/* 수업 출석률 / 과제 제출률 */}
                        </InfoWrap>
                    </ImgInfoWrap>
                </Container>
            </StyledTeacherInfoWrap>

            {/* 탭바 */}
            <Container maxWidth="md">
                <StyledButtonWrap>
                    <Button>학생</Button>
                    <Button>분석</Button>
                    <Button>소개</Button>
                    <Button>과제</Button>
                </StyledButtonWrap>

                {/* 해당 탭바에 따른 정보가 담긴 테이블 */}
                <div>
                    <h2>여기에 정보가 들어와요~~ (테이블)</h2>
                </div>
            </Container>
        </>
    );
};

export default EduTeacherLessonPage;
