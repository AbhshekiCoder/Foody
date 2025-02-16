import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../misc/url';
import { useNavigate } from 'react-router-dom';
export default function Admin() {
   let [file, setFile] = useState();
   let navigate = useNavigate();
    useEffect(()=>{
        document.querySelector('.navbar').style.display = "none";

    },[])
    function image(e){
      setFile(e.target.files[0]);
      console.log(e.target.files[0])

    }
    let form = async(e) =>{
      e.preventDefault();
      let form = document.forms['dish'];
      let name = form.name.value;
      let description = form.description.value;
      let price = form.price.value;
      let email = localStorage.getItem('admin')
      
      console.log(email)

      let formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file);
      formData.append("email", email)
      formData.append("price", price)
      formData.append("type", file.type)
     
      
      let result = await axios.post(`${url}dish_fetch/dish_fetch`, formData )
      if(result.data.success){
        alert(result.data.message);
      }
      else{
        alert(result.data.message)
      }

    }

  return (
    <div className='admin'>
    <div className=' flex justify-between items-center h-16' style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
    <div className='font-bold text-xl text-orange-600 p-3'>
        Diggy
    </div>
    <div className='text-orange-400 font-bold text-lg'>
    Apna Sweets


    </div>
    <div className='font-bold p-3' onClick={()=>{ localStorage.removeItem("admin"), navigate('/') }}>
    Log out

    </div>

    </div>
    <div className = ' max-w-3xl m-auto'>
    <h1 className='text-3xl font-bold text-orange-400 mt-36'>Add an dish of your Restaurant</h1>
    <div className='mt-6 dish-form max-w-96   border-orange-600 shadow-lg p-3 '>
    <form className='dish' name='dish' onSubmit={form}>
    <div className='w-full'>
      <span>Dish Name</span>
      <input type='text' name='name' className='border w-full h-9' />
    </div>
    <div className='mt-3'>
      <span>description</span>
      <textarea name='description' className='border w-full h-9' rows={10}></textarea>
    </div>
    <div className='mt-3'>
      <span>price</span>
      <input type='Number' name='price' className='border w-full h-9'/>
    </div>
    <div className='mt-3'>
      <span>Dish image</span>
      <input type='file'  className=' w-full h-9' onChange={image} />
    </div>
    <button type='submit' className='w-full h-10 bg-orange-600 text-white font-bold '>submit</button>
    

    </form>
   

    </div>

    </div>
      
    </div>
  )
}
