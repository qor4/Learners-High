import { OpenVidu, StreamManager } from "openvidu-browser";
import axios from 'axios'
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoRoomComponent from "../../components/VideoRoomComponent";

const APPLICATION_SERVER_URL = 'https://i9b105.p.ssafy.io:7777/';

const VideoRoom = () => {
    const [mySessionId, setMySessionId] = useState("")
    // const [userName, setUserName] = useState("")
    const [session, setSession] = useState(undefined)
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    
    const navigate = useNavigate()
    const location = useLocation()
    const {userName, userType, userId, userNo} = useSelector(state=> state.user)

    const {lessonNo, lessonRoundNo} = useParams()

    // openVidu 객체 생성
    const OV = new OpenVidu();
    useEffect(()=> {
        if (location.state === null || location.state.sessionId === null) {
            console.log("세션정보 없습니다.")
            // useNavigate("/")
            return
        }
        // 이전 화면에서 받은 데이터 세팅
        setMySessionId(location.state.sessionId)
        // setUserName(location.state.userName)
        setVideoEnabled(location.state.videoEnabled)
        setAudioEnabled(location.state.audioEnabled)

        // 윈도우 객체에 화면 종료 이벤트
        window.addEventListener("beforeunload", onbeforeunload)

        // 세션에 가입
        joinSession()
        return () => {
            window.addEventListener("beforeunload", onbeforeunload)
            leaveSession()
        }
    }, [])

    // 화면 새로고침 or 종료할 때 발생하는 이벤트
    const onbeforeunload = () => {
        leaveSession()
    }

    const leaveSession = () => {
        // 세션 연결 종료
        if (session) session.disconnect()

        // 데이터 초기화
        setSession(undefined);
        setSubscribers([]);
        setMySessionId(mySessionId);
        // setUserName(userName + Math.floor(Math.random() * 100));
        setMainStreamManager(undefined);
        setPublisher(undefined);
        // navigate("/")
    }

    // 내 웹캠 On/Off
    const toggleVideo = () => {
        const enabled = !videoEnabled
        setVideoEnabled(enabled)
        publisher.publishVideo(enabled)
    }

    // 내 마이크 On/Off
    const toggleAudio = () => {
        const enabled = !audioEnabled;
        setAudioEnabled(enabled);
        publisher.publishAudio(enabled);
    }

    //  특정 유저가 룸을 떠날 경우, subscribers 배열에서 삭제
    const deleteSubscriber = (streamManager) => {
        setSubscribers((preSubscribers)=> preSubscribers.filter((subscriber)=> subscriber != streamManager))
    }

    // 토큰 생성
    const getToken = async () => {
        // 내 세션ID에 해당하는 세션 생성
        if (userType === "T") {
            return await createSession(mySessionId);
        } else {
            return await createToken(mySessionId);
        }
    }


    // 서버에 요청하여 세션 생성 함수
    const createSession = async (sessionId) => {
        const response = await axios.get(APPLICATION_SERVER_URL + `lessonroom/teacher/${lessonNo}/${lessonRoundNo}/${userNo}`)
        return response.data.resultMsg // sessionId
    }

    // 서버에 요청하여 토큰 생성
    const createToken = async (sessionId) => {
        const response = await axios.get(APPLICATION_SERVER_URL + `lessonroom/student/${lessonNo}/${lessonRoundNo}/${userNo}`)
        return response.data.resultMsg
    }

    // 세션 객체 생성할 경우 실행
    useEffect(()=> {
        if (session) {
            // 토큰 생성
            getToken().then(async (response)=> {
                try {
                    // 생성된 토큰을 통해 세션에 연결 요청
                    await session.connect(response, {clientData: userName})

                    // 내 통신정보(퍼블리셔) 객체 생성
                    let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: audioEnabled,
                        publishVideo: videoEnabled,
                        resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: true,
                    })

                    // 세션에 내 정보 게시
                    session.publish(publisher)

                    // 내 디바이스 on/off 상태 게시
                    publisher.publishVideo(videoEnabled)
                    publisher.publishAudio(audioEnabled)

                    // 내 비디오에서 비디오 객체 추출
                    const devices = await OV.getDevices()
                    const videoDevices = devices.filter((device)=> device.kind === "videoinput")

                    // 기본 설정된 캠 정보 추출(필요 여부 모름)
                    const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].id

                    // 화상 채팅 통신 상태 갱신
                    setPublisher(publisher)
                    setMainStreamManager(publisher)
                } catch(error) {
                    console.log(error)
                    alert("세션 연결 오류")
                    navigate("/")
                }
            })
        }
    }, [session])

    // 세션 생성 및 이벤트 정보 등록
    const joinSession = async () => {
        // 세션 시작
        const newSession = OV.initSession()

        // 세션에서 발생하는 구체적인 에븐트 정의
        // stream 생성 이벤트 발생할 경우
        newSession.on('streamCreated', (event)=> {
            const subscriber = newSession.subscribe(event.stream, undefined)
            setSubscribers((subscribers)=> [...subscribers, subscriber])
            console.log(JSON.parse(event.stream.streamManager.stream.connection.data).clientData, "님이 접속했습니다.")
        })

        // stream 종료 이벤트 발생시
        newSession.on('streamDestroyed', (event)=> {
            deleteSubscriber(event.stream.streamManager)
            console.log(JSON.parse(event.stream.streamManager.stream.connection.data).clientData, "님이 접속을 종료했습니다.")
        })

        // stream 예외 이벤트 발생할 경우 : 여기서 알림 보낼 수 있을듯?!
        newSession.on('exception', (exception) => console.log(exception))

        // 세션 갱신
        setSession(newSession)
    }

    // 현재 링크 복사하기
    const copyLessonLink = async () => {
        await navigator.clipboard.writeText(`${APPLICATION_SERVER_URL}/${mySessionId}`)
        .then(alert("강의 링크가 복사되었습니다."))
    }

    // 다른 유저 카레마 on/off하는 함수
    const toggleSubbsVideoHandler = (sub) => {
        console.log(sub)
        sub.subscribeToVideo(!sub.properties.subscribeToVideo)

    }

    return (
        <>
        <div>
            <div id="session-header">
                <h1>Room ID: {mySessionId}</h1>
                <button onClick={leaveSession}>나가기</button>
                <button onClick={copyLessonLink}>강의 초대</button>
                <button onClick={toggleVideo}> {`카메라 ${videoEnabled ? "OFF" : "ON" }`}</button>
                <button onClick={toggleAudio}> {`마이크 ${audioEnabled ? "OFF": "ON"}`} </button>
            </div>
            <div id="video-container">
                {publisher !== undefined ? (
                    <div className="stream-container" onClick={()=> console.log(publisher)}>
                        <VideoRoomComponent 
                        streamManager={publisher}
                        token={createToken()}
                        />
                    </div>
                ): null}
                {subscribers.map((sub, idx) => (
                    <div
                    key={idx}
                    className="stream-container"
                    onClick={()=> toggleSubbsVideoHandler(sub)}
                    >
                        <span> {sub.id} </span>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default VideoRoom