import React, { useState, useEffect } from 'react'
import dish from '../../assets/dish.png'
import axios from 'axios';
import url from '../../misc/url.js';
import Skeleton from 'react-loading-skeleton';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function container1() {
  const data = useSelector(state => state.data.value)
  function left(){
    document.querySelector('.content1').scrollLeft -= 100;
  }
  function right(){
    document.querySelector('.content1').scrollLeft += 100;

  }
  const Navigate = useNavigate();
          function restaurant(id){
          localStorage.setItem("id", id);
          Navigate('/restaurant')
  
        }
 
  return (
    <div className=' mt-6 '>
    <div className='flex justify-between max-md:p-3'>
    <h1 className='text-2xl font-bold'>What's on your mind?</h1>
    <div className='flex'><div className='mr-3'><i class="fa-solid fa-arrow-left rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 hover:cursor-pointer " onClick={left}></i></div><div className='mr-3 hover:cursor-pointer'><i class="fa-solid fa-arrow-right rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={right}></i></div></div>

    </div>
    <div className='  flex overflow-x-auto  content1 border-b-2  mt-3 max-md:pl-3 ' style={{maxWidth: "1100px"}}>
      {data?data.map(Element =>(
        <div className=' mr-6  hover:cursor-pointer'  onClick={() =>restaurant(Element.id)} >
    <div className='image h-24 w-24 m-auto'>
    <img src={`data:${Element.type};base64,${Element.image}`} className=' h-full  w-full  rounded-s-full'/>

    </div>
    
    <div className='mt-6 text-md text-gray-600 font-bold flex justify-center '>
     {Element.name}
    </div>

    </div>
   

      )):  Array(8).fill().map((_, i) => (
        <div className='mr-6 w-24' key={i}>
          <Skeleton circle height={96} width={96} className="m-auto" />
          <Skeleton height={15} width={80} className="mt-4 mx-auto" />
        </div>
      ))}
     

  
   
   


    </div>
   
      
    </div>
  )
}
