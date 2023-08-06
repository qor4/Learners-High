// 학생 수업 관리 목록 페이지

import { styled } from "styled-components";
import { Container } from "@mui/material";

import Button from "../components/common/Button";
import { useState } from "react";

// 강의 wrap
const StyledCsatInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

// 탭바 버튼 wrap
const StyledButtonWrap = styled.div`
    margin-top: 2rem;
    & > *:not(:first-child) {
        margin-left: 0.5rem;
    }
`

const EduStudentManagePage = () => {
    const [selectedTabBar, setSelectedTabBar] = useState("수강 중인 강의")
    return (
        <>
            {/* 분석 내용이 들어갈 공간입니다.@@@ */}
            <StyledCsatInfoWrap>
                <div>
                    최학생이 열심히 공부한 과목은 프로그래밍입니다. <br />
                    프로그래밍에서 가장 집중한 강사는 김강사입니다. <br />
                    이러한 분석 내용이 들어갈 박스입니다.
                </div>
            </StyledCsatInfoWrap>

            <Container maxWidth="md">
                {/* 탭바 */}
                <StyledButtonWrap>
                    <Button>수강 중인 강의</Button>
                    <Button>수강 예정 강의</Button>
                    <Button>수강 완료 강의</Button>
                    <Button>내가 찜한 강의</Button>
                </StyledButtonWrap>

                {/* 강의 목록들이 들어갈 공간 */}
            </Container>
        </>
    );
};

export default EduStudentManagePage;
