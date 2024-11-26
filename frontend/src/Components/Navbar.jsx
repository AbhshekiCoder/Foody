import React from 'react'
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';
export default function Navbar() {
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
  return (
    <> 
    <div className='navbar  h-16 sticky-top  bg-white' style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} >
    <div className='   m-auto'>
    <div className='flex h-full items-center justify-between'>
    <div className='logo max-lg:pl-3'>
    <img src = {logo} className=' h-10 w-10'/>

    </div>
    <div className='address text-lg font-semibold text-gray-400 max-lg:hidden'>
    Bhagya Laxmi Colony ...

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-bag-shopping mr-3 text-gray-600 "></i><a className=' text-gray-500 font-semibold hover:text-orange-600'>Diggy Corporate</a>

    </div>
    <div className='search flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600"></i> <p className=' text-orange-600 font-bold'>Search</p>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Offer</span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-circle-info mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Help</span>

    </div>
    <div className='flex h-full items-center  max-lg:hidden'>
    <i class="fa-solid fa-user mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>User</span>

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
