// 메인 페이지에서 사용되는 수업 회차별 박스
// 들어가는 내용 : 현재 회차, 일시, 수업 이름, 회차 제목, 강사 이름, 과제 일괄 다운, 강의룸 만들기
import { useState } from "react"; // 내꺼.
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../common/Button";
import Card from "../common/Card";
import LessonStatusBox from "../common/LessonStatusBox";

import VideoRoomComponent from "../VideoRoomComponent";

const StyledButtonWrap = styled.div`
    /* position: absolute;
    right: 0;
    bottom: 0;
    margin: 1.25rem; */
    text-align: right;

    & > *:not(:first-child) {
        margin-left: 0.75rem;
    }
`;

const LessonRoundItemBox = ({ lessonInfo }) => {
    const userType = useSelector((state) => state.user.userType);
    console.log(userType, "userType");
    // const userType = "T";
    console.log(lessonInfo);
    const [bool, setBool] = useState(false);
    // const [token, setToken] = useState("")
    const handleEnter = () => {
        setBool(true);

        // axios.get(`${url}/lesson/lessonId/3/15/2`)
        // .then(res=> {
        //     setToken(res.data.token)
        // })
    };
    const lessonNo = "1"; // 임시
    const lessonRoundNo = "2"; // 임시

    return (
        <>
            <div>
                <LessonStatusBox size="lg" $point $round>
                    {lessonInfo.lessonRoundNo}회차
                </LessonStatusBox>
                <span>
                    {lessonInfo.lessonRoundStartDatetime} ~{" "}
                    {lessonInfo.lessonRoundEndDatetime}
                </span>
            </div>

            <div>{lessonInfo.lessonName}</div>
            <div>{lessonInfo.lessonRoundTitle}</div>
            <div>{lessonInfo.userName} 강사님</div>

            {/* 강사일 때 보일 버튼 */}
            {userType === "T" && (
                <StyledButtonWrap>
                    <Button>과제 일괄 다운</Button>
                    <Link
                        to={`/lessonroom/${lessonNo}/${lessonRoundNo}/teacher`}
                        state=""
                    >
                        <Button $point onClick={handleEnter}>
                            강의룸 만들기
                        </Button>
                    </Link>
                </StyledButtonWrap>
            )}

            {/* 학생일 때 보일 버튼 */}
            {userType === "S" && (
                <StyledButtonWrap>
                    <Button>학습 자료 다운</Button>
                    <Button>과제 제출</Button>
                    <Link to={`/lessonroom/${lessonNo}/${lessonRoundNo}/wait`}>
                        <Button $point>강의 입장</Button>
                    </Link>
                </StyledButtonWrap>
            )}
        </>
    );
};

export default LessonRoundItemBox;
