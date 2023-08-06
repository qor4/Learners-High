import React, { useState } from "react";
import { UserStatusOption } from "seeso";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserModel from '../../models/user-model';
import { useEffect } from "react";

// openvidu
import { OpenVidu } from 'openvidu-browser';
import ChatComponent from "../../components/chat/ChatComponent";
import StreamComponent from "../../components/stream/StreamComponent";
import OpenViduLayout from '../../layout/openvidu-layout';
// import ChatComponent from '../chat/ChatComponent';

// sesso
import EasySeeSo from "seeso/easy-seeso";
import { showGaze, hideGaze } from "./showGaze";

const StudentLessonRoomPage = ({token}) => { 
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userName = useSelector((state) => state.userName);
    const userType = useSelector((state) => state.user.userType);
    const { lessonNo, lessonRoundNo } = useParams();
    
    const location = useLocation();
    const hasBeenUpdated = false;
    const layout = new OpenViduLayout();
    let sessionName = lessonNo + "_" + lessonRoundNo;
    // session에 접속할 토큰
    let sessionToToken = token;
    let remotes = [];
    let localUserAccessAllowed = false;
    let OV =null;

    var localUser = new UserModel();
    const roomState = {
        mySessionId: sessionName,
        myUserName: userName,
        session: undefined,
        localUser: undefined,
        subscribers: [],
        chatDisplay: 'none',
        currentVideoDevice: undefined,
    };
    // 컴포넌트가 마운트될 때 실행되는 코드
    useEffect(() => {
        const openViduLayoutOptions = {
        maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
        minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
        fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
        bigClass: 'OV_big', // The class to add to elements that should be sized bigger
        bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
        bigFixedRatio: false, // fixedRatio for the big ones
        bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
        bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
        bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
        animate: true, // Whether you want to animate the transitions
        };

        // layout 초기화
        layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', onbeforeunload);
        window.addEventListener('resize', updateLayout);
        window.addEventListener('resize', checkSize);
        joinSession();
        
        
        // 컴포넌트가 언마운트될 때 실행되는 코드 (clean-up)
        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            window.removeEventListener('resize', updateLayout);
            window.removeEventListener('resize', checkSize);
            leaveSession();
        };
    }, []);
    
  function onbeforeunload(event) {
    leaveSession();
  }

  function joinSession() {
    OV = new OpenVidu();
    roomState.session = OV.initSession();
    (async () => {
        subscribeToStreamCreated();
        await connectToSession();
    })();
  }

  async function connectToSession() {
    if (sessionToToken === undefined) {
        console.log('token received: ', sessionToToken);
        console.log('잘못된 입장 || 토큰을 못가져옴');
    } else {
        try {
            connect(sessionToToken);
        } catch (error) {
            console.error('There was an error getting the token:', error.code, error.message);
            alert('There was an error getting the token:', error.message);
        }
    }
  }

  function connect(token) {
    roomState.myUserName = userName;
      roomState.session
        .connect(
            token,
            { clientData: roomState.myUserName },
        )
        .then(() => {
            connectWebCam();
        })
        .catch((error) => {
            alert('There was an error connecting to the session:', error.message);
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
}

async function connectWebCam() {
    await OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
    var devices = await OV.getDevices();
    var videoDevices = devices.filter(device => device.kind === 'videoinput');

    let publisher = OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: videoDevices[0].deviceId,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
    });

    if (roomState.session.capabilities.publish) {
        publisher.on('accessAllowed' , () => {
            roomState.session.publish(publisher).then(() => {
                updateSubscribers();
                localUserAccessAllowed = true;
                if (joinSession) {
                    joinSession();
                }
            });
        });
    }
    localUser.setNickname(roomState.myUserName);
    localUser.setConnectionId(roomState.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

    roomState.currentVideoDevice = videoDevices[0];
    roomState.localUser = localUser;

    (()=>{
        roomState.localUser.getStreamManager().on('streamPlaying', (e) => {
            updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    })();
    
}

function updateSubscribers() {
    var subscribers = remotes;
    roomState.subscribers=subscribers;

    if (roomState.localUser) {
        sendSignalUserChanged({
            isAudioActive: roomState.localUser.isAudioActive(),
            isVideoActive: roomState.localUser.isVideoActive(),
            nickname: roomState.localUser.getNickname(),
            isScreenShareActive: roomState.localUser.isScreenShareActive(),
        });
    }
    updateLayout();
}

function leaveSession() {
    const mySession = roomState.session;

    if (mySession) {
        mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    roomState.session = undefined;
    roomState.subscribers = [];
    roomState.localUser = undefined;
}
// // 캠 변경 이벤트
// function camStatusChanged() {
//     localUser.setVideoActive(!localUser.isVideoActive());
//     localUser.getStreamManager().publishVideo(localUser.isVideoActive());
//     sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
//     roomState.localUser = localUser;
// }

// // 마이크 변경 이벤트
// function micStatusChanged() {
//     localUser.setAudioActive(!localUser.isAudioActive());
//     localUser.getStreamManager().publishAudio(localUser.isAudioActive());
//     sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
//     roomState.localUser = localUser;
// }

// // 닉네임 변경 이벤트
// function nicknameChanged(nickname) {
//     let localUser = roomState.localUser;
//     localUser.setNickname(nickname);
//     roomState.localUser=localUser;
//     sendSignalUserChanged({ nickname: roomState.localUser.getNickname() });
// }

function deleteSubscriber(stream) {
    const remoteUsers = roomState.subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
        remoteUsers.splice(index, 1);
        roomState.subscribers= remoteUsers;
    }
}

function subscribeToStreamCreated() {
    roomState.session.on('streamCreated', (event) => {
        const subscriber = roomState.session.subscribe(event.stream, undefined);
        // var subscribers = this.state.subscribers;
        subscriber.on('streamPlaying', (e) => {
            // checkSomeoneShareScreen();
            subscriber.videos[0].video.parentElement.classList.remove('custom-class');
        });
        const newUser = new UserModel();
        newUser.setStreamManager(subscriber);
        newUser.setConnectionId(event.stream.connection.connectionId);
        newUser.setType('remote');
        const nickname = event.stream.connection.data.split('%')[0];
        newUser.setNickname(JSON.parse(nickname).clientData);
        remotes.push(newUser);
        if(localUserAccessAllowed) {
            updateSubscribers();
        }
    });
}

function subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    roomState.session.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        deleteSubscriber(event.stream);
        setTimeout(() => {
            // checkSomeoneShareScreen();
        }, 20);
        event.preventDefault();
        updateLayout();
    });
}

