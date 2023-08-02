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

import ClassJoinPage from './pages/ClassJoinPage'


// test용

function App() {
  return (
    <div className="App">
    
    {/* <FormStructor/> */}
    <UserJoin/>
    {/* <TeacherJobItem/> */}
    {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}


            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/join" element={<UserJoin />}></Route>
                <Route path="/lesson" element={<ClassPage />}></Route>
                <Route path="/lesson/join" element={<ClassJoinPage />}></Route>
                <Route path="/lesson/info/:lessonNo" element={<ClassInfoPage />}></Route>
                <Route path="/profile/:userNo" element={<TeacherProfilePage />}></Route>
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;
