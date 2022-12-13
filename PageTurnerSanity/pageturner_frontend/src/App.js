import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import WilliamShakespeare from './components/WilliamShakespeare';
import AgathaChristie from './components/AgathaChristie';
import JKRowling from './components/JKRowling';
import DanBrown from './components/DanBrown';
import { CometChatUI } from "./CometChatWorkspace/src";
import TopVideos from './components/TopVideos';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="williamshakespeare" element={<WilliamShakespeare/>} />
      <Route path="agathachristie" element={<AgathaChristie/>} />
      <Route path="jkrowling" element={<JKRowling/>} />
      <Route path="danbrown" element={<DanBrown/>} />
      <Route path="topvideos" element={<TopVideos/>} />
    </Routes>
  );
}

export default App