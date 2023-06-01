import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