function subscribeToUserChanged() {
    roomState.session.on('signal:userChanged', (event) => {
        let remoteUsers = roomState.subscribers;
        remoteUsers.forEach((user) => {
            if (user.getConnectionId() === event.from.connectionId) {
                const data = JSON.parse(event.data);
                console.log('EVENTO REMOTE: ', event.data);
                if (data.isAudioActive !== undefined) {
                    user.setAudioActive(data.isAudioActive);
                }
                if (data.isVideoActive !== undefined) {
                    user.setVideoActive(data.isVideoActive);
                }
                if (data.nickname !== undefined) {
                    user.setNickname(data.nickname);
                }
                if (data.isScreenShareActive !== undefined) {
                    user.setScreenShareActive(data.isScreenShareActive);
                }
            }
        });
        roomState.subscribers=remoteUsers;
        // checkSomeoneShareScreen();
    });
}

function updateLayout() {
    setTimeout(() => {
        layout.updateLayout();
    }, 20);
}

function sendSignalUserChanged(data) {
    const signalOptions = {
        data: JSON.stringify(data),
        type: 'userChanged',
    };
    roomState.session.signal(signalOptions);
}

// // 전체 화면
// function toggleFullscreen() {
//     const document = window.document;
//     const fs = document.getElementById('container');
//     if (
//         !document.fullscreenElement &&
//         !document.mozFullScreenElement &&
//         !document.webkitFullscreenElement &&
//         !document.msFullscreenElement
//     ) {
//         if (fs.requestFullscreen) {
//             fs.requestFullscreen();
//         } else if (fs.msRequestFullscreen) {
//             fs.msRequestFullscreen();
//         } else if (fs.mozRequestFullScreen) {
//             fs.mozRequestFullScreen();
//         } else if (fs.webkitRequestFullscreen) {
//             fs.webkitRequestFullscreen();
//         }
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.msExitFullscreen) {
//             document.msExitFullscreen();
//         } else if (document.mozCancelFullScreen) {
//             document.mozCancelFullScreen();
//         } else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen();
//         }
//     }
// }

// // 카메라 변경
// async function switchCamera() {
//     try{
//         const devices = await OV.getDevices()
//         var videoDevices = devices.filter(device => device.kind === 'videoinput');

//         if(videoDevices && videoDevices.length > 1) {

//             var newVideoDevice = videoDevices.filter(device => device.deviceId !== roomState.currentVideoDevice.deviceId)

//             if (newVideoDevice.length > 0) {
//                 // Creating a new publisher with specific videoSource
//                 // In mobile devices the default and first camera is the front one
//                 var newPublisher = OV.initPublisher(undefined, {
//                     audioSource: undefined,
//                     videoSource: newVideoDevice[0].deviceId,
//                     publishAudio: localUser.isAudioActive(),
//                     publishVideo: localUser.isVideoActive(),
//                     mirror: true
//                 });

//                 //newPublisher.once("accessAllowed", () => {
//                 await roomState.session.unpublish(roomState.localUser.getStreamManager());
//                 await roomState.session.publish(newPublisher)
//                 roomState.localUser.setStreamManager(newPublisher);
//                 roomState.currentVideoDevice = newVideoDevice;
//                 roomState.localUser = localUser;
//             }
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }

