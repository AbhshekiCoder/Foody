import React, { useEffect, useState } from 'react'
import login from '../assets/login.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import url from '../misc/url';
export default function Singnup() {
    let [file, setFile] = useState();
    

   useEffect(()=>{
    document.querySelector('.navbar').style.display = "none";
    
  

   },[])
    let signup =  async(e) => {
        e.preventDefault();
        let form  = document.forms['signup']
        let name = form.name.value;
    
        
        let formData = new FormData();
       
        console.log(file)
     
        formData.append('file', file);
        formData.append('name', name)
       formData.append('email', form.email.value);
       formData.append('phone', form.phone.value);
       formData.append('restaurant_name', form.restaurant_name.value);

        let result =  axios.post(`${url}admin_signup/admin_signup`,  formData).then((result) =>{
            if(result.data.success){
                alert(result.data.message)
                console.log(result.data.data)
                setData(result.data.data)
              
            }
            else{
                alert(result.data.message)
    
            }

        });

        

     
    }
    function image(e){
        setFile(e.target.files[0])
       
    }
  return (
    <div >
        <div className=' z-10 p-6 m-auto max-w-96  h-fit'>
         <div className=' p-3 mt-36 rounded-sm' style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
        <div className='flex justify-between  max-w-96  items-center '>
        <div className=''>
            <div className='text-2xl font-bold'>Signup as Admin</div>
            <div className='mt-3' >or <Link to = "/login" className='text-orange-600 font-bold' >Already an account</Link></div>
            <div className='border-black mt-6  w-10 border'></div>
        </div>
        
        <div>
            <img src={login} className=' w-36 h-36'/>
        </div>
        

        </div>
        <form className='' name='signup' onSubmit={signup}>
        <div className='mt-3 w-full h-6'>
        <input type='text' name='name' placeholder='Enter you name' className='w-full rounded-sm h-full border p-3' required/>

        </div>
        <div className='mt-3 w-full h-6'>
        <input type='email' name='email' placeholder='Enter you email' className='w-full rounded-sm h-full  p-3 border' required/>

        </div>
        <div className='mt-3 w-full h-6'>
        <input type='text'  name='phone' placeholder='Enter you phone no.' className='w-full rounded-sm h-full  p-3 border' required  minLength="10" maxLength="10" pattern='\d{10}'/>

        </div>
        <div className='mt-3 w-full h-6'>
        <input type='text' name='restaurant_name' placeholder='Enter your restaurant name' className='w-full rounded-sm h-full  p-3 border' required/>
        </div>

        <div className='mt-4 mb-1 w-full '>
        <span className='pl-2'>Select an image for your id</span>
        <input type='file' name='image' placeholder='' className='w-full rounded-sm h-full pl-2 mt-2' required onChange={image}/>
        

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
