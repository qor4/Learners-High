import React from "react";
import { Route, Routes } from "react-router-dom";

// 컴포넌트
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import MainPage from "./pages/MainPage";
import UserJoin from "./components/auth/UserJoin";
import LessonPage from "./pages/LessonPage";
import ClassJoinPage from "./pages/ClassJoinPage";
import LessonInfoPage from "./pages/LessonInfoPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import UserJoinTeacherJob from "./components/auth/UserJoinTeacherJob";
import UserJoinTeacherEdu from "./components/auth/UserJoinTeacherEdu";

import FormStructor from "./pages/LogInSignUpPage";

// test용

function App() {
    return (
        <div className="App">
            <Header />
            {/* <FormStructor/> */}
            {/* <UserJoin /> */}
            {/* <TeacherJobItem/> */}
            {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}


            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/join" element={<UserJoin />}></Route>
                <Route path="/lesson" element={<LessonPage />}></Route>
                <Route path="/lesson/join" element={<ClassJoinPage />}></Route>
                <Route path="/lesson/info/:lessonNo" element={<LessonInfoPage />}></Route>
                <Route path="/profile/:userNo" element={<TeacherProfilePage />}></Route>
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;
