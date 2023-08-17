import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// 컴포넌트
import Main from "./Main";
import UserJoinTeacherJob from "./components/auth/UserJoinTeacherJob";
import UserJoinTeacherEdu from "./components/auth/UserJoinTeacherEdu";
import UserLogIn from "./components/auth/UserLogIn";

import UserJoinPage from "./pages/auth/UserJoinPage";
import KakaoUserJoinPage from "./pages/auth/KakaoUserJoinPage";
import MainPage from "./pages/MainPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";

// 강의 관련
import LessonPage from "./pages/LessonPage";
import ClassJoinPage from "./pages/class/ClassJoinPage";
import LessonInfoPage from "./pages/LessonInfoPage";
import PayLessonSuccessPage from "./pages/class/PayLessonSuccessPage";
import PayLessonFailPage from "./pages/class/PayLessonFailPage";
import PayLessonCancelPage from "./pages/class/PayLessonCancelPage";

import LessonSatisfyModal from "./components/class/LessonSatisfyModal";

// 스타일컴포넌트
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import StudentWaitLessonRoomPage from "./pages/room/StudentWaitLessonRoomPage";
import TeacherLessonRoomPage from "./pages/room/TeacherLessonRoomPage";

import { useLocation } from "react-router-dom";

// test용
import DropTable from "./components/common/table/DropTable";
import Emoji from "./components/test/Emoji";

// test용
import MyPagePage from "./pages/user/MyPagePage";
import EduTeacherManagePage from "./pages/EduTeacherManagePage";
import EduStudentManagePage from "./pages/EduStudentManagePage";
import EduTeacherLessonPage from "./pages/EduTeacherLessonPage";
import EduStudentLessonPage from "./pages/EduStudentLessonPage";

import SoundAlert from "./pages/room/SoundAlert";
import TeacherRoomFrame from "./pages/room/TeacherRoomFrame";
import StudentRoomFrame from "./pages/room/StudentRoomFrame";
import AlertTest from "./pages/room/AlertTest";
import StudentWaitRoomFrame from "./pages/room/StudentWaitRoomFrame";
import ChartTest from "./components/test/ChartTest";

import { logOutUser } from "./store/UserStore";
import { useDispatch, useSelector } from "react-redux";
import FindIDPwdPage from "./pages/auth/FindIDPwdPage";

import JSConfetti from "js-confetti";
import TopButton from "./components/common/TopButton";
export const conteffi = new JSConfetti();

// Styled-Components를 활용한 전체 스타일 변경
const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    * {
        font-family: "Pretendard-Regular", sans-serif;
        margin: 0;
        padding: 0;
    }
    html {
        /* 페이지 이동 시, 스크롤을 더 부드럽게 올려주는 역할 */
        scroll-behavior: smooth;
    }
    html,
    body {
        background-color: #f9faff;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    li {
        list-style: none;
    }
`;

// 콘텐츠의 양이 짧을 때, 하단에 푸터 고정하기 (보류)
const Wrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    min-height: 100vh;
    /* ${(props) => (props.hideComponent ? "padding-bottom: 12rem;" : "")} */
    box-sizing: border-box;
    position: relative;
`;

const StyledDiv = styled.div`
    padding-bottom: 12rem;
`;

// const ContentWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

function App() {
    const location = useLocation();
    const hideComponent = location.pathname.startsWith("/lessonroom");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 여부
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    if (persistRoot) {
        const isLoginData = JSON.parse(persistRoot.user).isLogin;
    }
    const isLoginData = false;

    // useEffect(() => {
    //     if (!localStorage.getItem("accessToken") && isLoginData === true) {
    //         alert("다시 로그인해주세요!");
    //         dispatch(logOutUser());
    //         navigate("/");
    //     }
    // }, [localStorage.getItem("accessToken")]);
    // const hideComponentTeacher = location.pathname.startsWith(
    //     "/lessonroom/teacher"
    // );
    // const hideComponentWait = location.pathname.startsWith("/lessonroom/wait");
    return (
        <>
            <GlobalStyle />
            <Wrapper className="App">
                {!hideComponent && <Header />}

                <Routes>
                    <Route path="/" element={<MainPage />}></Route>
                    <Route path="/join" element={<UserJoinPage />}></Route>
                    <Route
                        path="/kakao/join"
                        element={<KakaoUserJoinPage />}
                    ></Route>

                    <Route path="/lesson" element={<LessonPage />}></Route>
                    {/* @@@ 임시 강의룸 / 아이디 비밀번호 찾기 @@@ */}
                    <Route
                        path="/find/idpwd"
                        element={<FindIDPwdPage />}
                    ></Route>

                    {/* 임시 라인 차트@@@ */}
                    <Route path="/temp/chart" element={<ChartTest />}></Route>
                    <Route path="/temp" element={<AlertTest />}></Route>
                    <Route
                        path="/temp/teacher/room"
                        element={<TeacherRoomFrame />}
                    ></Route>
                    <Route
                        path="/temp/student/room"
                        element={<StudentRoomFrame />}
                    ></Route>
                    <Route
                        path="/temp/student/wait/room"
                        element={<StudentWaitRoomFrame />}
                    ></Route>
                    {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
                    <Route
                        path="/lesson/join"
                        element={<ClassJoinPage />}
                    ></Route>
                    <Route
                        path="/lesson/info/:lessonNo"
                        element={<LessonInfoPage />}
                    ></Route>
                    <Route
                        path="/kakaoPay/success"
                        element={<PayLessonSuccessPage />}
                    ></Route>
                    <Route
                        path="/kakaoPay/fail"
                        element={<PayLessonFailPage />}
                    ></Route>
                    <Route
                        path="/kakaoPay/cancel"
                        element={<PayLessonCancelPage />}
                    ></Route>
                    <Route
                        path="/profile/:userNo"
                        element={<TeacherProfilePage />}
                    ></Route>
                    <Route
                        path="/user/:userNo"
                        element={<MyPagePage />}
                    ></Route>
                    <Route
                        path="/edu/teacher/:userNo"
                        element={<EduTeacherManagePage />}
                    ></Route>
                    <Route
                        path="/edu/student/:userNo"
                        element={<EduStudentManagePage />}
                    ></Route>
                    <Route
                        path="/edu/teacher/:userNo/:lessonNo"
                        element={<EduTeacherLessonPage />}
                    ></Route>
                    <Route
                        path="/edu/student/:userNo/:lessonNo"
                        element={<EduStudentLessonPage />}
                    ></Route>
                    <Route
                        path="/lessonroom/wait/:lessonNo/:lessonRoundNo"
                        element={<StudentWaitLessonRoomPage />}
                    />
                    {/* <Route 
                    path="/lessonroom/student/:lessonNo/:lessonRoundNo"
                    element={<StudentLessonRoomPage/>}
                /> */}
                    <Route
                        path="/lessonroom/teacher/:lessonNo/:lessonRoundNo"
                        element={<TeacherLessonRoomPage />}
                    />
                    <Route
                        path="/satisfy/lesson/:lessonNo/:lessonRoundNo/teacher/:teacherNo"
                        element={<LessonSatisfyModal />}
                    />
                    <Route path="/test" element={<Emoji />} />

                    <Route path="*" element={<MainPage />} />
                </Routes>

                {/* <div>TOP</div> */}
                {!hideComponent && <TopButton />}
                {!hideComponent && <StyledDiv></StyledDiv>}
                {!hideComponent && <Footer />}
            </Wrapper>
        </>
    );
}

export default App;
