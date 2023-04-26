import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Test from './components/Test';

function App(): JSX.Element {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
