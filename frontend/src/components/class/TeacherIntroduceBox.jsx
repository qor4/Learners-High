// 강사 소개 박스 (강의 상세 / 강사 페이지에서 사용될 박스)
import { useEffect, useState } from "react";

import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
import { url } from "../../api/APIPath";

import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";
import { StyledTitleText } from "./LessonItemBox";
import axios from "axios";

// 강사 wrap
export const ImgInfoWrap = styled.div`
    padding: 3rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

/** image styled 컴포넌트 */
export const StyledThumbnail = styled.img`
    width: 35%;
    border-radius: 50%;
`;

/** info를 묶어주는 wrap 스타일 컴포넌트 */
export const InfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;

    & > *:not(:first-child) {
        margin-top: 1rem;
    }
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
        width: 50%;
    }
    & > div > *:not(:first-child) {
        margin-left: 1.5rem;
    }
`;

const TeacherIntroduceBox = ({ teacherInfo, $profile }) => {
    const [teacherCsatLesson, setTeacherCsatLesson] = useState(0);
    const [teacherCsatTeacher, setTeacherCsatTeacher] = useState(0);
    const [csatLessonCount, setCsatLessonCount] = useState(0); // 강의 총 만족도 참여 인원 수
    const [csatTeacherCount, setCsatTeacherCount] = useState(0); // 강사 총 만족도 참여 인원 수

    const [profileImg, setProfileImg] = useState(false);

    const teacherNo = teacherInfo.userNo;
    const eduInfo = teacherInfo.eduInfos;
    const jobInfo = teacherInfo.jobInfos;

    useEffect(() => {
        // teacherNo가 있을 때에만 실행
        if (teacherNo) {
            // 강사의 모든 수업 총 만족도 GET 요청
            axios.get(`${url}/csat/lesson/${teacherNo}`).then((response) => {
                const lessonData = response.data.result;
                if (response.data.resultCode === 0) {
                    setTeacherCsatLesson(lessonData.result.toFixed(1));
                    setCsatLessonCount(lessonData.totalCnt);
                } else if (response.data.resultCode === -1) {
                    setTeacherCsatLesson(null);
                }
            });

            // 강사에 대한 모든 총 만족도 GET 요청
            axios.get(`${url}/csat/teacher/${teacherNo}`).then((response) => {
                const teacherData = response.data.result;
                if (response.data.resultCode === 0) {
                    setTeacherCsatTeacher(teacherData.result.toFixed(1));
                    setCsatTeacherCount(teacherData.totalCnt);
                } else if (response.data.resultCode === -1) {
                    setTeacherCsatTeacher(null);
                }
            });
            axios.get(`${url}/s3/profile-load/${teacherNo}`).then((res) => {
                if (res.data.resultCode === -1) {
                    setProfileImg(false);
                    return;
                } else if (res.data.resultCode === 0) {
                    setProfileImg(res.data.result);
                }
            });
        }
    }, [teacherNo]);

    return (
        <Container maxWidth="md">
            <ImgInfoWrap>
                {/* 강사 이미지 */}
                <StyledThumbnail
                    src={profileImg ? profileImg : "/assets/blank-profile.png"}
                    alt="teacher-img"
                    crossOrigin="anonymous"
                />

                <InfoWrap>
                    {!$profile && (
                        <FlexWrap>
                            <div>
                                <strong>수업 만족도</strong>
                                <span>
                                    ⭐{" "}
                                    {teacherCsatLesson === null
                                        ? "데이터 없음"
                                        : `${teacherCsatLesson} ( ${csatLessonCount}명 )`}
                                </span>
                            </div>
                            <div>
                                <strong>강사 만족도</strong>
                                <span>
                                    ⭐{" "}
                                    {teacherCsatTeacher === null
                                        ? "데이터 없음"
                                        : `${teacherCsatTeacher} ( ${csatTeacherCount}명 )`}
                                </span>
                            </div>
                        </FlexWrap>
                    )}

                    {/* 강사 이름 */}
                    <span>
                        <StyledTitleText>
                            {teacherInfo && teacherInfo.userName} 강사님
                        </StyledTitleText>
                    </span>

                    {/* 강사 한 마디 */}
                    {$profile && (
                        <Card style={{ textAlign: "center" }}>
                            {teacherInfo.userInfo}
                        </Card>
                    )}

                    {/* 학력과 경력이 들어가는 공간 */}
                    <LessonStatusBox $point $round>
                        학력
                    </LessonStatusBox>
                    {eduInfo &&
                        eduInfo.map((eduItem, index) => (
                            <Card key={index} style={{ textAlign: "center" }}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <strong>
                                            {eduItem.universityName}
                                        </strong>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {eduItem.majorName}
                                    </Grid>
                                    <Grid item xs={2}>
                                        {eduItem.degree}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {eduItem.eduStartDate} ~{" "}
                                        {eduItem.eduEndDate}
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    {eduInfo && eduInfo.length === 0 && (
                        <Card>등록된 학력이 존재하지 않습니다.</Card>
                    )}

                    <LessonStatusBox $point $round>
                        경력
                    </LessonStatusBox>
                    {jobInfo &&
                        jobInfo.map((jobItem, index) => (
                            <Card key={index} style={{ textAlign: "center" }}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <strong>{jobItem.companyName}</strong>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {jobItem.departName}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {jobItem.hireStartDate} ~{" "}
                                        {jobItem.hireEndDate}
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    {jobInfo && jobInfo.length === 0 && (
                        <Card>등록된 경력이 존재하지 않습니다.</Card>
                    )}
                </InfoWrap>
            </ImgInfoWrap>
        </Container>
    );
};

export default TeacherIntroduceBox;
