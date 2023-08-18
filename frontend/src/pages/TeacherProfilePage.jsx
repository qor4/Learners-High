// 강사 프로필 페이지

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Container } from "@material-ui/core";
import { url } from "../api/APIPath";

import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";
import LessonList from "../components/class/LessonList";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { StyledButtonWrap } from "./EduStudentManagePage";
import TeacherLessonCsatBox from "../components/class/TeacherLessonCsatBox";

// 선생님 wrap
export const StyledTeacherInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

const TeacherProfilePage = () => {
    const { userNo } = useParams(); // teacherNo
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState("전체");
    const [teacherLessonDataSet, setTeacherLessonDataSet] = useState([]);

    useEffect(() => {
        // 강사 프로필 GET 요청
        axios.get(`${url}/teacher/profile/${userNo}`).then((response) => {
            setTeacherInfoDataSet(response.data.result);
        });

        // 강사 수업 목록 GET 요청
        axios
            .get(
                `${url}/teacher/lesson/list/${userNo}?status=${selectedStatus}`
            )
            .then((response) => {
                setTeacherLessonDataSet(response.data.result);
            });

        axios
            .get(
                `${url}/teacher/lesson/list/${userNo}?status=${selectedStatus}`
            )
            .then((response) => {
                setTeacherLessonDataSet(response.data.result);
            });
    }, [userNo, selectedStatus]);

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
                    <TeacherLessonCsatBox userNo={userNo} />
                </Card>

                {/* 탭바 (전체 강의 / 수업 예정 / 진행 중 / 종료) */}
                <StyledButtonWrap>
                    <Button
                        onClick={() => setSelectedStatus("전체")}
                        $point={selectedStatus === "전체"}
                        disabled={selectedStatus === "전체"}
                    >
                        전체
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("강의 중")}
                        $point={selectedStatus === "강의 중"}
                        disabled={selectedStatus === "강의 중"}
                    >
                        진행 중
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("강의 전")}
                        $point={selectedStatus === "강의 전"}
                        disabled={selectedStatus === "강의 전"}
                    >
                        수업 예정
                    </Button>
                    <Button
                        onClick={() => setSelectedStatus("강의 종료")}
                        $point={selectedStatus === "강의 종료"}
                        disabled={selectedStatus === "강의 종료"}
                    >
                        종료
                    </Button>
                </StyledButtonWrap>
                {/* 상태에 따른 강사의 강의 목록 */}
                {teacherLessonDataSet.length > 0 ? (
                    <LessonList items={teacherLessonDataSet} />
                ) : (
                    <Card style={{ textAlign: "center" }}>데이터 없음</Card>
                )}

                {/* 페이지네이션 */}
            </Container>
        </div>
    );
};

export default TeacherProfilePage;
