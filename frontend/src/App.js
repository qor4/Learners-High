import React from "react";
import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// 컴포넌트
import Main from "./Main";
import UserJoin from "./components/auth/UserJoin";
import UserJoinTeacherJob from "./components/auth/UserJoinTeacherJob";
import UserJoinTeacherEdu from "./components/auth/UserJoinTeacherEdu";
import UserLogIn from "./components/auth/UserLogIn";
import UserJoinPage from "./pages/auth/UserJoinPage";
import MainPage from "./pages/MainPage";
import LessonPage from "./pages/LessonPage";
import ClassJoinPage from "./pages/class/ClassJoinPage";
import ClassRoundJoinPage from "./pages/class/ClassRoundJoinPage";
import LessonInfoPage from "./pages/LessonInfoPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import StudentWaitLessonRoomPage from "./pages/room/StudentWaitLessonRoomPage";
import StudentRealLessonRoomPage from "./pages/room/StudentRealLessonRoomPage";
import TeacherRealLessonRoomPage from "./pages/room/TeacherRealLessonRoomPage";

// test용
import StudentMain from "./components/main/StudentMain";
import MyPagePage from "./pages/user/MyPagePage";
import EduTeacherManagePage from "./pages/EduTeacherManagePage";
import EduStudentManagePage from "./pages/EduStudentManagePage";

// Styled-Components를 활용한 전체 스타일 변경
const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Nanum Gothic", sans-serif;
        margin: 0;
        padding: 0;
    }
    html,
    body {
        background-color: #f9faff;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <div className="App">
                <Header />
                {/* <TeacherJobItem/> */}
                {/* <UserJoinTeacherJob/> */}
                {/* <UserJoinTeacherEdu/> */}
                {/* <UserLogIn/> */}
                {/* <StudentMain/> */}
                {/* <ClassRoundJoinPage/> */}
                {/* <StudentWaitLessonRoomPage/> */}

                <Routes>
                    <Route path="/" element={<MainPage />}></Route>
                    <Route path="/join" element={<UserJoinPage />}></Route>
                    <Route path="/lesson" element={<LessonPage />}></Route>
                    <Route
                        path="/lesson/join"
                        element={<ClassJoinPage />}
                    ></Route>
                    <Route
                        path="/lesson/round/join"
                        element={<ClassRoundJoinPage />}
                    ></Route>
                    <Route
                        path="/lesson/info/:lessonNo"
                        element={<LessonInfoPage />}
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
                        path="/lessonroom/:lessonNo/:lessonRoundNo/wait"
                        element={<StudentWaitLessonRoomPage />}
                    />
                    <Route
                        path="/lessonroom/:lessonNo/:lessonRoundNo/student"
                        element={<StudentRealLessonRoomPage />}
                    />
                    <Route
                        path="/lessonroom/:lessonNo/:lessonRoundNo/teacher"
                        element={<TeacherRealLessonRoomPage />}
                    />

                    <Route path="*" element={<MainPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
