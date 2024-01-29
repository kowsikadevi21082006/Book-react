import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Parentcontext from './context/Parentcontext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  //wrapping inside browser router
  <BrowserRouter>
  <Parentcontext>
    <App />
  </Parentcontext>
  </BrowserRouter>
)
