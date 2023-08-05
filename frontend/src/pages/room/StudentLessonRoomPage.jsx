import React, {useState} from "react";

import VideoRoomComponent from "../../components/VideoRoomComponent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StudentLessonRoomPage = () => {
  const userNo = useSelector(state=>state.user.userNo)
  const userId = useSelector(state=>state.user.userId)
  const userName = useSelector(state=>state.userName)
  const {lessonNo, lessonRoundNo} = useParams()
  console.log(lessonRoundNo, "params!!")
  const location = useLocation();
  // const eyeTracker = location.state?.eyeTrackerSave || null;
  const eyeTracker = useSelector(state=> state.EyeTracker.EyeTracker)

  // console.log(eyeTracker, "############## 아이트래커 정보 갔을까?")
  if(eyeTracker){
    eyeTracker.startTracking();
  }
  // (async ()=>{
  //   if(eyeTracker){
  //     await 
  //   }
  // })();
  return (
    <>
    <VideoRoomComponent 
    userNo={userNo}
    userName={userName}
    userId={userId} 
    lessonNo={lessonNo}
    lessonRoundNo={lessonRoundNo}
    eyeTracker={eyeTracker}
    />
    </>
  )
}

export default StudentLessonRoomPage