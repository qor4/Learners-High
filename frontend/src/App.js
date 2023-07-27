import React from 'react';
import { Route, Routes } from 'react-router-dom';

// 컴포넌트
import Main from './Main';
import UserJoin from './components/auth/UserJoin'
import UserJoinTeacherJob from './components/auth/UserJoinTeacherJob';
import UserJoinTeacherEdu from './components/auth/UserJoinTeacherEdu';
import UserLogIn from './components/auth/UserLogIn';

import FormStructor from './pages/LogInSignUpPage';

import ClassJoinPage from './pages/class/ClassJoinPage'


// test용


function App() {
  return (
    <div className="App">
    
    {/* <FormStructor/> */}
    {/* <TeacherJobItem/> */}
    {/* <UserJoinTeacherJob/>
    <UserJoinTeacherEdu/> */}
    <UserLogIn/>
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/join" element={<UserJoin/>}></Route>
      <Route path="/class/join" element={<ClassJoinPage/>}></Route>
    </Routes>


    </div>
  );
}

export default App;
