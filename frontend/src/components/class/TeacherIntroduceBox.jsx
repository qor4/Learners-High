// 강사 소개 박스 (강의 상세 / 강사 페이지에서 사용될 박스)
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";

import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";
import { useState } from "react";

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
    
    // 강사 만족도, 수업 만족도 GET 요청@@@
    const teacherNo = teacherInfo.userNo;
    const eduInfo = teacherInfo.eduInfos;
    const jobInfo = teacherInfo.jobInfos;

    return (
        <Container maxWidth="md">
            <ImgInfoWrap>
                {/* 강사 이미지 */}
                <StyledThumbnail
                    src={
                        teacherInfo.profileImg
                            ? teacherInfo.profileImg
                            : "/assets/bannerimg.jpg"
                    }
                    alt="teacher-img"
                />

                <InfoWrap>
                    {!$profile && (
                        <FlexWrap>
                            {/* 수업 만족도 / 강사 만족도 데이터 받아와서 써야돼요!@@@ */}
                            <div>
                                <strong>수업 만족도</strong>
                                <span>😍 {teacherCsatLesson}</span>
                            </div>
                            <div>
                                <strong>강사 만족도</strong>
                                <span>😍 {teacherCsatTeacher}</span>
                            </div>
                        </FlexWrap>
                    )}

                    {/* 강사 이름 */}
                    <span>
                        <div>
                            {teacherInfo && teacherInfo.userName} 강사님
                        </div>
                    </span>

                    {/* 강사 한 마디 */}
                    {$profile && (
                        <Card style={{ textAlign: "center" }}>
                            {teacherInfo.userInfo}
                        </Card>
                    )}

                    {/* 학력과 경력이 들어가는 공간 */}
                    {eduInfo && eduInfo.length > 0 && (
                        <LessonStatusBox $point $round>
                            학력
                        </LessonStatusBox>
                    )}
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

                    {jobInfo && jobInfo.length > 0 && (
                        <LessonStatusBox $point $round>
                            경력
                        </LessonStatusBox>
                    )}
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
                </InfoWrap>
            </ImgInfoWrap>
        </Container>
    );
};

export default TeacherIntroduceBox;
