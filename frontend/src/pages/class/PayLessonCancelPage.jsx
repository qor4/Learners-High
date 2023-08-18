import React, { useEffect } from "react";
import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";

import { useNavigate } from "react-router-dom";

const PayLessonCancelPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const lessonNo = new URL(window.location.href).searchParams.get(
            "lessonNo"
        );
        tokenHttp
            .get(`${url}/kakaoPay/cancel`)
            .then((res) => {
                alert("결제 취소");
                navigate(`/lesson/info/${lessonNo}`);
            })
            .catch((err) => console.log(err));
    }, []);

    return <>{/* <PayLessonSuccess/> */}</>;
};

export default PayLessonCancelPage;
