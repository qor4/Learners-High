import React, { useEffect } from "react";
import { useState } from "react"; // 내꺼.

import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { url } from "../../api/APIPath";
import axios from "axios";

const TeacherLessonRoomPage = () => {
  // useEffect(()=> {

  // },[])

  const userNo = useSelector(state=>state.user.userNo)
  const userId = useSelector(state=>state.user.userId)
  const userType = useSelector(state=>state.user.userType)
  const location = useLocation()
  const {lessonNo, lessonRoundNo} = useParams()
  console.log(lessonRoundNo, "params!!")
  // lessonRoundItem에서 보낸 토큰을 여기서 받아서 VideoRoom에 보낸다.

  return (
    <>
    <VideoRoomComponent 
      // token={token}
      userNo={userNo} 
      userId={userId}
      userType={userType}
      lessonNo={lessonNo}
      lessonRoundNo={lessonRoundNo}
    />
    </>
  )
}

export default TeacherLessonRoomPage