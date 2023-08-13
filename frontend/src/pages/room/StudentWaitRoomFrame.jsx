// 학생 대기룸 틀

import { ControlButtonWrap, RoomFrameWrap } from "./TeacherRoomFrame";

import styled from "styled-components";
import { Container } from "@material-ui/core";
import { Typography } from "@mui/material";

import { HiMicrophone, HiVideoCamera } from "react-icons/hi";
import Button from "../../components/common/Button";

// 화면을 확인할 수 있는 공간
const WaitScreen = styled.div`
    width: 100%;
    height: calc(100vh - 6.75rem);
    border-radius: 1.25rem;
    margin-bottom: 0.75rem;

    background-color: #ddd;

    position: relative;
`;

// 하단 바 (강의명 박스 / 컨트롤 바)
const BottomBarWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 수업 컨트롤 바
const WaitControlBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 70%;
    height: 4.5rem;
    background-color: #293c81;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    border-radius: 1.25rem;
`;

const StudentWaitRoomFrame = () => {
    return (
        <RoomFrameWrap>
            <Container maxWidth="md">
                {/* 화면을 확인할 수 있는 공간 */}
                <WaitScreen></WaitScreen>

                {/* 하단 바 (강의명 박스 / 컨트롤 바) */}
                <BottomBarWrap>
                    {/* 강의명 */}
                    <Typography fontWeight={"bold"}>강의명입니당!</Typography>

                    {/* 컨트롤 바 */}
                    <WaitControlBar>
                        <ControlButtonWrap>
                            <Button>
                                <HiMicrophone />
                            </Button>
                            <Button>
                                <HiVideoCamera />
                            </Button>
                        </ControlButtonWrap>

                        <ControlButtonWrap>
                            <Button>테스트</Button>
                            <Button>강의 입장</Button>
                        </ControlButtonWrap>
                    </WaitControlBar>
                </BottomBarWrap>
            </Container>
        </RoomFrameWrap>
    );
};

export default StudentWaitRoomFrame;
