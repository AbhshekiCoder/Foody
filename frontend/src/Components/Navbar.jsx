import React from 'react'
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';
import {useSelector} from 'react-redux'
import { useDispatch} from 'react-redux';
import { userinfo } from '../feature/userinfo';
import url from '../misc/url';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Navbar({login, profile, logout}) {
  let dispatch = useDispatch()
  let name = useSelector((state) => state.name.value);
  let array = name.split(' ');
  let username = Array.from(array[0])
  console.log(profile)
  let num = 1;
  function sidebar(){
    num++;
    if(num % 2 == 0){
      document.querySelector('.sidebar').style.display = "block";
    }
    else{
      document.querySelector('.sidebar').style.display = "none";

    }
  }
  useEffect(()=>{
    user();
   
    

   })
   let user = async()=>{
    
    let token = localStorage.getItem('token');
    try{
     let result = await axios.post(`${url}user/user`, {token} );
     dispatch(userinfo(result.data))
     
    }catch(err){
     console.log(err.message)
    }
   }
   
   function profile_open(){
   
       document.querySelector('.profile').style.display = "block"
  
    
   }

  return (
    <> 
    <div className='navbar  h-16 sticky-top  bg-white' style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} >
    <div className='   m-auto'>
    <div className='flex h-full items-center justify-between'>
    <div className='logo max-lg:pl-3'>
    <Link to ="/"><img src = {logo} className=' h-10 w-10'/> </Link> 

    </div>
    <div className='address text-lg font-semibold text-gray-400 max-lg:hidden'>
    Bhagya Laxmi Colony ...

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-bag-shopping mr-3 text-gray-600 "></i><a className=' text-gray-500 font-semibold hover:text-orange-600'>Diggy Corporate</a>

    </div>
    <div className='search flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600"></i> <p className=' text-orange-600 font-bold search_item' ><Link to = "/Search" className=' text-orange-600 font-bold'>Search</Link></p>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Offer</span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-circle-info mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Help</span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    {profile?<div className='flex items-center'><div className='rounded-circle flex justify-center items-center border h-9 w-9 mr-3 font-bold'  onMouseOver={profile_open}>{username[0]}</div><span className=' text-gray-500 font-semibold  hover:text-orange-600' >{array[0]}</span></div>:<span className=' text-gray-500 font-semibold  hover:text-orange-600' onClick={login}>Login</span>}

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-cart-shopping mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Cart</span>

    </div>
    <div className='hidden h-full items-center max-lg:flex mr-3' onClick={sidebar}>
    <i class="fa-solid fa-bars text-gray-500 text-xl"></i>
      
    </div>


    </div>
   
    </div>
      
    </div>
    <Sidebar/>
    </>
  )
}
