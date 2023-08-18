import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";

import { useSelector } from "react-redux";

const PayLessonFailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const lessonNo = new URL(window.location.href).searchParams.get(
            "lessonNo"
        );

        tokenHttp
            .get(`${url}/kakaoPay/fail`)
            .then((res) => {
                alert("결제 실패");
                navigate(`/lesson/info/${lessonNo}`);
            })
            .catch((err) => console.log(err, "에러"));
    }, []);

    return <>{/* <PayLessonSuccess/> */}</>;
};

export default PayLessonFailPage;
