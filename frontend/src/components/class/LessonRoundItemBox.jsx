// 메인 페이지에서 사용되는 수업 회차별 박스
// 들어가는 내용 : 현재 회차, 일시, 수업 이름, 회차 제목, 강사 이름, 과제 일괄 다운, 강의룸 만들기
import { useEffect, useState } from "react"; // 내꺼.
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Typography } from "@mui/material";
import Button from "../common/Button";
import Card from "../common/Card";
import LessonStatusBox from "../common/LessonStatusBox";

import { useNavigate } from "react-router-dom";

const StyledButtonWrap = styled.div`
    text-align: right;

    & > *:not(:first-child) {
        margin-left: 0.75rem;
    }
`;

const LessonInfoWrap = styled.div`
    margin-left: 1rem;
    margin-top: 1rem;
    & > * {
        margin-bottom: 0.75rem;
    }
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RoundDateWrap = styled.div`
    :not(:first-child) {
        margin-left: 2rem;
    }
`;

const LessonRoundItemBox = ({ lessonInfo }) => {
    const userType = useSelector((state) => state.user.userType);
    const userName = useSelector((state)=> state.user.userName)
    const [bool, setBool] = useState(false);
    const navigate = useNavigate()

    console.log(userType, "userType");
    // const userType = "T";
    console.log(lessonInfo);
    // const [token, setToken] = useState("")
    const handleEnter = () => {
        setBool(true);
        navigate(`/lessonRoom/teacher/${lessonNo}/${lessonRoundNo}`)
    };
    const lessonNo = lessonInfo.lessonNo;
    const lessonRoundNo = lessonInfo.lessonRoundNo; // 임시
    const lessonName = lessonInfo.lessonName;


    // 날짜 format
    const startDatetime = new Date(lessonInfo.lessonRoundStartDatetime);
    const endDatetime = new Date(lessonInfo.lessonRoundEndDatetime);
    
    // 오늘 날짜 아니라면 전부 disabled
    const dayOfLesson = () => {
        const today = new Date()
        // 종료시간과 오늘 날짜가 동일하면 비활성화하기
        if (endDatetime.getFullYear() === today.getFullYear() && 
        endDatetime.getMonth() === today.getMonth() && 
        endDatetime.getDate() === today.getDate()) {
            return false
        } else return true
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // 시간 format
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours < 12 ? "오전" : "오후";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    };

    const formattedStartDate = `${formatDate(startDatetime)} ${formatTime(
        startDatetime
    )}`;
    const formattedEndDate = `${formatTime(endDatetime)}`;

    const enterStudentRoom = (event) => {
        event.stopPropagation()
        navigate(`/lessonroom/wait/${lessonNo}/${lessonRoundNo}`)        

    }

    return (
        <>
            <RoundDateWrap>
                <LessonStatusBox size="lg" $point $round>
                    {lessonInfo.lessonRoundNo}회차
                </LessonStatusBox>
                <span>
                    {formattedStartDate} ~ {formattedEndDate}
                </span>
            </RoundDateWrap>
            <LessonInfoWrap>
                <FlexWrap>
                    <Typography style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                        {lessonInfo.lessonName}
                    </Typography>
                    <div>{lessonInfo.userName} 강사님</div>
                </FlexWrap>
                <div>{lessonInfo.lessonRoundTitle}</div>
            </LessonInfoWrap>

            {/* 강사일 때 보일 버튼 */}
            {userType === "T" && (
                <StyledButtonWrap>
                    <Button className={"singleEvent"}><span className="singleEvent">과제 일괄 다운</span></Button>
                    {/* <Link to={`/lessonroom/teacher/${lessonNo}/${lessonRoundNo}`} 
                    state={userName}> */}
                    <Button $point onClick={handleEnter} disabled={dayOfLesson} className={"singleEvent"}><span className="singleEvent">강의룸 만들기</span></Button>
                    {/* </Link> */}
                </StyledButtonWrap>
            )}

            {/* 학생일 때 보일 버튼 */}
            {userType === "S" && (
                <StyledButtonWrap>
                    <Button className={"singleEvent"}> <span className="singleEvent">학습 자료 다운</span></Button>
                    <Button className={"singleEvent"}><span className="singleEvent">과제 제출</span></Button>
                        <Button $point onClick={enterStudentRoom} disabled={dayOfLesson} className={"singleEvent"}><span className="singleEvent">강의 입장</span></Button>
                </StyledButtonWrap>
            )}
        </>
    );
};

export default LessonRoundItemBox;
