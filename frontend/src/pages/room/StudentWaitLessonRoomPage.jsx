import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeso from "seeso/easy-seeso";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showGaze, hideGaze } from "./showGaze";
import Webcam from "react-webcam";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import StudentLessonRoomPage from "./StudentLessonRoomPage";

const licenseKey = "dev_81af036sl2mwzmcbii6lfx2vi9cfhgzhaio8lxc9";
const dotMaxSize = 10;
const dotMinSize = 5;

const StudentWaitLessonRoomPage = () => {
    // console.log("여기 왔어?")
    let userStatus = useRef(null);
    let isCalibrationMode = false;
    const eyeTracker = useRef(null);
    let currentX, currentY;
    const navigate = useNavigate();
    const { lessonNo, lessonRoundNo } = useParams();
    const [ isSeesoInit, setSeesoInit ] = useState(false);
    
    useEffect(() => {   
        
    }, []);

    function main(){
        console.log("1");
        if (!eyeTracker.current) {
            console.log("2");
            eyeTracker.current = new EasySeeso();
            userStatus.current = new UserStatusOption(true, false, false);
            console.log("3");
            (async ()=>{
                await eyeTracker.current.init(
                    licenseKey,
                    async () => {
                        await eyeTracker.current.startTracking(onGaze, onDebug);
                        if (!eyeTracker.current.checkMobile()) {
                            eyeTracker.current.setMonitorSize(14); // 14 inch
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
                // 여기서 버튼 활성화
                setSeesoInit(true);
            })();
            
        }
    }
    // gaze callback.
function onGaze(gazeInfo) {
    if (!isCalibrationMode) {
        // do something with gaze info.
        showGaze(gazeInfo);
    } else {
        hideGaze();
    }
}

// calibration callback.
function onCalibrationNextPoint(pointX, pointY) {
    currentX = pointX;
    currentY = pointY;
    let ctx = clearCanvas();
    drawCircle(currentX, currentY, dotMinSize, ctx);
    eyeTracker.current.startCollectSamples();
}

function onCalibrationProgress(progress) {
    let ctx = clearCanvas();
    let dotSize = dotMinSize + (dotMaxSize - dotMinSize) * progress;
    drawCircle(currentX, currentY, dotSize, ctx);
}

const onCalibrationFinished = useCallback((calibrationData) => {
    clearCanvas();
    isCalibrationMode = false;
    eyeTracker.current.setUserStatusCallback(
        onAttention,
        null,
        null
    );
    eyeTracker.current.setAttentionInterval(10);
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

// debug callback.
function onDebug(FPS, latency_min, latency_max, latency_avg) {
    // do something with debug info.
}

function onAttention(timestampBegin, timestampEnd, score) {
    console.log(
        `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}`
    );
}
    const tmpClick = useCallback(() => {
        if (!isCalibrationMode) {
            isCalibrationMode = true;
            hideGaze();
            setTimeout(function () {
                console.log(eyeTracker.current);
                eyeTracker.current.startCalibration(
                    onCalibrationNextPoint,
                    onCalibrationProgress,
                    onCalibrationFinished
                );
            }, 2000);
        }
    }, []);


    
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const [enterRoom, setEnterRoom] = useState(false);

    const enterTheLessonRoom =  () => {
        setEnterRoom(true);
    };
    return (
        <>
            <>
                <div style={{ position: "relative" }}>
                    <div className="Wrap-Cam-canvas">
                        {!enterRoom ? (
                            <>
                            {console.log(55555555555555)}
                            <Webcam
                                style={{
                                    position: "absolute",
                                    height: "500px",
                                    width: "70%",
                                    overFit: "cover",
                                    margin: "auto",
                                }}
                                />
                                <canvas
                            id="output"
                            style={{
                                position: "absolute",
                                height: "500px",
                                width: "100%",
                                margin: "auto",
                            }}
                        />
                            <div
                        style={{
                            position: "relative",
                            top: "500px",
                            backgroundColor: "blue",
                            width: "1000px",
                            marginLeft: "10%",
                            paddingLeft: "auto",
                            borderRadius: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                top: "50%",
                            }}
                        >
                            {/* <span> {lessonName} </span> */}
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button onClick={enterTheLessonRoom}>
                                실제 룸 입장
                            </Button>
                            <button onClick={tmpClick} disabled={!isSeesoInit} >테스트</button>
                        </div>
                    </div>
                            </>

                        ) : (
                            <StudentLessonRoomPage/>
                        )
                        }
                        
                    </div>

                    {/* 추후 하나의 컴포넌트로 대체 */}
                    
                </div>
            </>
            {main()}

        </>
    );
};

export default StudentWaitLessonRoomPage;
