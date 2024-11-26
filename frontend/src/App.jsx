import { useState } from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import './CSS/Common.css';

function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
    </Routes>

      
    </>
  )
}

export default App
