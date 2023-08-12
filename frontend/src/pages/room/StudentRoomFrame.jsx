// 학생 강의룸 틀
import styled from "styled-components";
import { Typography } from "@mui/material";
import { HiMicrophone, HiVideoCamera } from "react-icons/hi";
import {
    ControlButtonWrap,
    LessonControlBar,
    RoomFrameWrap,
    ScreenShare,
    StudentScreen,
} from "./TeacherRoomFrame";
import Button from "../../components/common/Button";

// 수업 컨트롤 바, 화면 공유 Wrap
const ControlBarShareWrap = styled.div`
    width: 75%;
`;

// 학생 상태 바, 채팅 컴포넌트 Wrap
const StateChatWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 23%;
`;

// 채팅 컴포넌트 Wrap
const ChatWrap = styled.div`
    width: 100%;
    height: 60%;

    border-radius: 1.25rem;
    padding: 0.75rem;
    box-sizing: border-box;

    background-color: #e1e6f9;
`;

const StudentRoomFrame = () => {
    return (
        <RoomFrameWrap>
            {/* 수업 컨트롤 바 / 화면 공유가 담길 div 박스 */}
            <ControlBarShareWrap>
                {/* 학생 수업 관리 바 */}
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
                        {/* 수업 나가기 */}
                        <Button>나가기</Button>
                    </ControlButtonWrap>
                </LessonControlBar>

                {/* 화면 공유 박스 */}
                <ScreenShare></ScreenShare>
            </ControlBarShareWrap>

            {/* 학생 상태 경고 바 / 채팅 컴포넌트가 담길 div 박스 */}
            <StateChatWrap>
                {/* 학생 본인의 화면 */}
                <StudentScreen></StudentScreen>

                {/* 채팅 컴포넌트 */}
                <ChatWrap></ChatWrap>
            </StateChatWrap>
        </RoomFrameWrap>
    );
};

export default StudentRoomFrame;
