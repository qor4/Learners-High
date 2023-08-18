// 메인 페이지에서 사용되는 수업 회차별 박스
// 들어가는 내용 : 현재 회차, 일시, 수업 이름, 회차 제목, 강사 이름, 과제 일괄 다운, 강의룸 만들기
import { useState } from "react"; // 내꺼.
import { useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../common/Button";
import LessonStatusBox from "../common/LessonStatusBox";

import { useNavigate } from "react-router-dom";
import { StyledTitleText } from "./LessonItemBox";
import tokenHttp, { url } from "../../api/APIPath";

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
    const [bool, setBool] = useState(false);
    const navigate = useNavigate();

    const handleEnter = () => {
        setBool(true);

        // 종료시간과 오늘 날짜가 동일하면 비활성화하기
        const today = new Date();
        const enableTimeStart = today.setMinutes(today.getMinutes() + 30);

        if (startDatetime > enableTimeStart || endDatetime < today) {
            console.log(enableTimeStart, today, "끝과 기준");
            alert("강의 시간이 아닙니다.");
            return;
        }

        navigate(`/lessonroom/teacher/${lessonNo}/${lessonRoundNo}`, {
            state: { lessonName },
        });
    };

    const lessonNo = lessonInfo.lessonNo;
    const lessonRoundNo = lessonInfo.lessonRoundNo; // 임시
    const lessonName = lessonInfo.lessonName;

    // 선생님 no
    const teacherNo = lessonInfo.userNo;

    // 날짜 format
    const startDatetime = new Date(lessonInfo.lessonRoundStartDatetime);
    const endDatetime = new Date(lessonInfo.lessonRoundEndDatetime);

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
        event.stopPropagation();

        // 종료시간과 오늘 날짜가 동일하면 비활성화하기
        const today = new Date();
        const enableTimeStart = today.setMinutes(today.getMinutes() + 30);

        if (startDatetime > enableTimeStart || endDatetime < today ) {
            console.log(enableTimeStart, today, "끝과 기준")
            alert("강의 시간이 아닙니다.");
            return;
        }

        navigate(`/lessonroom/wait/${lessonNo}/${lessonRoundNo}`, {
            state: { lessonName: lessonInfo.lessonName, teacherNo },
        });
    };

    // 강의자료 관련 함수
    const downloadLessonData = () => {
        try {
            tokenHttp
                .post(
                    `${url}/s3/download/data?lessonRoundNo=${Number(
                        lessonRoundNo
                    )}`
                )
                .then((res) => {
                    if (res.data.resultCode === -1) return;
                    var a = document.createElement("a");
                    a.href = res.data.resultMsg;
                    a.download = "download";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                })
                .catch((err) => {
                    console.log(err, "##");
                    alert("다운 실패");
                });
        } catch (err) {
            alert("강의 자료가 없습니다.");
        }
    };

    return (
        <>
            <RoundDateWrap>
                <LessonStatusBox size="lg" $point $round>
                    {lessonInfo.lessonRoundNumber}회차
                </LessonStatusBox>
                <span>
                    {formattedStartDate} ~ {formattedEndDate}
                </span>
            </RoundDateWrap>
            <LessonInfoWrap>
                <FlexWrap>
                    <StyledTitleText>{lessonInfo.lessonName}</StyledTitleText>
                    <div>{lessonInfo.userName} 강사님</div>
                </FlexWrap>
                <div>{lessonInfo.lessonRoundTitle}</div>
            </LessonInfoWrap>

            {/* 강사일 때 보일 버튼 */}
            {userType === "T" && (
                <StyledButtonWrap>
                    <Button
                        $point
                        onClick={handleEnter}
                        className={"singleEvent"}
                    >
                        <span className="singleEvent">강의룸 만들기</span>
                    </Button>
                </StyledButtonWrap>
            )}

            {/* 학생일 때 보일 버튼 */}
            {userType === "S" && (
                <StyledButtonWrap>
                    <Button
                        className={"singleEvent"}
                        onClick={downloadLessonData}
                    >
                        {" "}
                        학습 자료 다운
                    </Button>
                    <Button
                        $point
                        onClick={enterStudentRoom}
                        // disabled={dayOfLesson}
                        className={"singleEvent"}
                    >
                        강의 입장
                    </Button>
                </StyledButtonWrap>
            )}
        </>
    );
};

export default LessonRoundItemBox;
