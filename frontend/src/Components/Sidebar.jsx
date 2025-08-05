import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userinfo } from '../feature/userinfo';
import {FaUserLock} from 'react-icons/fa'

export default function Sidebar() {
  const name = useSelector(state => state.name.value);
   let token = localStorage.getItem('token');
   const dispatch = useDispatch();
  let username  = '';
  if(token){
   
 let array = name?name.name.split(" "):'hii hello';

   username = array[0]
  

  }
  function logout(){
    localStorage.removeItem("token");
    dispatch(userinfo(''))
    
   }
    function login(){
    let modal = document.getElementsByClassName("modal");
    Array.from(modal).forEach(Element =>{
      Element.style.display = "none"
    })
    document.querySelector('.signin').style.display = "block";

   }
  
  return (
    <div className='sidebar w-60 border h-full bg-white modal ' style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}}>
      <div className='address text-lg font-semibold text-gray-400  border-b p-3 mt-3'>
        {name?username:"Hi"}
      </div>
       <Link to = "/dashboard" className=' hover:no-underline' >  
       {name? <div className='flex  items-center   border-b mt-3  p-3 hover:cursor-pointer'>
   
    <i class="fa-solid fa-user mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600 no-underline '>
      Profile</span>
    

    </div>: ''}
  
    </Link>
    <Link to = "/corporate" className='hover:no-underline'>  
      <div className='flex  items-center border-b mt-3  p-3'>
       <i class="fa-solid fa-bag-shopping mr-3 text-gray-600 "></i><p className=' text-gray-500 font-semibold hover:text-orange-600'>Foody Corporate</p>

      </div>
      </Link>
      <Link to = "/offers" className='hover:no-underline'>  
      <div className='flex items-center  border-b mt-3  p-3'>
        <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Offer</span>

       </div>
       </Link>
       <Link to = "/help" className='hover:no-underline'>  
       <div className='flex items-center border-b mt-3  p-3'>
       <i class="fa-solid fa-circle-info mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Help</span>

    </div>
    </Link>
    <Link to = "/cart" className='hover:no-underline'>  
    {name?<div className='flex  items-center  border-b mt-3  p-3'>
    <i class="fa-solid fa-cart-shopping mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Cart</span>

    </div>:''}
    
    </Link>
    <Link to = "/" className='hover:no-underline'>  
    <div className='flex items-center  border-b mt-3  p-3'>
        <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Faviroute</span>

       </div>
    </Link>
     <Link to = "/login" className='hover:no-underline'>  
    <div className='flex items-center  border-b mt-3  p-3'>
       <FaUserLock className='text-gray-600 mr-3'/> <span className=' text-gray-500 font-semibold  hover:text-orange-600'>Admin</span>

       </div>
    </Link>
       {name? <div className='logout  mt-16 pl-3 text-gray-600 font-bold hover:cursor-pointer' onClick={logout}>
      <i class="fa fa-sign-out mr-3 text-gray-600" ></i> Log Out


       </div>: <div className='logout mt-16 pl-3 text-gray-600 font-bold hover:cursor-pointer' onClick={login}>
      <i class="fa fa-sign-in mr-3 text-gray-600"></i> Signin


       </div>}
      
    </div>
  )
}
