import { OpenVidu } from "openvidu-browser";
import axios from 'axios'
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VideoRoom = () => {
    const [mySessionId, setMySessionId] = useState("")
    const [userName, setUserName] = useState("")
    const [session, setSession] = useState(undefined)
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const navigate = useNavigate()
    const location = useLocation()

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
        setUserName(location.state.userName)
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
        
    }

    return (

    )
}

export default VideoRoom