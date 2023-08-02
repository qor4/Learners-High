import React from "react";
import { Route, Routes } from "react-router-dom";

// 컴포넌트
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import MainPage from "./pages/MainPage";
import UserJoin from "./components/auth/UserJoin";
import ClassPage from "./pages/ClassPage";
import ClassJoinPage from "./pages/ClassJoinPage";
import ClassInfoPage from "./pages/ClassInfoPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import UserJoinTeacherJob from "./components/auth/UserJoinTeacherJob";
import UserJoinTeacherEdu from "./components/auth/UserJoinTeacherEdu";
import UserLogIn from "./components/auth/UserLogIn";

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
                <Route path="/class" element={<ClassPage />}></Route>
                <Route path="/class/join" element={<ClassJoinPage />}></Route>
                <Route path="/class/info/:classNo" element={<ClassInfoPage />}></Route>
                <Route path="/profile/:userNo" element={<TeacherProfilePage />}></Route>
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;
