import React, { useState } from "react";
import { UserStatusOption } from "seeso";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserModel from "../../models/user-model";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { url } from "../../api/APIPath";

// openvidu
import UserVideoComponent from "../../components/stream/UserVideoComponent";
import { OpenVidu } from "openvidu-browser";
// import StreamComponent from "../../components/stream/StreamComponent";
import ChatComponent from "../../components/chat/ChatComponent";
import OpenViduLayout from "../../layout/openvidu-layout";

// sesso
import EasySeeSo from "seeso/easy-seeso";
import { showGaze, hideGaze } from "./showGaze";

const StudentLessonRoomPage = () => {
    console.log("난 지금 들어왔어")
    // 강사 No.
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);
    const userType = useSelector((state) => state.user.userType);
    const userName = useSelector((state) => state.user.userName);
    const location = useLocation();
    const { lessonNo, lessonRoundNo } = useParams();
    console.log(lessonRoundNo, "params!!");
    const navigate = useNavigate()

    // session, state 선언
    const [mySessionId, setMySessionId] = useState(undefined);
    const [myUserName, setMyUserName] = useState(userName);
    const [session, setSession] = useState(undefined)
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    
    // video, audio 접근 권한
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    
    // 새로운 OpenVidu 객체 생성
    const [OV, setOV] = useState(<OpenVidu />);

    // 2) 화면 렌더링 시 최초 1회 실행
    useEffect( () => {
        setVideoEnabled(true);
        setAudioEnabled(true);
        setMySessionId(`${lessonNo}_${lessonRoundNo}`);
        setMyUserName(myUserName);

        // 윈도우 객체에 화면 종료 이벤트 추가
        window.addEventListener('beforeunload', onBeforeUnload); 
        joinSession();  // 세션 입장
        return () => {
            // 윈도우 객체에 화면 종료 이벤트 제거
            window.removeEventListener('beforeunload', onBeforeUnload);
            leaveSession(); // 세션 나가기
        };
    }, []);

    // session이 바뀌면 하는 것
    const leaveSession = async () => {

        if (session) {
            session.disconnect();
        }
        // session, state 초기화
        setOV(null);
        setMySessionId(undefined);
        setMyUserName('');
        setSession(undefined);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        setSubscribers([]);
        
        // 메인화면 이동 필요
        navigate("/");
    };
        // 페이지를 언로드하기 전에 leaveSession 메서드를 호출
        const onBeforeUnload = () => {
            leaveSession();
        }

    // 세션 생성 및 세션에서 이벤트가 발생할 때의 동작을 지정 
    const joinSession = async () => {
        const newOV = new OpenVidu();
        let mySession = newOV.initSession();

        // Session 개체에서 추가된 subscriber를 subscribers 배열에 저장 
        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers((subscribers) => [...subscribers, subscriber]);  // 새 구독자에 대한 상태 업데이트
            console.log('사용자가 입장하였습니다.')
            // console.log(JSON.parse(event.stream.streamManager.stream.connection.data).clientData, "님이 접속했습니다.");
        });

        // Session 개체에서 제거된 관련 subsrciber를 subsribers 배열에서 제거
        mySession.on('streamDestroyed', (event) => {
            setSubscribers((preSubscribers) => preSubscribers.filter((subscriber) => subscriber !== event.stream.streamManager))
            console.log('사용자가 나갔습니다.')
            // console.log(JSON.parse(event.stream.connection.data).clientData, "님이 접속을 종료했습니다.")
        });

        // 서버 측에서 예기치 않은 비동기 오류가 발생할 때 Session 개체에 의해 트리거 되는 이벤트
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        // 세션 갱신
        setOV(newOV);
        setSession(mySession);
        console.log("join 완료")
    };

    // 사용자의 토큰으로 세션 연결 (session 객체 변경 시에만 실행)
    useEffect(() => {
        console.log(session, "session")
        if (session) {
            axios
            .get(
                `${url}/lessonroom/student/${lessonNo}/${lessonRoundNo}/${userNo}`
                ).then((res) => {
                    const token = res.data.resultMsg;
                    console.log(token);
                    console.log("token : ",token);
                // 첫 번째 매개변수는 OpenVidu deployment로 부터 얻은 토큰, 두 번째 매개변수는 이벤트의 모든 사용자가 검색할 수 있음.
                session.connect(token, { clientData: userNo })
                .then(async () => {
                    // Get your own camera stream ---
                    // publisher 객체 생성
                    let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined,     // The source of audio. If undefined default microphone
                        videoSource: undefined,     // The source of video. If undefined default webcam
                        publishAudio: audioEnabled, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: videoEnabled, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480',      // The resolution of your video
                        frameRate: 30,              // The frame rate of your video
                        insertMode: 'APPEND',       // How the video is inserted in the target element 'video-container'
                        mirror: true,               // Whether to mirror your local video or not
                    });
                    // Publish your stream ---
                    session.publish(publisher);
                    // Set the main video in the page to display our webcam and store our Publisher
                    setPublisher(publisher);
                    setMainStreamManager(publisher);
                })
                .catch ((error) => {
                    console.log(error);
                    alert("세션 연결 오류");
                    navigate("/");
                });
            });
        }
    }, [session]);
    // 내 웹캠 on/off (상대방도 화면 꺼지는지 확인 필요)
    const toggleVideo = () => {
        if (publisher) {
            const enabled = !videoEnabled;
            setVideoEnabled(enabled);
            publisher.publishVideo(enabled);
        }
    };

    // 내 마이크 on/off (상대방도 음성 꺼지는지 확인 )
    const toggleAudio = () => {
        if (publisher) {
            const enabled = !audioEnabled;
            setAudioEnabled(enabled);
            publisher.publishAudio(enabled);
        }
    };

    const getToken= async () => {
        await axios
            .get(
                `${url}/lessonroom/teacher/${lessonNo}/${lessonRoundNo}/${userNo}`
                )
                .then((res) => {
                    console.log(res.data.resultMsg + " token1");
                    console.log(res);
                    return res;
                })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
        <div>
            <h1>Room ID: {mySessionId}</h1>
            {session !== undefined ? (
                <div> 
                    <div>
                        <div>
                            {publisher !== undefined ? (
                                <div >
                                    <UserVideoComponent streamManager={ publisher }/>
                                </div>
                            ) : null}
                            
                            {/* 여기서 강사 아닌 사람들만 */}
                            {subscribers.map((sub, i) => (
                                <div key={`${i}-subscriber`}>
                                    <UserVideoComponent streamManager={ sub } />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                      {console.log(session, "세션")}
                      {console.log(session.connection, "세션 커넥션")}
                      { mainStreamManager && <ChatComponent 
                      userName={userName}
                      streamManager={mainStreamManager}
                      connectionId={session.connection.connectionId}
                      />}
                    </div>
                </div>
            ) : null}

            <input
                type='button'
                onClick={toggleVideo}
                value={`비디오 ${videoEnabled ? "OFF" : "ON"}`}
            />
            <input
                type='button'
                onClick={toggleAudio}
                value={`마이크 ${audioEnabled ? "OFF" : "ON"}`}
            />
            <input 
                type='button'
                onClick={leaveSession}
                value="나가기"
            />
        </div>
        </>
    );
};
export default StudentLessonRoomPage;
