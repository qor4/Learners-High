import React, { useState } from "react";
import EasySeeSo from "seeso/easy-seeso";
import { showGaze, hideGaze } from "./showGaze";
import { UserStatusOption } from "seeso";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import StreamComponent from '../stream/StreamComponent';
// import ChatComponent from '../chat/ChatComponent';
import UserModel from '../../models/user-model';

import ChatComponent from "../../components/chat/ChatComponent";
import StreamComponent from "../../components/stream/StreamComponent";

let isCalibrationMode = false;

const StudentLessonRoomPage = () => { 
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const { lessonNo, lessonRoundNo } = useParams();
    console.log(lessonRoundNo, "params!!");
    const location = useLocation();
    var localUser = new UserModel();
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 코드
    
    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 코드 (clean-up)
    };
  }, []);
    
    let eyeTracker = null;
    const licenseKey = "dev_81af036sl2mwzmcbii6lfx2vi9cfhgzhaio8lxc9";
    
    async function startEyeTracker() {
        eyeTracker = new EasySeeSo();
        let userStatus = new UserStatusOption(true, false, false);
        await eyeTracker.init(
            licenseKey,
            async () => {
                if (!eyeTracker.checkMobile()) {
                    eyeTracker.setMonitorSize(16); // 14 inch
                    eyeTracker.setFaceDistance(60);
                    eyeTracker.setCameraPosition(window.outerWidth / 2, true);
                    eyeTracker.setUserStatusCallback(onAttention, null, null);
                    eyeTracker.setAttentionInterval(10);
                }
            },
            () => console.log("callback when init failed."), // callback when init failed.
            userStatus
        );
    }

    function onGaze(gazeInfo) {
        if (!isCalibrationMode) {
            console.log(gazeInfo);
            console.log(`Tracking state: ${gazeInfo.trackingState}`);
            // do something with gaze info.
            // showGaze(gazeInfo);
        } else {
            // hideGaze()
        }
    }
    // debug callback.
    function onDebug(FPS, latency_min, latency_max, latency_avg) {
        // do something with debug info.
    }

    // 신동민 추가
    // useEffect(()=> {
    //   setInterval(()=> {
    //     eyeTracker.setUserStatusCallback(onAttention, null, null)
    //     eyeTracker.getAttentionScore()
    //     // console.log(eyeTracker.getAttentionScore(), "넌 getAttention 중이니")
    //     console.log("실행중이니")
    //     console.log()
    //   }, 3000)
    // }, [])

    function onAttention(timestampBegin, timestampEnd, score) {
        console.log(
            `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}`
        );
        // axios`
        //     .post(
        //         "http://192.168.31.200:7777/class/attention-rate/time-series",
        //         {
        //             classNo: lessonNo,
        //             classRoundNo: lessonRoundNo,
        //             rate: score,
        //             userNo: userNo,`
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
    return (
        <>
            <div id="layout" className="bounds">
                {localUser !== undefined &&
                    localUser.getStreamManager() !== undefined && (
                        <div
                            className="OT_root OT_publisher custom-class"
                            id="localUser"
                        >
                            <StreamComponent
                                user={localUser}
                                handleNickname={userName}
                            />
                        </div>
                    )}
                {this.state.subscribers.map((sub, i) => (
                    <div
                        key={i}
                        className="OT_root OT_publisher custom-class"
                        id="remoteUsers"
                    >
                        <StreamComponent
                            user={sub}
                            streamId={sub.streamManager.stream.streamId}
                        />
                    </div>
                ))}
                {localUser !== undefined &&
                    localUser.getStreamManager() !== undefined && (
                        <div
                            className="OT_root OT_publisher custom-class"
                            // style={chatDisplay}
                        >
                            <ChatComponent
                                user={localUser}
                                chatDisplay={this.state.chatDisplay}
                                close={this.toggleChat}
                                messageReceived={this.checkNotification}
                            />
                       </div>
                    )}
            </div>
        </>
    );
};

export default StudentLessonRoomPage;
