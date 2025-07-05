import React, { useEffect, useState } from 'react'
import dish1 from '../../assets/dish1.png'
import axios from 'axios';
import url from '../../misc/url.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

export default function Content2() {
  const data = useSelector(state => state.data.value)
  let Navigate = useNavigate();
    function left(){
        document.querySelector('.content2').scrollLeft -= 100;
      }
      function right(){
        document.querySelector('.content2').scrollLeft += 100;
    
      }
      
      function restaurant(id){
        localStorage.setItem("id", id);
        Navigate('/restaurant')

      }
      return (
        <div className=' mt-9 pb-6 '>
        <div className='flex justify-between max-md:p-3'>
        <h1 className='text-2xl font-bold'>Top restaurant in your City</h1>
        <div className='flex'><div className='mr-3 hover:cursor-pointer'><i class="fa-solid fa-arrow-left rounded-circle  w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={left}></i></div><div className='mr-3 hover:cursor-pointer'><i class="fa-solid fa-arrow-right rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={right}></i></div></div>
    
        </div>
        <div className='  flex overflow-x-auto  border content2 border-b-2 pl-3 pb-6 mt-3 max-md:pl-3 ' style={{maxWidth: "1100px"}}>
        {data?data.map(Element =>(
          <div className=' mr-6  rounded-md hover:cursor-pointer' onClick={() =>restaurant(Element.id)} >
        <div className='image '>
        <img src={`data:${Element.type};base64,${Element.image}`} className=' h-full  w-full rounded-xl fit-content'/>
    
        </div>
        
        <div className='mt-3 text-lg text-gray-600 font-bold pl-3 '>
          {Element.name}
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
           {Element.description.substr(0, 50) + '...'}
        </div>
    
        </div>
        

        )): Array(6).fill().map((_, i) => (
        <div key={i} className='mr-6 rounded-md w-60'>
          <Skeleton height={140} className="rounded-xl w-full" />
          <Skeleton height={20} width="80%" className="mt-3 ml-3" />
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
