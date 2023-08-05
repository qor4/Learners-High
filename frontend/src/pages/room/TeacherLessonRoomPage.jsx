import React, {useState} from "react";

import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherRealLessonRoomPage = () => {
  const userNo = useSelector(state=>state.user.userNo)
  const userId = useSelector(state=>state.user.userId)
  const userType = useSelector(state=>state.user.userType)

  const {lessonNo, lessonRounNo} = useParams()



  return (
    <>
    <VideoRoomComponent userNo={userNo} userId={userId}
    userType={userType}
    lessonNo={lessonNo}
    lessonRoundNo={lessonRounNo}
    />
    </>
  )
}

export default TeacherRealLessonRoomPage