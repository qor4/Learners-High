import React, { useState, useRef } from "react";
import { UserStatusOption } from "seeso";
import EasySeeSo from "seeso/easy-seeso";
import VideoRoomComponent from "../../components/VideoRoomComponent";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showGaze, hideGaze } from "./showGaze";
import Webcam from "react-webcam";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

const StudentWaitLessonRoomPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    // const webcamRef = useRef(null)
    const [startBtn, setStartBtn] = useState(true);
    const navigate = useNavigate()
    const {lessonNo, lessonRoundNo} = useParams()

    const [bool, setBool] = useState(false);
    console.log("??")
    const changeBool = () => {
        console.log(lessonNo, lessonRoundNo)
        console.log("???")
        setBool(!bool);
        setStartBtn(false)
        navigate(`/lessonroom/${lessonNo}/${lessonRoundNo}/student`)

    };
    const licenseKey = "dev_81af036sl2mwzmcbii6lfx2vi9cfhgzhaio8lxc9";
    const dotMaxSize = 10;
    const dotMinSize = 5;
    let isCalibrationMode = false;
    let eyeTracker = null;
    let currentX, currentY;
    let userStatus = null;
    userStatus = new UserStatusOption(true, false, false);
    eyeTracker = new EasySeeSo();
    eyeTracker.init(
        licenseKey,
        async () => {
            await eyeTracker.startTracking(onGaze, onDebug);
            if (!eyeTracker.checkMobile()) {
                eyeTracker.setMonitorSize(16); // 14 inch
                eyeTracker.setFaceDistance(30);
                eyeTracker.setCameraPosition(window.outerWidth / 2, true);
                eyeTracker.setUserStatusCallback(onAttention, null, null);
                eyeTracker.setAttentionInterval(10);
            }
            // calibrationButton.disabled = false;
        }, // callback when init succeeded.
        () => console.log("callback when init failed."), // callback when init failed.
        userStatus
    );
    const tmpClick = () => {
        // setStartBtn(!startBtn)
        if (!isCalibrationMode) {
            isCalibrationMode = true;
            // hideGaze()
            setTimeout(function () {
                eyeTracker.startCalibration(
                    onCalibrationNextPoint,
                    onCalibrationProgress,
                    onCalibrationFinished
                );
            }, 1000);
        }
    };
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

    function onCalibrationFinished(calibrationData) {
        clearCanvas();
        isCalibrationMode = false;
    }

    function onAttention(timestampBegin, timestampEnd, score) {
        console.log(
            `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}`
        );
        axios
            .post(
                "http://192.168.31.200:7777/class/attention-rate/time-series",
                {
                    classNo: lessonNo,
                    classRoundNo: lessonRoundNo,
                    rate: score,
                    userNo: userNo,
                },
                { "Content-type": "application/json" }
            )
            .then(() => {
                console.log("정상");
            })
            .catch(() => {
                console.log("오류");
            });
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
    // debug callback.
    function onDebug(FPS, latency_min, latency_max, latency_avg) {
        // do something with debug info.
    }
    function clearCanvas() {
        let canvas = document.getElementById("output");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return ctx;
    }

    // const { lessonNo, lessonRoundNo } = useParams();
    return (
        <>
            {/* <button onClick={tmpClick}>테스트</button>+ */}
            <button onClick={changeBool}>실제 룸 입장</button>
            <br />
            <canvas id="preview" style={{ position: "fixed" }}></canvas>
            <canvas
                id="output"
                style={{ position: "fixed", zIndex: 9999 }}
            ></canvas>
            {startBtn ? <Webcam /> : null}


            {/* {bool ? <VideoRoomComponent /> : null} */}
        </>
    );
};

export default StudentWaitLessonRoomPage;
