import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export const url = "https://i9b105.p.ssafy.io:7777"
// export const url = "http://192.168.31.200:7777";
// const AUTH = "auth/"
// const USER

const tokenHttp = axios.create({
    header: {
        "Content-Type": "application/json",
    },
});

tokenHttp.interceptors.request.use(async (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        console.log("token 이 존재하지 않습니다.");
        throw new Error("expire token");
    }

    const user = jwt_decode(accessToken);
    const isExpired = dayjs().diff(dayjs.unix(user.exp)) < 1;

    // access token 이 만료되지 않았다면 access-token 을 넣어 요청 실행
    if (isExpired) {
        req.headers["Authorization"] = `Bearer ${accessToken}`;
        return req;
    }

    // 만료되었다면 refresh-token으로 token 재발급
    console.log("api/tokenHttp.js : access token 만료");
    console.log(localStorage.getItem("accessToken"));
    await axios
        .post(
            `${url}/user/refresh`,
            { refreshToken: localStorage.getItem("refreshToken") },
            {
                headers: { "Content-Type": "application/json" },
            }
        )
        .then((response) => {
            // const dispatch = useDispatch();

            console.log(response);
            if (response.data.resultCode === 0) {
                localStorage.setItem(
                    "accessToken",
                    response.data.result["accessToken"]
                );
                localStorage.setItem(
                    "refreshToken",
                    response.data.result["refreshToken"]
                );
            } else if (response.data.resultCode === -1) {
                // 로그인해주세요알림 + 로그아웃 (로그아웃 할 때는 로컬 다 지우기)
                sessionStorage.removeItem("persist:root");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
                alert("다시 로그인 해주세요.");
            } else {
                throw new Error("expire token");
            }
        })
        .catch(() => {
            throw new Error("expire token");
        });
    console.log(localStorage.getItem("accessToken"));
    req.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "accessToken"
    )}`;
    return req;
});

export default tokenHttp;
