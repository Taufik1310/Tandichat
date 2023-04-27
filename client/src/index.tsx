import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';


const StrictApp = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <StrictApp />)
} else {
  const root = createRoot(rootElement)
  root.render(<StrictApp />)
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
