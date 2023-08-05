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
    let calibrationData = null;
    const navigate = useNavigate()
    const {lessonNo, lessonRoundNo} = useParams()

    const [bool, setBool] = useState(false);
    console.log("??")

    // 강의 룸 입장 버튼
    const enterLessonRoom = () => {
        console.log(lessonNo+" "+ lessonRoundNo +"으로 입장");
        // data를 가지고 가야함
        navigate(`/lessonroom/student/${lessonNo}/${lessonRoundNo}`)

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

     (async ()=>{
        await eyeTracker.init(
            licenseKey,
            async () => {
                if (!eyeTracker.checkMobile()) {
                    // eyeTracker.setMonitorSize(16); // 14 inch
                    eyeTracker.setScreenSize(window.innerWidth,window.innerheith)
                    eyeTracker.setFaceDistance(60); // 여기가 모니터 사이즈 놓는 곳.
                    eyeTracker.setCameraPosition(window.outerWidth / 2, true);
                    eyeTracker.setUserStatusCallback(onAttention, null, null);
                    eyeTracker.setAttentionInterval(10);
                }
            }, // callback when init succeeded.
            () => console.log("callback when init failed."), // callback when init failed.
            userStatus
        );
    })();
    
    const tmpClick = () => {
        if (!isCalibrationMode) {
            isCalibrationMode = true;
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
        // axios
        //     .post(
        //         "http://192.168.31.200:7777/class/attention-rate/time-series",
        //         {
        //             classNo: lessonNo,
        //             classRoundNo: lessonRoundNo,
        //             rate: score,
        //             userNo: userNo,
        //         },
        //         { "Content-type": "application/json" }
        //     )
        //     .then(() => {
        //         console.log("정상");
        //     })
        //     .catch(() => {
        //         console.log("오류");
        //     });
    }
    // gaze callback.
    
    function clearCanvas() {
        let canvas = document.getElementById("output");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return ctx;
    }

    // const { lessonNo, lessonRoundNo } = useParams();

    const [distance, setDistance] = useState(16)
    const changeDistance = (e) => {
      setDistance(e.currentTarget.value)
    }
    return (
        <div style={{position:"relative"}}>
            <div  className="Wrap-Cam-canvas">
              <Webcam style={{position:"absolute",height: '500px', width:'70%', overFit:'cover', margin: 'auto'}}/>
              <canvas id="output" style={{position: "absolute", height: '500px', width:'100%', margin: 'auto'}}/>
            </div>

            {/* 추후 하나의 컴포넌트로 대체 */}
            <div style={{position: 'relative', top: '500px', backgroundColor: "blue",}}>
              <Link to={`/lessonroom/student/${lessonNo}/${lessonRoundNo}`} state={{eyeTracker}}>
                <Button>실제 룸 입장</Button>
              </Link>
              <Button onClick={tmpClick}>테스트</Button>
              <input type="number" onChange={changeDistance}></input>
                <button onClick={()=> {
                  eyeTracker.setFaceDistance(distance)
                }}>모니터 거리 조정</button>
            </div>
        </div>
    );
};

export default StudentWaitLessonRoomPage;
