import React, { useEffect } from "react";
import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import PayLessonSuccess from "../../components/class/PayLessonSuccess"

const PayLessonCancelPage = () => {
    const navigate = useNavigate();
    const userNo = useSelector((state) => state.user.userNo);

    useEffect(() => {
      console.log("취소 왔음?")
      const lessonNo = new URL(window.location.href).searchParams.get("lessonNo")
      console.log(lessonNo, '강의No')
      tokenHttp
            .get(`${url}/kakaoPay/cancel`)
            .then((res) => {
                console.log(res);
                alert("결제 취소")
                navigate(`/lesson/info/${lessonNo}`)
                // navigate('/')
              })
            .catch(err=> console.log(err));
    }, []);

    return <>{/* <PayLessonSuccess/> */}</>;
};

export default PayLessonCancelPage;
