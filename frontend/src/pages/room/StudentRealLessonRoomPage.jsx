import React, {useState} from "react";

import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StudentRealLessonRoomPage = () => {
  const location = useLocation()
  const userNo = useSelector(state=>state.user.userNo)
  const userId = useSelector(state=>state.user.userId)
  const userName = useSelector(state=>state.userName)
  const {lessonNo, lessonRoundNo} = useParams()

  

  return (
    <>
    <VideoRoomComponent 
    userNo={userNo}
    userName={userName}
    userId={userId} 
    lessonNo={lessonNo}
    lessonRoundNo={lessonRoundNo}
    />
    </>
  )
}

export default StudentRealLessonRoomPage