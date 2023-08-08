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

import StudentWaitLessonRoomPage from "./pages/room/StudentWaitLessonRoomPage"
import TeacherLessonRoomPage from "./pages/room/TeacherLessonRoomPage"

import { useLocation } from "react-router-dom";

// test용
// import DropTable from "./components/common/Table/DropTable"

// test용
import MyPagePage from "./pages/user/MyPagePage";
import EduTeacherManagePage from "./pages/EduTeacherManagePage";
import EduStudentManagePage from "./pages/EduStudentManagePage";
import EduTeacherLessonPage from "./pages/EduTeacherLessonPage";
import EduStudentLessonPage from "./pages/EduStudentLessonPage";
import AlertTest from "./pages/room/AlertTest";

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
    const location = useLocation()
    const hideComponetStudent = location.pathname.startsWith("/lessonroom/student")
    const hideComponetTeacher = location.pathname.startsWith("/lessonroom/teacher")
    const hideComponetWait = location.pathname.startsWith("/lessonroom/wait")
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
                    {/* @@@ */}
                    <Route path="/temp" element={<AlertTest />}></Route>
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
                        path="/edu/teacher/:userNo/:lessonNo"
                        element={<EduTeacherLessonPage />}
                    ></Route>
                    <Route
                        path="/edu/student/:userNo/:lessonNo"
                        element={<EduStudentLessonPage />}
                    ></Route>
                <Route 
                    path="/lessonroom/wait/:lessonNo/:lessonRoundNo"
                    element={<StudentWaitLessonRoomPage/>}
                />
                {/* <Route 
                    path="/lessonroom/student/:lessonNo/:lessonRoundNo"
                    element={<StudentLessonRoomPage/>}
                /> */}
                <Route 
                    path="/lessonroom/teacher/:lessonNo/:lessonRoundNo"
                    element={<TeacherLessonRoomPage/>}
                />
                {/* <Route path="/test" element={<DropTable/>}/> */}

                    <Route path="*" element={<MainPage />} />
                </Routes>
                {(!hideComponetWait && (!hideComponetStudent || !hideComponetTeacher)) && <Footer/> }
            </div>
        </>

    );
}

export default App;
