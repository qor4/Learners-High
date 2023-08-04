import React, {useState} from "react";

import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRealLessonRoomPage = () => {
  const location = useLocation()
  const userNo = useSelector(state=>state.user.userNo)
  const userId = useSelector(state=>state.user.userId)

  

  return (
    <>
    <VideoRoomComponent 
    userNo={userNo}
    userId={userId} 
  
    lessonRoundNo
    />
    </>
  )
}

export default StudentRealLessonRoomPage