// Alert Page

import { useEffect } from "react";

import { useSelector } from "react-redux";
// 알림
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import Button from "../../components/common/Button";
import axios from "axios";
import { url } from "../../api/APIPath";

const AlertTest = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const userId = useSelector((state) => state.user.userId);

    const handlerAPI = () => {
        axios
            .get(`${url}/notification/teacher001/${userId}`)
            .then((response) => {
                console.log(response);
            });
    };

    // 알림
    useEffect(() => {
        const sse = new EventSource(
            `http://192.168.31.200:7777/api/notification/subscribe/${userId}`
        );

        sse.onopen = () => {
            console.log("SSESSESSE", sse);
        };

        sse.onmessage = async (event) => {
            const res = await event.data;
            const parseData = JSON.parse(res);
            console.log("ONMESSAGE", parseData);
        };

        sse.addEventListener("Request", function (event) {
            console.log("ADDEVENTLISTENER", event.data);
        });
        

        // } else if (!isExpired) {
        //     console.log("REFRESH=====================", accessToken)
        //     axios
        //         .post(
        //             `${url}/user/refresh`,
        //             { refreshToken: localStorage.getItem("refreshToken") },
        //             {
        //                 headers: { "Content-Type": "application/json" },
        //             }
        //         )
        //         .then((response) => {
        //             // const dispatch = useDispatch();

        //             console.log(response);
        //             if (response.data.resultCode === 0) {
        //                 localStorage.setItem(
        //                     "accessToken",
        //                     response.data.result["accessToken"]
        //                 );
        //                 localStorage.setItem(
        //                     "refreshToken",
        //                     response.data.result["refreshToken"]
        //                 );
        //             } else if (response.data.resultCode === -1) {
        //                 sessionStorage.removeItem("persist:root");
        //                 localStorage.removeItem("accessToken");
        //                 localStorage.removeItem("refreshToken");
        //                 window.location.href = "/";
        //                 alert("다시 로그인 해주세요.");
        //             } else {
        //                 throw new Error("expire token");
        //             }
        //         });
    }, []);

    return (
        <>
            <div>알림 버튼 있을 페이지?!</div>
            <Button onClick={handlerAPI}>알림넣어줄버튼</Button>
        </>
    );
};

export default AlertTest;
