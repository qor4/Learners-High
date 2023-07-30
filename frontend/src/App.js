import React from 'react';
import { Route, Routes } from 'react-router-dom';

// 컴포넌트
import Main from './Main';
import UserJoin from './components/auth/UserJoin'
import UserJoinTeacherJob from './components/auth/UserJoinTeacherJob';
import UserJoinTeacherEdu from './components/auth/UserJoinTeacherEdu';
import UserLogIn from './components/auth/UserLogIn';
import UserJoinPage from './pages/auth/UserJoinPage'


import ClassJoinPage from './pages/class/ClassJoinPage'
import ClassRoundJoinPage from './pages/class/ClassRoundJoinPage';
import TestList from './components/test/TestList';
import DatePickerComponent from "./components/class/DatePickerComponent"

// test용


function App() {
  return (
    <div className="App">
    <DatePickerComponent/>
    {/* <FormStructor/> */}
    {/* <TeacherJobItem/> */}
    {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}
    {/* <UserLogIn/> */}

    {/* <ClassRoundJoinPage/> */}
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/join" element={<UserJoinPage/>}></Route>
      <Route path="/class/join" element={<ClassJoinPage/>}></Route>
      <Route path="/class/round/join" element={<ClassRoundJoinPage/>}></Route>
    </Routes>


    </div>
  );
}

export default App;
