import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeso from "seeso/easy-seeso";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showGaze, hideGaze } from "./showGaze";
import Webcam from "react-webcam";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import StudentLessonRoomPage from "./StudentLessonRoomPage";
import axios from "axios";
import { licenseKey } from "../../api/Ignore";
// import { seesoUrl } from "../../api/APIPath";

const dotMaxSize = 10;
const dotMinSize = 5;
let test = false;

const StudentWaitLessonRoomPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const [enterRoom, setEnterRoom] = useState(false);

    // console.log("여기 왔어?")
    let userStatus = useRef(null);
    const eyeTracker = useRef(null);
    let currentX, currentY;
    const navigate = useNavigate();
    const { lessonNo, lessonRoundNo } = useParams();
    const [ isSeesoInit, setSeesoInit ] = useState(false);
    console.log("start + " + enterRoom);
    useEffect(() => {   
        if (!eyeTracker.current) {
            eyeTracker.current = new EasySeeso();
            userStatus.current = new UserStatusOption(true, false, false);
            (async ()=>{
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
                // 여기서 버튼 활성화
                setSeesoInit(true);
            })();
        }
    }, []);
    
    // gaze callback.
    function onGaze(gazeInfo) {
        // do something with gaze info.
        if (!isSeesoInit) {
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
    
    // calibration callback.
    function onCalibrationProgress(progress) {
        let ctx = clearCanvas();
        let dotSize = dotMinSize + (dotMaxSize - dotMinSize) * progress;
        drawCircle(currentX, currentY, dotSize, ctx);
    }
    
    // calibration callback.
    const onCalibrationFinished = useCallback((calibrationData) => {
        clearCanvas();
        setSeesoInit(true);
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
    
    const onAttention = useCallback((timestampBegin, timestampEnd, score) =>{
        console.log(
        `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}, enterRoom : ${enterRoom}`
        );

        if(test){
            console.log({lessonRoundNo : lessonRoundNo,
                lessonNo : lessonNo,
                userNo : userNo,
                rate: score});
            // mongodb server와 통신
            // axios.post(
            //     `${seesoUrl}/seeso/attention-rate`,
            //     {
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
        }
    },[enterRoom]);

    const tmpClick = useCallback(() => {
        setSeesoInit(true);
        hideGaze();
        setTimeout(function () {
            eyeTracker.current.startCalibration(
                onCalibrationNextPoint,
                onCalibrationProgress,
                onCalibrationFinished
                );
            }, 2000);
    }, []);


    const enterTheLessonRoom =  () => {
        setEnterRoom(true);
        test = true;
        console.log(`dㅇㅇdjdjdjdjdjdjdjdjjdjdjd  ${enterRoom}`);
    };
    return (
        <>
            <>
                <div style={{ position: "relative" }}>
                    <div className="Wrap-Cam-canvas">
                    <canvas
                            id="output"
                            style={{
                                position: "absolute",
                                height: "500px",
                                width: "100%",
                                margin: "auto",
                                zIndex:9999
                            }}
                        />
                        {!enterRoom ? (
                            <>
                            <Webcam
                                style={{
                                    position: "absolute",
                                    height: "500px",
                                    width: "70%",
                                    overFit: "cover",
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
        </>
    );
};

export default StudentWaitLessonRoomPage;
