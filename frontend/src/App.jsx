import { useState } from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import './CSS/Common.css';
import Login from './Components/Login';

function App() {
   function login(){
    console.log("hello")
    document.querySelector('.signin').style.display = "block";
   }

  return (
    <>
    <Navbar login={login}/>
    <Login/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
    </Routes>

      
    </>
  )
}

export default App
