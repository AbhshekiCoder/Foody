import React, { useState, useEffect } from 'react'
import dish from '../../assets/dish.png'
import axios from 'axios';
import url from '../../misc/url.js';
export default function container1() {
  let [data, setData] = useState()
  function left(){
    document.querySelector('.content1').scrollLeft -= 100;
  }
  function right(){
    document.querySelector('.content1').scrollLeft += 100;

  }
  let content = async() =>{
    let result = await axios.post(`${url}dishes/dishes`);
    if(result.data){
      console.log(data)
      setData(result.data)
    }
    else{
      console.log("something went wrong")
    }

  }
  useEffect(()=>{
    content()

  },[])
  return (
    <div className=' mt-6 '>
    <div className='flex justify-between max-md:p-3'>
    <h1 className='text-2xl font-bold'>What's on your mind?</h1>
    <div className='flex'><div className='mr-3'><i class="fa-solid fa-arrow-left rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={left}></i></div><div className='mr-3'><i class="fa-solid fa-arrow-right rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={right}></i></div></div>

    </div>
    <div className='  flex overflow-x-auto  content1 border-b-2 pb-6 mt-3 max-md:pl-3 ' style={{maxWidth: "1100px"}}>
      {data?data.map(Element =>(
        <div className=' mr-6 '>
    <div className='image h-36 w-36 m-auto'>
    <img src={`data:${Element.type};base64,${Element.image}`} className=' h-full  w-full  rounded-s-full'/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center '>
     {Element.name}
    </div>

    </div>
   

      )):''}
     

  
   
   


    </div>
   
      
    </div>
  )
}
