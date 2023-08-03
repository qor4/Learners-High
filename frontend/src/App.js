import React from "react";
import { Route, Routes } from "react-router-dom";

// 컴포넌트
import Main from "./Main";
import UserJoin from "./components/auth/UserJoin";
import UserJoinTeacherJob from "./components/auth/UserJoinTeacherJob";
import UserJoinTeacherEdu from "./components/auth/UserJoinTeacherEdu";
import UserLogIn from "./components/auth/UserLogIn";
import UserJoinPage from "./pages/auth/UserJoinPage";
import MainPage from "./pages/MainPage";
import LessonPage from "./pages/LessonPage";
import ClassJoinPage from "./pages/ClassJoinPage";
import LessonInfoPage from "./pages/LessonInfoPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";

// test용

function App() {
    return (
        <div className="App">
            {/* <TeacherJobItem/> */}
            {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}
            {/* <UserLogIn/> */}

            {/* <ClassRoundJoinPage/> */}
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/join" element={<UserJoin />}></Route>
                <Route path="/lesson" element={<LessonPage />}></Route>
                <Route path="/lesson/join" element={<ClassJoinPage />}></Route>
                <Route
                    path="/lesson/info/:lessonNo"
                    element={<LessonInfoPage />}
                ></Route>
                <Route
                    path="/profile/:userNo"
                    element={<TeacherProfilePage />}
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
