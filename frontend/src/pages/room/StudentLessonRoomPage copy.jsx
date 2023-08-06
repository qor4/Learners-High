// import React, { useState } from "react";
// import EasySeeSo from "seeso/easy-seeso";

// import { showGaze, hideGaze } from "./showGaze";
// import { UserStatusOption } from "seeso";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// // import StreamComponent from '../stream/StreamComponent';
// // import ChatComponent from '../chat/ChatComponent';
// import UserModel from '../../models/user-model';

// import ChatComponent from "../../components/chat/ChatComponent";
// import StreamComponent from "../../components/stream/StreamComponent";


// const StudentLessonRoomPage = () => { 
//     const userNo = useSelector((state) => state.user.userNo);
//     const userId = useSelector((state) => state.user.userId);
//     const userName = useSelector((state) => state.userName);
//     const { lessonNo, lessonRoundNo } = useParams();
//     console.log(lessonRoundNo, "params!!");
//     const location = useLocation();
//     var localUser = new UserModel();
//   useEffect(() => {
//     // 컴포넌트가 마운트될 때 실행되는 코드
//     const openViduLayoutOptions = {
//       maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
//       minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
//       fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
//       bigClass: 'OV_big', // The class to add to elements that should be sized bigger
//       bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
//       bigFixedRatio: false, // fixedRatio for the big ones
//       bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
//       bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
//       bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
//       animate: true, // Whether you want to animate the transitions
//   };

//   this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
//   window.addEventListener('beforeunload', this.onbeforeunload);
//   window.addEventListener('resize', this.updateLayout);
//   window.addEventListener('resize', this.checkSize);
//   this.joinSession();
//     return () => {
//       // 컴포넌트가 언마운트될 때 실행되는 코드 (clean-up)
//       window.removeEventListener('beforeunload', this.onbeforeunload);
//         window.removeEventListener('resize', this.updateLayout);
//         window.removeEventListener('resize', this.checkSize);
//         this.leaveSession();
//     };
//   }, []);
    
//   function onbeforeunload(event) {
//     this.leaveSession();
// }

// function joinSession() {
//     OV = new OpenVidu();

//     this.setState(
//         {
//             session: this.OV.initSession(),
//         },
//         async () => {
//             this.subscribeToStreamCreated();
//             await this.connectToSession();
//         },
//     );
// }

// async function connectToSession() {
//     if (this.props.token !== undefined) {
//         console.log('token received: ', this.props.token);
//         this.connect(this.props.token);
//     } else {
//         try {
//             var token = await this.getToken();
//             console.log(token);
//             this.connect(token);
//         } catch (error) {
//             console.error('There was an error getting the token:', error.code, error.message);
//             if(this.props.error){
//                 this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
//             }
//             alert('There was an error getting the token:', error.message);
//         }
//     }
// }

// function connect(token) {
//     state.session
//         .connect(
//             token,
//             { clientData: this.state.myUserName },
//         )
//         .then(() => {
//             this.connectWebCam();
//         })
//         .catch((error) => {
//             if(this.props.error){
//                 this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
//             }
//             alert('There was an error connecting to the session:', error.message);
//             console.log('There was an error connecting to the session:', error.code, error.message);
//         });
// }

// async function onnectWebCam() {
//     await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
//     var devices = await this.OV.getDevices();
//     var videoDevices = devices.filter(device => device.kind === 'videoinput');

//     let publisher = this.OV.initPublisher(undefined, {
//         audioSource: undefined,
//         videoSource: videoDevices[0].deviceId,
//         publishAudio: localUser.isAudioActive(),
//         publishVideo: localUser.isVideoActive(),
//         resolution: '640x480',
//         frameRate: 30,
//         insertMode: 'APPEND',
//     });

//     if (this.state.session.capabilities.publish) {
//         publisher.on('accessAllowed' , () => {
//             this.state.session.publish(publisher).then(() => {
//                 this.updateSubscribers();
//                 this.localUserAccessAllowed = true;
//                 if (this.props.joinSession) {
//                     this.props.joinSession();
//                 }
//             });
//         });

//     }
//     localUser.setNickname(this.state.myUserName);
//     localUser.setConnectionId(this.state.session.connection.connectionId);
//     localUser.setScreenShareActive(false);
//     localUser.setStreamManager(publisher);
//     this.subscribeToUserChanged();
//     this.subscribeToStreamDestroyed();
//     this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

//     this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
//         this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
//             this.updateLayout();
//             publisher.videos[0].video.parentElement.classList.remove('custom-class');
//         });
//     });
// }

