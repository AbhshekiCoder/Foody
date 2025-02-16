import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../assets/login.png'
import Signup from './Signup';
import url from '../misc/url';
import axios from 'axios';
import { Message } from 'rsuite';

export default function Login({signin, type}) {
    let [num, setNum] = useState(false);
    
    function signup(){
        setNum(true);
    }
    
    function signup_modal(){
        setNum(false)
    }
    
    function close_login_modal(){
        document.querySelector('.signin').style.display  = "none"
    }
   
  return (
    <div className='signin modal w-100 h-100 '>
    <div className='login-modal z-10 p-6'>
        <div className='close_modal' onClick={close_login_modal}>
        <i class="fa-solid fa-xmark text-gray-500 text-xl"></i>

        </div>
        <div className='flex justify-between  max-w-96 mt-6  items-center'>
        {num? <div className=''>
            <div className='text-2xl font-bold'>Signup</div>
            <div className='mt-3' >or <Link to = "/" className='text-orange-600 font-bold' onClick={signup_modal}>or Login to your account</Link></div>
            <div className='border-black mt-6  w-10 border'></div>
        </div>:<div className=''>
            <div className='text-2xl font-bold'>Login</div>
            <div className='mt-3' >or <Link to = "/" className='text-orange-600 font-bold' onClick={signup}>Create an account</Link></div>
            <div className='border-black mt-6  w-10 border'></div>
        </div>}
        
        <div>
            <img src={login} className=' w-36 h-36'/>
        </div>

        </div>
        <div className='mt-6'>
        {num?<Signup/>:<form name = "login" onSubmit={signin}>
        <div className='message w-fit h-6 mb-6  hidden '>
        <Message type = {type} id = "message" className='h-9 flex justify-center items-center text-green-500'>hello</Message>

        </div>
            <div className='max-w-96 h-16'>
                <input type = "text" className='w-full h-full border pl-3 outline-none' placeholder='email' name = "email" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "password" className='w-full h-full border pl-3 outline-none' placeholder='password' name = "password" required/>
            </div>
            <div className='max-w-96 h-10 mt-3'>
            <button className='w-full h-full bg-orange-500 text-white font-bold'>Submit</button>

            </div>
            <p className='mt-3 text-sm'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
           
            </form>}
            
        </div>
    </div>
     
      
    </div>
  )
}
