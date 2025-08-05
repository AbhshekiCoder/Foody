import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from '../../misc/url';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'


export default function ContentList() {
  const data = useSelector(state => state.data.value)
  const Navigate = useNavigate();
        function restaurant(id){
        localStorage.setItem("id", id);
        Navigate('/restaurant')

      }
  return (
    <div className=' mt-9 pb-6 '>
    <div className=' '>
    <h1 className='text-2xl font-bold max-md:p-3'>Restaurant with online food in your city</h1>
   

    </div>
    <div className='    contentlist    mt-3  max-md:pl-3 ' style={{maxWidth: "1100px"}}>
   {data?data.map(Element =>(
  
      
     <div className=' mr-6 hover:cursor-pointer ' onClick={() =>restaurant(Element.id)}>
    <div className='w-full h-40'>
    
   
    <img src={`data:${Element.type};base64,${Element.image}`} className=' h-full  w-full rounded-xl '/>
    
    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold pl-3 max-lg:text-sm '>
      {Element.name}
    </div>
    <div className='mt-2 pl-3 flex  max-lg:text-sm'>
    <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3  max-lg:text-sm'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
   
    </div>
    <div className='text-gray-500 pl-3 mt-2 font-semibold  max-lg:text-sm'>
        {Element.description.substring(0, 100) + "..."}
    </div>

    </div>

   )):Array(6).fill().map((_, i) => (
    <div className='mr-6' key={i}>
      <Skeleton height={160} className="rounded-xl w-full" />
      <Skeleton height={20} width="80%" className="mt-4 ml-3" />
      <div className='flex mt-2 ml-3'>
        <Skeleton circle height={24} width={24} className="mr-3" />
        <Skeleton height={20} width={60} />
      </div>
      <Skeleton height={15} width="90%" className="mt-2 ml-3" />
    </div>
  ))
}




    </div>
   
      
    </div>
  )
}
