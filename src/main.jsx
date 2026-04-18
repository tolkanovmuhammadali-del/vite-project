import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // BrowserRouter ТОЛЬКО здесь
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>   {/* ОДИН BrowserRouter здесь */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)