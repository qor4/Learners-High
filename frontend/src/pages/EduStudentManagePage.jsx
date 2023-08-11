// 학생 수업 관리 목록 페이지

import { styled } from "styled-components";
import { Container } from "@mui/material";

import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tokenHttp, { url } from "../api/APIPath";
import LessonItemBoxList from "../components/class/LessonItemBoxList";
import LessonList from "../components/class/LessonList";
import axios from "axios";

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
`;

const EduStudentManagePage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const [studentLessonDataSet, setStudentLessonDataSet] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("수강 중");
    const [studentWishDataSet, setStudentWishDataSet] = useState([]);

    useEffect(() => {
        tokenHttp
            .get(`${url}/student/lesson/list/${userNo}`)
            .then((response) => {
                console.log(response.data);
                setStudentLessonDataSet(response.data.result);
            });
        tokenHttp
            .get(`${url}/student/wish/list?userNo=${userNo}`)
            .then((response) => {
                console.log(response.data);
                setStudentWishDataSet(response.data);
            });
    }, []);

    return (
        <>
            {/* 분석 내용이 들어갈 공간입니다.@@@ */}
            <StyledCsatInfoWrap>
                <Container maxWidth="md">
                    <div>
                        최학생이 열심히 공부한 과목은 프로그래밍입니다. <br />
                        프로그래밍에서 가장 집중한 강사는 김강사입니다. <br />
                        이러한 분석 내용이 들어갈 박스입니다.
                    </div>
                </Container>
            </StyledCsatInfoWrap>

            <Container maxWidth="md">
                {/* 탭바 */}
                <StyledButtonWrap>
                    <Button
                        onClick={() => setSelectedStatus("수강 중")}
                        $point={selectedStatus === "수강 중"}
                        disabled={selectedStatus === "수강 중"}
                    >
                        수강 중
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("수강 예정")}
                        $point={selectedStatus === "수강 예정"}
                        disabled={selectedStatus === "수강 예정"}
                    >
                        수강 예정
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("수강 완료")}
                        $point={selectedStatus === "수강 완료"}
                        disabled={selectedStatus === "수강 완료"}
                    >
                        수강 완료
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("내가 찜한 강의")}
                        $point={selectedStatus === "내가 찜한 강의"}
                        disabled={selectedStatus === "내가 찜한 강의"}
                    >
                        내가 찜한 강의
                    </Button>
                </StyledButtonWrap>

                {/* 강의 목록들이 들어갈 공간 => 찜한 강의 제외 */}
                {selectedStatus !== "내가 찜한 강의" && (
                    <LessonItemBoxList
                        lessonList={studentLessonDataSet}
                    ></LessonItemBoxList>
                )}

                {/* 찜한 강의를 보여주는 공간 */}
                {selectedStatus === "내가 찜한 강의" && (
                    <>
                        <LessonList items={studentWishDataSet} />
                    </>
                )}
            </Container>
        </>
    );
};

export default EduStudentManagePage;
