import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import Signuppage from './components/Signuppage'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    // navigate between different pages
    <>
  <Routes>
    <Route path='/' element={<Homepage />}></Route>
    <Route path='/Signuppage' element={<Signuppage />}></Route>
  </Routes>
  
    </>
  )
}

export default App