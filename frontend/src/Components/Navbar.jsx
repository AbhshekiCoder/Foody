import React, { useState } from 'react'
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';
import {useSelector} from 'react-redux'
import { useDispatch} from 'react-redux';
import { userinfo } from '../feature/userinfo';
import url from '../misc/url.js';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Location from '../misc/Location';
import { locationinfo } from '../feature/location';
import {MdLocationOn } from 'react-icons/md';

export default function Navbar({login, profile, logout}) {

  let dispatch = useDispatch()
  
  let cart = useSelector((state) => state.cart.value)
  let name = useSelector((state) => state.name.value);
  let token = localStorage.getItem('token');
  let username  = '';
  if(token){
   
 let array = name?name.name.split(" "):'hii hello';

   username = array[0]
  

  }
  
    

  
 console.log(name)
  
  let location = useSelector((state) => state.location.value);
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
  
   
   function profile_open(){
   
       document.querySelector('.profile').style.display = "block"
  
    
   }
   let user = async() =>{
    try{
      let token = localStorage.getItem('token');
      let result = await axios.post(`${url}user/user`, {token} );
      console.log(result.data)
      dispatch(userinfo(result.data))
      
      dispatch(locationinfo(result.data.address))
    
      
     }catch(err){
      console.log(err.message)
     }
   }
   useEffect(() =>{
    user()
    console.log(name)
    
     

    

   },[])

  return (
    <> 
    <div className='navbar  h-16 sticky-top  bg-white' style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} >
    <div className='   m-auto'>
    <div className='flex h-full items-center justify-between'>
    <div className='logo max-lg:pl-3'>
    <Link to ="/"><img src = {logo} className=' h-10 w-32 hover:h-11 '/> </Link> 

    </div>
    <div className='address text-lg font-semibold text-gray-400 max-lg:hidden hover:cursor-pointer flex items-center' onClick={() =>{
      document.querySelector('.location').style.display = "block"
      console.log("hello")
    }}>
    <MdLocationOn className='text-orange-600'/> <span>{location.substr(0, 30) + '...'}</span>
    </div>
    <div className='flex h-full items-center  max-lg:hidden no-underline'>
    <i class="fa-solid fa-bag-shopping mr-3 text-gray-600 "></i><Link to = '/corporate' className=' text-gray-500 font-semibold hover:text-orange-600  hover:no-underline  '>Foody Corporate</Link>

    </div>
    <div className='search flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600"></i> <p className=' text-orange-600 font-bold search_item' ><Link to = "/Search" className=' text-orange-600 font-bold hover:no-underline' >Search</Link></p>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'><Link to = "/offers" className=' hover:text-orange-600  text-gray-500 hover:no-underline '> Offer</Link></span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-circle-info mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'><Link to = "/help"  className=' hover:text-orange-600  text-gray-500 hover:no-underline '> Help</Link></span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    {profile?<div className='flex items-center'><div className='rounded-circle flex justify-center items-center border h-9 w-9 mr-3 font-bold hover:cursor-pointer'  onMouseOver={profile_open}>{username?username[0]:''}</div><span className=' text-gray-500 font-semibold  hover:text-orange-600' >{username}</span></div>:<span className=' text-gray-500 font-semibold  hover:text-orange-600 hover:cursor-pointer' onClick={login}>Login</span>}

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <p>{localStorage.getItem("token")?cart:''}</p>
    <i class="fa-solid fa-cart-shopping mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'><Link to = "/cart" className=' hover:text-orange-600  text-gray-500 hover:no-underline '>Cart</Link></span>

    </div>
    <div className='hidden h-full items-center max-lg:flex mr-3' onClick={sidebar}>
    <i class="fa-solid fa-bars text-gray-500 text-xl"></i>
      
    </div>


    </div>
   
    </div>
      
    </div>
     <Location/>
    <Sidebar logout={logout} login={login}/>
    </>
  )
}
