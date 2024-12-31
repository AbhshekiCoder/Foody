import React from 'react'
import { Link } from 'react-router-dom'
export default function Profile({logout}) {
  return (
    <div className='profile h-60 max-w-60 bg-white modal ' style={{marginTop: "70px", marginLeft: "70%"}} onMouseLeave={()=>{document.querySelector('.profile').style.display = "none"}}>
    <div className='p-3  text-gray-400'>
    <Link to = "/" className='text-black text-md font-semibold   hover:no-underline hover:text-lg'>Profile</Link>


    </div>
    <div className='p-3  '>
    <Link to = "/" className='text-black text-md font-semibold hover:scale-150 hover:no-underline'>Order</Link>


    </div>
    <div className='p-3'>
    <Link to = "/" className='text-black text-md font-semibold hover:no-underline'>Favourite</Link>


    </div>
    <div className='p-3'>
    <Link to = "/login" className='text-black text-md font-semibold hover:no-underline'>Admin</Link>


    </div>
    <div className='p-3'>
    <Link to = "/" className='text-black text-md  hover:no-underline font-semibold ' onClick={logout}>Logout</Link>


    </div>
    


      
    </div>
  )
}
