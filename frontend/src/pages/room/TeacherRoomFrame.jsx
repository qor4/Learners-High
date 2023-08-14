// 강사 강의룸 틀
import styled from "styled-components";
import { Typography } from "@mui/material";

import { HiMicrophone, HiVideoCamera, HiDesktopComputer } from "react-icons/hi";
import Button from "../../components/common/Button";

// 전체 Wrap (가로, 세로 100%)
export const RoomFrameWrap = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    padding: 0.75rem;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
`;

// 학생들 화면이 담길 Wrap
const StudentScreenWrap = styled.div`
    width: 17%;
    height: 100%;
    background-color: #e1e6f9;
    border-radius: 1.25rem;
    padding: 0.75rem;
    box-sizing: border-box;
    overflow: scroll;

    & > *:not(:last-child) {
        margin-bottom: 0.75rem;
    }
`;
// 학생 한 명의 화면
export const StudentScreen = styled.div`
    width: 100%;
    // height auto로 변경하기@@@ (화면 들어왔을 때, 높이 자동 설정)
    height: auto;
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: #ddd;
`;

// 수업 컨트롤 바, 화면 공유 Wrap
const ControlBarShareWrap = styled.div`
    width: 60%;
`;

// 수업 컨트롤 바
export const LessonControlBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 4.5rem;
    background-color: #293c81;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    border-radius: 1.25rem;
    margin-bottom: 0.75rem;
`;

// 수업 컨트롤 버튼 Wrap
export const ControlButtonWrap = styled.div`
    :not(:first-child) {
        margin-left: 0.5rem;
    }
`;

// 화면 공유
export const ScreenShare = styled.div`
    width: 100%;
    height: calc(100vh - 6.75rem);
    border-radius: 1.25rem;
    overflow: hidden;
    background-color: #ddd;
`;

// 학생 상태 바, 채팅 컴포넌트 Wrap
const StateChatWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
`;

// 학생 상태 바
const StateNotification = styled.div`
    width: 100%;
    height: 58%;

    border-radius: 1.25rem;
    padding: 0.75rem;
    box-sizing: border-box;

    background-color: #293c81;
    overflow: scroll;
`;

// 채팅 컴포넌트 Wrap
const ChatWrap = styled.div`
    width: 100%;
    height: 40%;

    border-radius: 1.25rem;
    padding: 0.75rem;
    box-sizing: border-box;

    background-color: #e1e6f9;
`;

const TeacherRoomFrame = () => {
    return (
        <RoomFrameWrap>
            {/* 학생들 화면이 담길 div 박스 */}
            <StudentScreenWrap>
                {/* 각각의 학생들 화면 */}
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
                <StudentScreen></StudentScreen>
            </StudentScreenWrap>

            {/* 수업 컨트롤 바 / 화면 공유가 담길 div 박스 */}
            <ControlBarShareWrap>
                {/* 강사 수업 관리 바 */}
                <LessonControlBar>
                    {/* 수업 타이틀 @@@ */}
                    <Typography fontWeight={"bold"} color={"white"}>
                        수업 타이틀 : {}
                    </Typography>

                    <ControlButtonWrap>
                        {/* 마이크 */}
                        <Button>
                            <HiMicrophone />
                        </Button>
                        {/* 비디오 */}
                        <Button>
                            <HiVideoCamera />
                        </Button>
                        {/* 화면 공유 @@@ */}
                        <Button>
                            <HiDesktopComputer />
                        </Button>
                        {/* 수업 종료 */}
                        <Button>수업 종료</Button>
                    </ControlButtonWrap>
                </LessonControlBar>

                {/* 화면 공유 박스 */}
                <ScreenShare></ScreenShare>
            </ControlBarShareWrap>

            {/* 학생 상태 경고 바 / 채팅 컴포넌트가 담길 div 박스 */}
            <StateChatWrap>
                {/* 학생 상태 경고 바 */}
                <StateNotification>
                    {/* 학생 개개인의 상태와 주의 표시 버튼을 나타낼 박스 */}
                    <div></div>
                </StateNotification>

                {/* 채팅 컴포넌트 */}
                <ChatWrap></ChatWrap>
            </StateChatWrap>
        </RoomFrameWrap>
    );
};

export default TeacherRoomFrame;
