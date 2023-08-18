import React from "react";
import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// 컴포넌트

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

import Emoji from "./components/test/Emoji";

// test용
import MyPagePage from "./pages/user/MyPagePage";
import EduTeacherManagePage from "./pages/EduTeacherManagePage";
import EduStudentManagePage from "./pages/EduStudentManagePage";
import EduTeacherLessonPage from "./pages/EduTeacherLessonPage";
import EduStudentLessonPage from "./pages/EduStudentLessonPage";

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

const Wrapper = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
`;

const StyledDiv = styled.div`
    padding-bottom: 12rem;
`;

function App() {
    const location = useLocation();
    const hideComponent = location.pathname.startsWith("/lessonroom");

    // 로그인 여부
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    if (persistRoot) {
        const isLoginData = JSON.parse(persistRoot.user).isLogin;
    }
    const isLoginData = false;

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
                    <Route
                        path="/find/idpwd"
                        element={<FindIDPwdPage />}
                    ></Route>

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

                {!hideComponent && <TopButton />}
                {!hideComponent && <StyledDiv></StyledDiv>}
                {!hideComponent && <Footer />}
            </Wrapper>
        </>
    );
}

export default App;