// // 화면 공유
// function screenShare() {
//     const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
//     const publisher = OV.initPublisher(
//         undefined,
//         {
//             videoSource: videoSource,
//             publishAudio: localUser.isAudioActive(),
//             publishVideo: localUser.isVideoActive(),
//             mirror: false,
//         },
//         (error) => {
//             if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
//                 roomState.showExtensionDialog = true;
//             } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
//                 alert('Your browser does not support screen sharing');
//             } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
//                 alert('You need to enable screen sharing extension');
//             } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
//                 alert('You need to choose a window or application to share');
//             }
//         },
//     );

//     publisher.once('accessAllowed', () => {
//         roomState.session.unpublish(localUser.getStreamManager());
//         localUser.setStreamManager(publisher);
//         roomState.session.publish(localUser.getStreamManager()).then(() => {
//             localUser.setScreenShareActive(true);
//             roomState.localUser = localUser;
//             sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });  
//         });
//     });
//     publisher.on('streamPlaying', () => {
//         updateLayout();
//         publisher.videos[0].video.parentElement.classList.remove('custom-class');
//     });
// }

// function closeDialogExtension() {
//     roomState.showExtensionDialog = false;
// }

// // 공유 종료
// function stopScreenShare() {
//     roomState.session.unpublish(localUser.getStreamManager());
//     connectWebCam();
// }

// function checkSomeoneShare9Screen() {
//     let isScreenShared;
//     // return true if at least one passes the test
//     isScreenShared = roomState.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
//     const openviduLayoutOptions = {
//         maxRatio: 3 / 2,
//         minRatio: 9 / 16,
//         fixedRatio: isScreenShared,
//         bigClass: 'OV_big',
//         bigPercentage: 0.8,
//         bigFixedRatio: false,
//         bigMaxRatio: 3 / 2,
//         bigMinRatio: 9 / 16,
//         bigFirst: true,
//         animate: true,
//     };
//     layout.setLayoutOptions(openviduLayoutOptions);
//     updateLayout();
// }

function toggleChat(property) {
    let display = property;

    if (display === undefined) {
        display = roomState.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
        roomState.chatDisplay = display;
        roomState.messageReceived = false;
    } else {
        roomState.chatDisplay = display;
    }
    updateLayout();
}

