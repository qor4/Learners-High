// 학생 로그인 상태의 메인페이지 컴포넌트
import { url } from "../../api/APIPath";
import { useState } from "react";
import VideoRoomComponent from "../VideoRoomComponent"
import {useSelector} from "react-redux"

const StudentMain = () => {
    const [bool, setBool] = useState(false)
    // const [token, setToken] = useState("")
    const userType = useSelector(state=>state.user.userType)
    const handleEnter = () => {
        setBool(true)

        // axios.get(`${url}/lesson/lessonId/3/15/2`)
        // .then(res=> {
        //     setToken(res.data.token)
        // })
    }
    
    return (
        <div>
            <h1>학생 로그인 메인페이지</h1>
            <button onClick={handleEnter}> 입장 </button>
            {/* 비디오 컴포넌트 */}
            {/* 토큰이 바뀌면 on/off */}
            {
                bool ? <VideoRoomComponent userType={userType}/> : null
            }
        </div>
    );
};

export default StudentMain;
