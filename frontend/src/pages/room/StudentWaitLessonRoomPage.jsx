import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeso from "seeso/easy-seeso";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import { useCallback } from "react";
import StudentLessonRoomPage from "./StudentLessonRoomPage";
import { licenseKey } from "../../api/Ignore";
import tokenHttp, { homeurl, url } from "../../api/APIPath";

// 스타일
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { Typography } from "@mui/material";

import { ControlButtonWrap, RoomFrameWrap } from "./TeacherRoomFrame";

import {
    PiVideoCameraBold, // 카메라 on
    PiVideoCameraSlashBold, // 카메라 off
    PiMicrophoneBold, //마이크 On
    PiMicrophoneSlashBold, // 마이크 Off
} from "react-icons/pi";
import { conteffi } from "../../App";

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

    const location = useLocation();
    const lessonName = location.state.lessonName
        ? location.state.lessonName
        : null;
    const teacherNo = location.state.teacherNo;
    let currentX, currentY;
    const { lessonNo, lessonRoundNo } = useParams();

    const [enterRoom, setEnterRoom] = useState(false);
    const [attentionList, setAttentionList] = useState([]);
    let userStatus = useRef(null);
    let eyeTracker = useRef(null);
    const [isSeesoInit, setSeesoInit] = useState(false);

    const [attentionScore, setAttentionScore] = useState(0);
    const [isFocus, setIsFocus] = useState(true);
    const [isTest, setIsTest] = useState(false);
    const [calibrationData, setCalibrationData] = useState(null);
    const [isClose, setIsClose] = useState(false);

    // 카메라 & 오디오 on/off
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // 주의 알림 count 객체
    const [notificationCnt, setNotificationCnt] = useState(0);
    const [isAttention, setIsAttention] = useState(true);

    // 알림 sse 객체
    const es = useRef();

    const toggleVideo = () => {
        setVideoEnabled((prevState) => !prevState);
    };
    // 내 마이크 on/off (상대방도 음성 꺼지는지 확인 )
    const toggleAudio = () => {
        setAudioEnabled(!audioEnabled);
    };

    useEffect(() => {
        window.addEventListener("blur", focusOutLessonRoom);
        window.addEventListener("focus", focusInLessonRoom);

        setNotificationCnt(0);

        es.current = new EventSource(`${url}/notification/subscribe/${userId}`);

        es.current.onopen = (e) => {
            console.log("SSEONOPEN==========", es);
        };

        es.current.addEventListener("send", function (event) {
            console.log("ADDEVENTLISTENER==========", event.data);
            const sound = new Audio("/assets/audios/action.mp3");
            sound.play();

            setTimeout(() => {
                sound.pause();
                sound.currentTime = 0;
                conteffi.addConfetti({
                    emojis: ["🔔", "✨", "💥"],
                    emojiSize: 100,
                    confettiNumber: 30,
                });
            }, 2100);
        });

        es.current.onerror = (err) => {
            console.log("[sse] error", { err });
        };

        if (!eyeTracker.current && !enterRoom) {
            eyeTracker.current = new EasySeeso();
            userStatus.current = new UserStatusOption(true, false, false);
            (async () => {
                await eyeTracker.current.init(
                    licenseKey,
                    async () => {
                        await eyeTracker.current.startTracking(onGaze, onDebug);
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
                setSeesoInit(true);
                setIsTest(true);
            })();
        }

        return () => {
            window.removeEventListener("blur", focusOutLessonRoom);
            window.removeEventListener("focus", focusInLessonRoom);
            es.current.close();
        };
    }, []);
    // 다른 화면으로 변경 시 실행되는 callback 함수
    const focusOutLessonRoom = useCallback(() => {
        setIsFocus(false);
    });

    // 강의실 화면으로 변경 시 실행되는 callback 함수
    const focusInLessonRoom = useCallback(() => {
        setIsFocus(true);
    });

    useEffect(() => {
        saveAttentionScore(attentionScore);
    }, [attentionScore]);

    // 화면을 보는지 안 보는 지를 파악하여 mongodb에 넣는 함수
    const saveAttentionScore = useCallback(
        (score) => {
            let currentScore = score;
            let currentStatus = 0;
            if (!isFocus) {
                currentScore = 0;
                currentStatus = 1;
            } else if (!videoEnabled) {
                currentScore = 0;
                currentStatus = 2;
            }
            // 조건
            if (enterRoom) {
                // mongodb server와 통신

                tokenHttp
                    .post(
                        `${url}/attention/save`,
                        {
                            lessonRoundNo: Number(lessonRoundNo),
                            lessonNo: Number(lessonNo),
                            userNo: Number(userNo),
                            rate: Number(currentScore),
                            status: Number(currentStatus),
                        },
                        {
                            headers: { "Content-Type": "application/json" }, // 요청 헤더 설정
                        }
                    )
                    .then((res) => {})
                    .catch((err) => {
                        console.log(err);
                    });

                let checkAttention;
                attentionList.push({ currentScore, currentStatus });
                if (attentionList.length > 6) {
                    attentionList.shift();
                    if (currentStatus !== 2) {
                        // 집중도가 0.3 이하인 경우
                        checkAttention = attentionList.every(
                            (item) => item.currentScore < 0.3
                        );
                        if (checkAttention) {
                            tokenHttp
                                .get(
                                    `${url}/notification/active/${lessonNo}/${userId}/${currentStatus}`
                                )
                                .then((res) => {})
                                .catch((err) => {
                                    console.log(err);
                                });
                            setNotificationCnt((prev) => {
                                prev >= 5 ? (prev += 1) : (prev = 0);
                            });
                            setAttentionList([]);
                            setIsAttention(false);
                        }
                    }
                    if (!isAttention && attentionList.length > 5) {
                        checkAttention = attentionList.every(
                            (item) => item.currentScore >= 0.3
                        );
                        if (checkAttention) {
                            tokenHttp
                                .get(
                                    `${url}/notification/disactive/${lessonNo}/${userId}${currentStatus}`
                                )
                                .then((res) => {})
                                .catch((err) => {
                                    console.log(err);
                                });
                            setIsAttention(true);
                        }
                    }
                }

                // 현재 주의를 받을 상황인가 파악
            }
        },
        [
            isFocus,
            enterRoom,
            videoEnabled,
            attentionList,
            notificationCnt,
            isAttention,
        ]
    );

    const onAttention = useCallback((timestampBegin, timestampEnd, score) => {
        setAttentionScore(score);
    }, []);

    useEffect(() => {
        if (calibrationData !== null) {
            eyeTracker.current.setCalibrationData(calibrationData);
            eyeTracker.current.setUserStatusCallback(onAttention, null, null);
            eyeTracker.current.setAttentionInterval(10);
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
        setIsTest(true);
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
        alert("테스트를 시작합니다.");
        setIsTest(false);
        setTimeout(function () {
            eyeTracker.current.startCalibration(
                onCalibrationNextPoint,
                onCalibrationProgress,
                onCalibrationFinished
            );
        }, 2000);
        setFinishTest(false);
    }, [isSeesoInit]);

    const [finishTest, setFinishTest] = useState(true);
    const enterTheLessonRoom = () => {
        setEnterRoom(true);
    };

    const lessonRoomClose = () => {
        setIsClose(true);
    };

    useEffect(() => {
        if (isClose) {
            setAttentionList([]);
            userStatus.current = null;
            eyeTracker.current = null;
            setSeesoInit(false);
            setAttentionScore(0);
            setIsFocus(true);
            setIsTest(false);
            setCalibrationData(null);
            setIsClose(false);

            setVideoEnabled(true);
            setAudioEnabled(true);

            window.location.href = `${homeurl}/satisfy/lesson/${lessonNo}/${lessonRoundNo}/teacher/${teacherNo}`;
        }
    }, [isClose]);

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
                                        zIndex: 9999,
                                    }}
                                />
                                {videoEnabled && (
                                    <Webcam
                                        style={{
                                            position: "absolute",
                                            // objectFit: "cover",
                                            width: "100%",

                                            height: "auto",
                                            top: "50%",
                                            left: "50%",
                                            overFit: "cover",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                )}
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
                                            {audioEnabled && (
                                                <PiMicrophoneBold />
                                            )}
                                            {!audioEnabled && (
                                                <PiMicrophoneSlashBold />
                                            )}
                                        </Button>
                                        <Button onClick={toggleVideo}>
                                            {videoEnabled && (
                                                <PiVideoCameraBold />
                                            )}
                                            {!videoEnabled && (
                                                <PiVideoCameraSlashBold />
                                            )}
                                        </Button>
                                    </ControlButtonWrap>
                                    <ControlButtonWrap>
                                        {!isTest ? (
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#fff",
                                                }}
                                            >
                                                화면의{" "}
                                                <span
                                                    style={{
                                                        color: "#DB0000",
                                                        backgroundColor: "#fff",
                                                        borderRadius: "4px",
                                                        padding: "2px",
                                                    }}
                                                >
                                                    빨간 점
                                                </span>
                                                을 따라가세요.
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#fff",
                                                }}
                                            >
                                                테스트를 시작해주세요.
                                            </div>
                                        )}
                                    </ControlButtonWrap>

                                    <ControlButtonWrap>
                                        <Button
                                            onClick={tmpClick}
                                            disabled={!isTest}
                                        >
                                            테스트
                                        </Button>
                                        <Button
                                            onClick={enterTheLessonRoom}
                                            disabled={
                                                !calibrationData && finishTest
                                            }
                                        >
                                            강의 입장
                                        </Button>
                                    </ControlButtonWrap>
                                </WaitControlBar>
                            </BottomBarWrap>
                        </Container>
                    </>
                )}

                {enterRoom && (
                    <StudentLessonRoomPage
                        lessonName={lessonName}
                        teacherNo={teacherNo}
                        closeRoom={lessonRoomClose}
                        videoEnabled={videoEnabled}
                        audioEnabled={audioEnabled}
                        changeVideo={toggleVideo}
                        changeAudio={toggleAudio}
                    />
                )}
            </RoomFrameWrap>
        </>
    );
};

export default StudentWaitLessonRoomPage;