function checkNotification(event) {
    roomState.messageReceived = roomState.chatDisplay === 'none';
}
function checkSize() {
    if (document.getElementById('layout').offsetWidth <= 700 && !hasBeenUpdated) {
        toggleChat('none');
        hasBeenUpdated = true;
    }
    if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
        hasBeenUpdated = false;
    }
}


  /////////////////////////////////////////////
//     let eyeTracker = null;
//     const dotMaxSize = 10;
//     const dotMinSize = 5;

//     let isCalibrationMode = false;
//     let currentX, currentY;
//     const licenseKey = "dev_81af036sl2mwzmcbii6lfx2vi9cfhgzhaio8lxc9";
//     let isCSAT = false;

//     // seeso 초기화
//     (async function startEyeTracker() {
//         eyeTracker = new EasySeeSo();
//         let userStatus = new UserStatusOption(true, false, false);
//         await eyeTracker.init(
//             licenseKey,
//             async () => {
//                 if (!eyeTracker.checkMobile()) {
//                     eyeTracker.setMonitorSize(16); // 14 inch
//                     eyeTracker.setFaceDistance(60);
//                     eyeTracker.setCameraPosition(window.outerWidth / 2, true);
//                     eyeTracker.setUserStatusCallback(onAttention, null, null);
//                     eyeTracker.setAttentionInterval(10);
//                     await eyeTracker.startTracking(null, null)
//                 }
//             },
//             () => console.log("callback when init failed."), // callback when init failed.
//             userStatus
//         );
//     })();

//     //테스트 버튼 클릭 시 발생 이벤트
//     function tmpClick() {
//       if(!isCalibrationMode){
//           isCalibrationMode = true;
//           setTimeout(function() {
//               eyeTracker.startCalibration(onCalibrationNextPoint, onCalibrationProgress, onCalibrationFinished)
//           }, 1000);
//       }
//   }

//   // 집중도가 제대로 되면 발생하는 함수
//     function onAttention(timestampBegin, timestampEnd, score) {
//         console.log(
//             `Attention event occurred between ${timestampBegin} and ${timestampEnd}. Score: ${score}`
//         );
//         if(isCSAT){
//         // axios`
//         //     .post(
//         //         "http://192.168.31.200:7777/class/attention-rate/time-series",
//         //         {
//         //             classNo: lessonNo,
//         //             classRoundNo: lessonRoundNo,
//         //             rate: score,
//         //             userNo: userNo,`
//         //         },
//         //         { "Content-type": "application/json" }
//         //     )
//         //     .then(() => {
//         //         console.log("정상");
//         //     })
//         //     .catch(() => {
//         //         console.log("오류");
//         //     });
//         }
//     }

//     function onCalibrationNextPoint(pointX, pointY) {
//       currentX = pointX
//       currentY = pointY
//       let ctx = clearCanvas()
//       drawCircle(currentX, currentY, dotMinSize, ctx)
//       eyeTracker.startCollectSamples()
//   }

//   function onCalibrationProgress(progress) {
//       let ctx = clearCanvas()
//       let dotSize = dotMinSize + (dotMaxSize - dotMinSize) * progress; 
//       drawCircle(currentX, currentY, dotSize, ctx)
//   }

//   function drawCircle(x,y,dotSize, ctx){
//       ctx.fillStyle = '#FF0000';
//       ctx.beginPath();
//       ctx.arc(x, y, dotSize, 0, Math.PI * 2, true);
//       ctx.fill();
//   }

//   function onCalibrationFinished(calibrationData) {
//       clearCanvas()
//       isCalibrationMode = false;
//       isCSAT = true;
//   }

//   function clearCanvas() {
//       let canvas = document.getElementById("output");
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//       let ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       return ctx;
//   }

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
                {roomState.subscribers.map((sub, i) => (
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
                <div
                    className="OT_root OT_publisher custom-class"
                    // style={chatDisplay}
                >
                    <ChatComponent
                        user={localUser}
                        messageReceived={checkNotification}
                    />
                </div>
            </div>
        </>
    );
};

export default StudentLessonRoomPage;
