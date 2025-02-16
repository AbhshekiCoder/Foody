import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/login.png'
import { useEffect } from 'react'
import { defaultClassPrefix } from 'rsuite/esm/internals/utils'
import axios from 'axios'
import url from '../misc/url.js'
export default function Singnin() {
    let navigate = useNavigate();
    useEffect(() =>{
        document.querySelector('.navbar').style.display = "none"

    },[])
    function signin(e){
        e.preventDefault();
        let form = document.forms['signin'];
        let email = form.email.value;
        let password = form.password.value;
        let obj = {
            email: email,
            password: password
        }
        axios.post(`${url}admin_signin/admin_signin`, obj).then(result =>{
            if(result.data.success){
                alert(result.data.message)
                localStorage.setItem("admin", email)
                navigate('/Admin')

            }
            else{
                alert(result.data.message)
            }
        })

    }
  return (
    <div >
    <div className=' z-10 p-6 m-auto max-w-96  h-fit'>
     <div className=' p-3 mt-36 rounded-sm' style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
    <div className='flex justify-between  max-w-96  items-center '>
    <div className=''>
        <div className='text-2xl font-bold'>Signin as Admin</div>
        <div className='mt-3' >or <Link to = "/signup" className='text-orange-600 font-bold'>if not have an account</Link></div>
        <div className='border-black mt-6  w-10 border'></div>
    </div>
    
    <div>
        <img src={login} className=' w-36 h-36'/>
    </div>
    

    </div>
    <form className='' name='signin' onSubmit={signin}>
    
    <div className='mt-3 w-full h-6'>
    <input type='email' name='email' placeholder='Enter you id' className='w-full rounded-sm h-full  p-3 border' required/>

    </div>
    <div className='mt-3 w-full h-6'>
    <input type='password'  name='password' placeholder='Enter your password' className='w-full rounded-sm h-full  p-3 border' required  />

    </div>
  
    <div className='mt-3'>
     <button className='h-9 w-full bg-orange-400 text-white font-bold rounded-md' type='submit'>
        Submit
     </button>
    </div> 
  

    </form>
    </div>
    <div>
        
           
      
    </div>
</div>

</div>

  )
}