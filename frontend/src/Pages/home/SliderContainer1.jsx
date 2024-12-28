import React from 'react'
import dish from '../../assets/dish.png'
export default function container1() {
  function left(){
    document.querySelector('.content1').scrollLeft -= 100;
  }
  function right(){
    document.querySelector('.content1').scrollLeft += 100;

  }
  return (
    <div className=' mt-6 '>
    <div className='flex justify-between max-md:p-3'>
    <h1 className='text-2xl font-bold'>What's on your mind?</h1>
    <div className='flex'><div className='mr-3'><i class="fa-solid fa-arrow-left rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={left}></i></div><div className='mr-3'><i class="fa-solid fa-arrow-right rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={right}></i></div></div>

    </div>
    <div className='  flex overflow-x-auto  content1 border-b-2 pb-6 mt-3 max-md:pl-3 ' style={{maxWidth: "1100px"}}>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
    <div className=' mr-6 border'>
    <div className='image h-36 w-36 m-auto'>
    <img src={dish} className=' h-full  w-full '/>

    </div>
    
    <div className='mt-6 text-lg text-gray-600 font-bold flex justify-center border'>
      Rice
    </div>

    </div>
   


    </div>
   
      
    </div>
  )
}