// function updateSubscribers() {
//     var subscribers = this.remotes;
//     this.setState(
//         {
//             subscribers: subscribers,
//         },
//         () => {
//             if (this.state.localUser) {
//                 this.sendSignalUserChanged({
//                     isAudioActive: this.state.localUser.isAudioActive(),
//                     isVideoActive: this.state.localUser.isVideoActive(),
//                     nickname: this.state.localUser.getNickname(),
//                     isScreenShareActive: this.state.localUser.isScreenShareActive(),
//                 });
//             }
//             this.updateLayout();
//         },
//     );
// }

// function leaveSession() {
//     const mySession = this.state.session;

//     if (mySession) {
//         mySession.disconnect();
//     }

//     // Empty all properties...
//     this.OV = null;
//     this.setState({
//         session: undefined,
//         subscribers: [],
//         mySessionId: 'SessionB',
//         myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
//         localUser: undefined,
//     });
//     if (this.props.leaveSession) {
//         this.props.leaveSession();
//     }
// }
// function camStatusChanged() {
//     localUser.setVideoActive(!localUser.isVideoActive());
//     localUser.getStreamManager().publishVideo(localUser.isVideoActive());
//     this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
//     this.setState({ localUser: localUser });
// }

// function micStatusChanged() {
//     localUser.setAudioActive(!localUser.isAudioActive());
//     localUser.getStreamManager().publishAudio(localUser.isAudioActive());
//     this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
//     this.setState({ localUser: localUser });
// }

// function nicknameChanged(nickname) {
//     let localUser = this.state.localUser;
//     localUser.setNickname(nickname);
//     this.setState({ localUser: localUser });
//     this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
// }

// function deleteSubscriber(stream) {
//     const remoteUsers = this.state.subscribers;
//     const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
//     let index = remoteUsers.indexOf(userStream, 0);
//     if (index > -1) {
//         remoteUsers.splice(index, 1);
//         this.setState({
//             subscribers: remoteUsers,
//         });
//     }
// }

// function subscribeToStreamCreated() {
//     this.state.session.on('streamCreated', (event) => {
//         const subscriber = this.state.session.subscribe(event.stream, undefined);
//         // var subscribers = this.state.subscribers;
//         subscriber.on('streamPlaying', (e) => {
//             this.checkSomeoneShareScreen();
//             subscriber.videos[0].video.parentElement.classList.remove('custom-class');
//         });
//         const newUser = new UserModel();
//         newUser.setStreamManager(subscriber);
//         newUser.setConnectionId(event.stream.connection.connectionId);
//         newUser.setType('remote');
//         const nickname = event.stream.connection.data.split('%')[0];
//         newUser.setNickname(JSON.parse(nickname).clientData);
//         this.remotes.push(newUser);
//         if(this.localUserAccessAllowed) {
//             this.updateSubscribers();
//         }
//     });
// }

// function subscribeToStreamDestroyed() {
//     // On every Stream destroyed...
//     this.state.session.on('streamDestroyed', (event) => {
//         // Remove the stream from 'subscribers' array
//         this.deleteSubscriber(event.stream);
//         setTimeout(() => {
//             this.checkSomeoneShareScreen();
//         }, 20);
//         event.preventDefault();
//         this.updateLayout();
//     });
// }

// function subscribeToUserChanged() {
//     this.state.session.on('signal:userChanged', (event) => {
//         let remoteUsers = this.state.subscribers;
//         remoteUsers.forEach((user) => {
//             if (user.getConnectionId() === event.from.connectionId) {
//                 const data = JSON.parse(event.data);
//                 console.log('EVENTO REMOTE: ', event.data);
//                 if (data.isAudioActive !== undefined) {
//                     user.setAudioActive(data.isAudioActive);
//                 }
//                 if (data.isVideoActive !== undefined) {
//                     user.setVideoActive(data.isVideoActive);
//                 }
//                 if (data.nickname !== undefined) {
//                     user.setNickname(data.nickname);
//                 }
//                 if (data.isScreenShareActive !== undefined) {
//                     user.setScreenShareActive(data.isScreenShareActive);
//                 }
//             }
//         });
//         this.setState(
//             {
//                 subscribers: remoteUsers,
//             },
//             () => this.checkSomeoneShareScreen(),
//         );
//     });
// }

// function updateLayout() {
//     setTimeout(() => {
//         this.layout.updateLayout();
//     }, 20);
// }

// function sendSignalUserChanged(data) {
//     const signalOptions = {
//         data: JSON.stringify(data),
//         type: 'userChanged',
//     };
//     this.state.session.signal(signalOptions);
// }

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

