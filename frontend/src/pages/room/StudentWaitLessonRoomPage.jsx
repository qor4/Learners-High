import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeSo from "seeso/easy-seeso";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showGaze, hideGaze } from "./showGaze";
import Webcam from "react-webcam";
import axios from "axios";
import Button from "../../components/common/Button";
import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import StudentLessonRoomPage from "./StudentLessonRoomPage";

const licenseKey = "dev_81af036sl2mwzmcbii6lfx2vi9cfhgzhaio8lxc9";
const dotMaxSize = 10;
const dotMinSize = 5;
let userStatus = null;

let isCalibrationMode = false;
let eyeTracker = null;
let currentX, currentY;

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
    eyeTracker.startCollectSamples();
}

function onCalibrationProgress(progress) {
    let ctx = clearCanvas();
    let dotSize = dotMinSize + (dotMaxSize - dotMinSize) * progress;
    drawCircle(currentX, currentY, dotSize, ctx);
}

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
// async function main() {
//     if(!eyeTracker) {
//       eyeTracker = new EasySeeSo()
//       userStatus = new UserStatusOption(true, false, false);
//       await eyeTracker.init(licenseKey,
//         async () => {
//             await eyeTracker.startTracking(onGaze, onDebug)
//             if(!eyeTracker.checkMobile()){
//               eyeTracker.setMonitorSize(16); // 14 inch
//               eyeTracker.setFaceDistance(60);
//               eyeTracker.setCameraPosition(window.outerWidth / 2, true);
//               eyeTracker.setUserStatusCallback(onAttention,null,null);
//               eyeTracker.setAttentionInterval(10);
//             }
//         }, // callback when init succeeded.
//         () => console.log("callback when init failed.") // callback when init failed.
//         ,userStatus
//       )
//     }
//   }

//   (async () => {
//     await main();
//   })();
const APPLICATION_SERVER_URL = 'https://i9b105.p.ssafy.io:7777/';

const StudentWaitLessonRoomPage = () => {
    // const userNo = useSelector((state) => state.user.userNo);
    // const location = useLocation()
    // const {lessonName} = location.state
    const navigate = useNavigate();
    const { lessonNo, lessonRoundNo } = useParams();

    const [calData, setCalData] = useState(null);

    const tmpClick = useCallback(() => {
        if (!isCalibrationMode) {
            isCalibrationMode = true;
            hideGaze();
            setTimeout(function () {
                console.log(eyeTracker);
                eyeTracker.startCalibration(
                    onCalibrationNextPoint,
                    onCalibrationProgress,
                    onCalibrationFinished
                );
            }, 2000);
        }
    }, []);

    const onCalibrationFinished = useCallback((calibrationData) => {
        clearCanvas();
        isCalibrationMode = false;
        setCalData(calibrationData);
    }, []);

    const main = useCallback(() => {
        if (!eyeTracker) {
            eyeTracker = new EasySeeSo();
            userStatus = new UserStatusOption(true, false, false);
            eyeTracker.init(
                licenseKey,
                async () => {
                    await eyeTracker.startTracking(onGaze, onDebug);
                    if (!eyeTracker.checkMobile()) {
                        eyeTracker.setMonitorSize(16); // 14 inch
                        eyeTracker.setFaceDistance(60);
                        eyeTracker.setCameraPosition(
                            window.outerWidth / 2,
                            true
                        );
                        eyeTracker.setUserStatusCallback(
                            onAttention,
                            null,
                            null
                        );
                        eyeTracker.setAttentionInterval(10);
                    }
                }, // callback when init succeeded.
                () => console.log("callback when init failed."), // callback when init failed.
                userStatus
            );
        }
    }, []);
    // main();

    // function tmpClick() {

    // }
    // useEffect(()=> {

    // },[])
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const [token, setToken] = useState("")
    const [enterRoom, setEnterRoom] = useState(false);

    const enterTheLessonRoom = async () => {
        // navigate(`/lessonroom/student/${lessonNo}/${lessonRoundNo}`)
        await axios.get(APPLICATION_SERVER_URL + 
            `lessonroom/student/${lessonNo}/${lessonRoundNo}/${userNo}`)
            .then(res =>{
                setToken(res.data.resultMsg)
                setEnterRoom(true);
            })
            .catch(err=>console.log(err));
    };
    return (
        <>
            <>
                <div style={{ position: "relative" }}>
                    <div className="Wrap-Cam-canvas">
                        {!enterRoom ? (
                            <Webcam
                                style={{
                                    position: "absolute",
                                    height: "500px",
                                    width: "70%",
                                    overFit: "cover",
                                    margin: "auto",
                                }}
                            />
                        ) : (
                            // <VideoRoomComponent
                            //     style={{
                            //         position: "absolute",
                            //         overFit: "cover",
                            //         margin: "auto",
                            //     }}
                            //     userNo={userNo}
                            //     userName={userName}
                            //     userId={userId}
                            //     lessonNo={lessonNo}
                            //     lessonRoundNo={lessonRoundNo}
                            //     token={token}
                            // />
                            <StudentLessonRoomPage                            
                                userNo={userNo}
                                userName={userName}
                                userId={userId}
                                lessonNo={lessonNo}
                                lessonRoundNo={lessonRoundNo}
                                token={token}
                            />
                            // <p>계속되니?</p>
                        )}
                        <canvas
                            id="output"
                            style={{
                                position: "absolute",
                                height: "500px",
                                width: "100%",
                                margin: "auto",
                            }}
                        />
                    </div>

                    {/* 추후 하나의 컴포넌트로 대체 */}
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
                            <button onClick={tmpClick}>테스트</button>
                            {/* <input type="number" onChange={changeDistance}></input>
                            <button onClick={()=> {
                            eyeTracker.setFaceDistance(distance)
                            }}>모니터 거리 조정</button> */}
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default StudentWaitLessonRoomPage;
