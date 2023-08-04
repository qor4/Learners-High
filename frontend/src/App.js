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
import ClassJoinPage from "./pages/class/ClassJoinPage";
import ClassRoundJoin from "./components/class/ClassRoundJoin"
import LessonInfoPage from "./pages/LessonInfoPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// test용
import StudentMain from "./components/main/StudentMain";

function App() {
    return (
        <div className="App">
            <Header />
            {/* <TeacherJobItem/> */}
            {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}
            {/* <UserLogIn/> */}
            {/* <StudentMain/> */}
            {/* <ClassRoundJoinPage/> */}
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/join" element={<UserJoinPage />}></Route>
                <Route path="/lesson" element={<LessonPage />}></Route>
                <Route path="/lesson/join" element={<ClassJoinPage />}></Route>
                <Route path="/lesson/round/join" element={<ClassRoundJoin />}></Route>
                <Route
                    path="/lesson/info/:lessonNo"
                    element={<LessonInfoPage />}
                ></Route>
                <Route
                    path="/profile/:userNo"
                    element={<TeacherProfilePage />}
                ></Route>
                <Route path="*" element={<MainPage/>}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