// async function switchCamera() {
//     try{
//         const devices = await this.OV.getDevices()
//         var videoDevices = devices.filter(device => device.kind === 'videoinput');

//         if(videoDevices && videoDevices.length > 1) {

//             var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

//             if (newVideoDevice.length > 0) {
//                 // Creating a new publisher with specific videoSource
//                 // In mobile devices the default and first camera is the front one
//                 var newPublisher = this.OV.initPublisher(undefined, {
//                     audioSource: undefined,
//                     videoSource: newVideoDevice[0].deviceId,
//                     publishAudio: localUser.isAudioActive(),
//                     publishVideo: localUser.isVideoActive(),
//                     mirror: true
//                 });

//                 //newPublisher.once("accessAllowed", () => {
//                 await this.state.session.unpublish(this.state.localUser.getStreamManager());
//                 await this.state.session.publish(newPublisher)
//                 this.state.localUser.setStreamManager(newPublisher);
//                 this.setState({
//                     currentVideoDevice: newVideoDevice,
//                     localUser: localUser,
//                 });
//             }
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }

// function creenShare() {
//     const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
//     const publisher = this.OV.initPublisher(
//         undefined,
//         {
//             videoSource: videoSource,
//             publishAudio: localUser.isAudioActive(),
//             publishVideo: localUser.isVideoActive(),
//             mirror: false,
//         },
//         (error) => {
//             if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
//                 this.setState({ showExtensionDialog: true });
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
//         this.state.session.unpublish(localUser.getStreamManager());
//         localUser.setStreamManager(publisher);
//         this.state.session.publish(localUser.getStreamManager()).then(() => {
//             localUser.setScreenShareActive(true);
//             this.setState({ localUser: localUser }, () => {
//                 this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
//             });
//         });
//     });
//     publisher.on('streamPlaying', () => {
//         this.updateLayout();
//         publisher.videos[0].video.parentElement.classList.remove('custom-class');
//     });
// }

// function closeDialogExtension() {
//     this.setState({ showExtensionDialog: false });
// }

// function stopScreenShare() {
//     this.state.session.unpublish(localUser.getStreamManager());
//     this.connectWebCam();
// }

// function checkSomeoneShare9Screen() {
//     let isScreenShared;
//     // return true if at least one passes the test
//     isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
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
//     this.layout.setLayoutOptions(openviduLayoutOptions);
//     this.updateLayout();
// }

// function toggleChat(property) {
//     let display = property;

//     if (display === undefined) {
//         display = this.state.chatDisplay === 'none' ? 'block' : 'none';
//     }
//     if (display === 'block') {
//         this.setState({ chatDisplay: display, messageReceived: false });
//     } else {
//         console.log('chat', display);
//         this.setState({ chatDisplay: display });
//     }
//     this.updateLayout();
// }

// function checkNotification(event) {
//     this.setState({
//         messageReceived: this.state.chatDisplay === 'none',
//     });
// }
// function checkSize() {
//     if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
//         this.toggleChat('none');
//         this.hasBeenUpdated = true;
//     }
//     if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
//         this.hasBeenUpdated = false;
//     }
// }


//   /////////////////////////////////////////////
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

//     return (
//         <>
//             <div id="layout" className="bounds">
//                 {localUser !== undefined &&
//                     localUser.getStreamManager() !== undefined && (
//                         <div
//                             className="OT_root OT_publisher custom-class"
//                             id="localUser"
//                         >
//                             <StreamComponent
//                                 user={localUser}
//                                 handleNickname={userName}
//                             />
//                         </div>
//                     )}
//                 {this.state.subscribers.map((sub, i) => (
//                     <div
//                         key={i}
//                         className="OT_root OT_publisher custom-class"
//                         id="remoteUsers"
//                     >
//                         <StreamComponent
//                             user={sub}
//                             streamId={sub.streamManager.stream.streamId}
//                         />
//                     </div>
//                 ))}
//                 {localUser !== undefined &&
//                     localUser.getStreamManager() !== undefined && (
//                         <div
//                             className="OT_root OT_publisher custom-class"
//                             // style={chatDisplay}
//                         >
//                             <ChatComponent
//                                 user={localUser}
//                                 chatDisplay={this.state.chatDisplay}
//                                 close={this.toggleChat}
//                                 messageReceived={this.checkNotification}
//                             />
//                        </div>
//                     )}
//             </div>
//         </>
//     );
// };

// export default StudentLessonRoomPage;
