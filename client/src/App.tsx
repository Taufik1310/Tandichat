import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Verification from './pages/Verification'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/api/verifyemail/:code" element={<Verification />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
