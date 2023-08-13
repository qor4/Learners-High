import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeso from "seeso/easy-seeso";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import StudentLessonRoomPage from "./StudentLessonRoomPage";
import axios from "axios";
import { licenseKey } from "../../api/Ignore";
// import { seesoUrl } from "../../api/APIPath";

// 스타일
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { Typography } from "@mui/material";

import { HiMicrophone, HiVideoCamera } from "react-icons/hi";

import { ControlButtonWrap, RoomFrameWrap } from "./TeacherRoomFrame";

// Canvas를 담아둘 공간
const CanvasWrap = styled.div`
    // position: fixed;
    width: 80%;
    height: calc(100vh - 6.75rem);
    left: 50%;
    transform: translate(-50%, 0);
    top: 0.75rem;
    background-color: red;
    border-radius: 1.25rem;
    margin: 0 auto;
`;


// 화면을 확인할 수 있는 공간
const WaitScreen = styled.div`
    width: 100%;
    height: calc(100vh - 6.75rem);
    border-radius: 1.25rem;
    margin-bottom: 0.75rem;
    overflow: hidden;

    background-color: #e1e6f9;
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

    width: 60%;
    height: 4.5rem;
    background-color: #293c81;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    border-radius: 1.25rem;
`;

const dotMaxSize = 10;
const dotMinSize = 5;

const StudentWaitLessonRoomPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const [enterRoom, setEnterRoom] = useState(false);
    const videoRef = useRef(null);

    const location = useLocation();
    const lessonName = location.state.lessonName
        ? location.state.lessonName
        : null;

    let userStatus = useRef(null);
    const eyeTracker = useRef(null);
    let currentX, currentY;
    const { lessonNo, lessonRoundNo } = useParams();
    const [isSeesoInit, setSeesoInit] = useState(false);

    const [attentionScore, setAttentionScore] = useState(0);
    const [isFocus, setIsFocus] = useState(true);
    const [isTest, setIsTest] = useState(false);
    const [calibrationData, setCalibrationData] = useState(null);

    // 카메라 & 오디오 on/off
    const [videoEnabled, setVideoEnabled] = useState(true);
    const refVideo = useRef(null)
    const [audioEnabled, setAudioEnabled] = useState(false);

    const toggleVideo = () => {
        setVideoEnabled( prevState => !prevState);
    };

    // 내 마이크 on/off (상대방도 음성 꺼지는지 확인 )
    const toggleAudio = () => {
        setAudioEnabled(!audioEnabled);
    };

    useEffect(() => {
        window.addEventListener("blur", focusOutLessonRoom);
        window.addEventListener("focus", focusInLessonRoom);
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        })();

        if (!eyeTracker.current) {
            eyeTracker.current = new EasySeeso();
            userStatus.current = new UserStatusOption(true, false, false);
            (async () => {
                await eyeTracker.current.init(
                    licenseKey,
                    () => {
                        setSeesoInit(true);
                        setIsTest(false);
                        if (!eyeTracker.current.checkMobile()) {
                            eyeTracker.current.setMonitorSize(16); // 14 inch
                            eyeTracker.current.setFaceDistance(70);
                            eyeTracker.current.setCameraPosition(
                                window.outerWidth / 2,
                                true
                            );
                        }
                    }, // callback when init succeeded.
                    () => console.log("callback when init failed."), // callback when init failed.
                    userStatus.current
                );
            })();
        }
        const beforeunloadEvent = () => {
            console.log("너 실행됨?")
            console.log(videoRef.current)
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                console.log("너 실행됨?", stream)
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                }
            }
        }
        window.addEventListener("beforeunload", beforeunloadEvent)

        return () => {
            window.removeEventListener("blur", focusOutLessonRoom);
            window.removeEventListener("focus", focusInLessonRoom);

            beforeunloadEvent()
            window.removeEventListener("beforeunload", beforeunloadEvent);

            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                console.log("너 실행됨?", stream)
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                }
            }

            // if (webcam) {
            //     const tracks = webcam.srcObject.getTracks()
            //     tracks.forEach(track => track.stop())
            // }
        };
    }, []);
    // 다른 화면으로 변경 시 실행되는 callback 함수
    const focusOutLessonRoom = useCallback(() => {
        console.log("다른 화면 봄");
        setIsFocus(false);
    });

    // 강의실 화면으로 변경 시 실행되는 callback 함수
    const focusInLessonRoom = useCallback(() => {
        console.log("강의룸으로 돌아 옴");
        setIsFocus(true);
    });

    useEffect(() => {
        eyeTracker.current.startTracking(onGaze, onDebug);
    }, [isSeesoInit]);

    useEffect(() => {
        saveAttentionScore(attentionScore);
    }, [attentionScore]);

    // 화면을 보는지 안 보는 지를 파악하여 mongodb에 넣는 함수
    const saveAttentionScore = useCallback(
        (score) => {
            let currentScore = score;
            if (!isFocus) {
                console.log("다른 화면 보는 중");
                currentScore = 0;
            }
            // 조건
            if (enterRoom) {
                console.log("AttentScore : ", currentScore);
            }
            // mongodb server와 통신
            //     {
            // axios.post(
            //     `${seesoUrl}/seeso/attention-rate`,
            //       lessonRoundNo: Number(lessonRoundNo),
            //       lessonNo: Number(lessonNo),
            //       userNo: Number(userNo),
            //       rate: Number(score),
            //     },
            //     {
            //       headers: { "Content-Type": "application/json" }, // 요청 헤더 설정
            //     }
            //   )
            //     .then((res) => {
            //       console.log(res, "ddd");
            //     })
            //     .catch((err) => {
            //       console.error(err);
            //     });
        },
        [isFocus, enterRoom]
    );

    const onAttention = useCallback((timestampBegin, timestampEnd, score) => {
        console.log(
            `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}`
        );
        setAttentionScore(score);
    }, []);

    useEffect(() => {
        if (calibrationData !== null) {
            eyeTracker.current.startTracking(onGaze, onDebug);
            eyeTracker.current.setCalibrationData(calibrationData);
            console.log("test 함");
        } else {
            console.log("test 안함");
        }
    }, [enterRoom]);

    // calibration callback.
    function onCalibrationNextPoint(pointX, pointY) {
        currentX = pointX;
        currentY = pointY;
        let ctx = clearCanvas();
        drawCircle(currentX, currentY, dotMinSize, ctx);
        eyeTracker.current.startCollectSamples();
    }

    // calibration callback.
    function onCalibrationProgress(progress) {
        let ctx = clearCanvas();
        let dotSize = dotMinSize + (dotMaxSize - dotMinSize) * progress;
        drawCircle(currentX, currentY, dotSize, ctx);
    }

    // calibration callback.
    const onCalibrationFinished = useCallback((calibrationData) => {
        clearCanvas();
        eyeTracker.current.setUserStatusCallback(onAttention, null, null);
        eyeTracker.current.setAttentionInterval(10);
        setIsTest(false);
        setCalibrationData(calibrationData);
    }, []);

    function drawCircle(x, y, dotSize, ctx) {
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2, true);
        ctx.fill();
    }
    function clearCanvas() {
        let canvas = document.getElementById("output");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return ctx;
    }
    const onGaze = (gazeInfo) => {};
    const onDebug = (FPS, latency_min, latency_max, latency_avg) => {};

    const tmpClick = useCallback(() => {
        setIsTest(true);
        setTimeout(function () {
            eyeTracker.current.startCalibration(
                onCalibrationNextPoint,
                onCalibrationProgress,
                onCalibrationFinished
            );
        }, 1000);
    }, []);

    const enterTheLessonRoom = () => {
        setVideoEnabled(false)
        setEnterRoom(true);
    };

    return (
        <>
            <RoomFrameWrap>
                {!enterRoom && (
                    <>
                        <Container maxWidth="lg">
                            {/* 화면을 확인할 수 있는 공간 */}
                            <WaitScreen>
                            <canvas
                            id="output"
                            style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                zIndex:9999
                            }}
                        />
                            {videoEnabled && 
                            <Webcam 
                                style={{
                                    position: "absolute",
                                    // objectFit: "cover",
                                    width: "100%",
                                    
                                    height: "auto",
                                    top: "50%",
                                    left: "50%",
                                    overFit:"cover",
                                    transform: "translate(-50%, -50%)"
                                }}
                                ref={videoRef}
                                /> 
                            }
                            </WaitScreen>

                            {/* 하단 바 (강의명 박스 / 컨트롤 바) */}
                            <BottomBarWrap>
                                {/* 강의명 */}
                                <Typography fontWeight={"bold"}>
                                    강의명: {lessonName}
                                </Typography>

                                {/* 컨트롤 바 */}
                                <WaitControlBar>
                                    <ControlButtonWrap>
                                        <Button onClick={toggleAudio}>
                                            <HiMicrophone />
                                        </Button>
                                        <Button onClick={toggleVideo}>
                                            <HiVideoCamera />
                                        </Button>
                                    </ControlButtonWrap>

                                    <ControlButtonWrap>
                                        <Button
                                            onClick={tmpClick}
                                            disabled={!isSeesoInit}
                                        >
                                            테스트
                                        </Button>
                                        <Button onClick={enterTheLessonRoom}>
                                            강의 입장
                                        </Button>
                                    </ControlButtonWrap>
                                </WaitControlBar>
                            </BottomBarWrap>
                        </Container>
                    </>
                )}

                {enterRoom && <StudentLessonRoomPage lessonName={lessonName} />}
            </RoomFrameWrap>
        </>
    );
};

export default StudentWaitLessonRoomPage;
