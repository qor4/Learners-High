import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";

import { useSelector } from "react-redux";

const PayLessonSuccessPage = () => {
    const navigate = useNavigate();

    const userNo = useSelector((state) => state.user.userNo);

    useEffect(() => {
        const pg_token = new URL(window.location.href).searchParams.get(
            "pg_token"
        );
        tokenHttp
            .get(`${url}/kakaoPay/success`, { params: { pg_token } })
            .then((res) => {
                const lessonNo = Number(res.data.item_code);
                const data = { userNo, lessonNo };
                tokenHttp
                    .post(`${url}/student/apply`, data, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((response) => {
                        alert(response.data.resultMsg);
                    });
                // 강의 상세 vs 수강목록
                navigate(`/lesson/info/${lessonNo}`);
            })
            .catch((err) => console.log(err, "에러"));
    }, []);

    return (
        <>
            {/* {
      couplingWithServer &&
      <PayLessonSuccess/>
    } */}
        </>
    );
};

export default PayLessonSuccessPage;
