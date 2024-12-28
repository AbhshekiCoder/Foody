import React, { useState } from 'react'
import url from '../misc/url';
import {Message} from 'rsuite';
import axios from 'axios'
import {Loader} from 'rsuite'


export default function Signup() {
  let [type, setType] = useState("success");
  let  signup = async (e)=>{
      e.preventDefault();
      let form = document.forms['signup'];
      let name = form.name.value;
      let email = form.email.value;
      let phone = form.phone.value;
      let password = form.password.value;
      let obj = {
        name: name,
        email: email,
        phone: phone,
        password: password
      }

      let result = await axios.post(`${url}signup/signup`, obj );
      if(!result.data.success){
        setType("warning")
        document.getElementById("message").innerText = result.data.message;
        document.querySelector('.message').style.display = "block";
        setTimeout(()=>{
          document.querySelector('.message').style.display = "none";

        },2000)
      }
      else{
       
        setType("success")
        document.getElementById("message").innerText = result.data.message;
        document.querySelector('.message').style.display = "block";
        setTimeout(()=>{
          document.querySelector('.message').style.display = "none";

        },2000)
      }



  }
  return (
    <>
         <div className='w-100 h-100'>
         <Loader/>

         </div>
         <form name = "signup" onSubmit = {signup}>
         <div className='message w-fit h-6 mb-6  hidden '>
        <Message type = {type} id = "message" className='h-9 flex justify-center items-center text-green-500'>hello</Message>

        </div>
         <div className='max-w-96 h-16 mt-3'>
                <input type = "phone" className='w-full h-full border pl-3 outline-none' placeholder='phone number' name = "phone" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "text" className='w-full h-full border pl-3 outline-none' placeholder='name' name = "name" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "text" className='w-full h-full border pl-3 outline-none' placeholder='email' name = "email" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "password" className='w-full h-full border pl-3 outline-none' placeholder='password' name = "password" required/>
            </div>
            <div className='max-w-96 h-10 mt-3'>
            <button className='w-full h-full bg-orange-500 text-white font-bold'>Continue</button>

            </div>
            <p className='mt-3 text-sm'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
           
         </form>
    </>
  )
}
