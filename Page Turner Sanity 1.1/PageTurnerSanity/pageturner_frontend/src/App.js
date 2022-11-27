import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import ForgotPassword from './components/ForgotPassword';
import { CometChatUI } from "./CometChatWorkspace/src";


const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" isPrivate element={<Home />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App