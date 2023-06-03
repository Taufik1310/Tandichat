import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/Main';

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
