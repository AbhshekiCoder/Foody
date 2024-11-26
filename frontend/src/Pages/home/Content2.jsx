import React from 'react'
import dish1 from '../../assets/dish1.png'

export default function Content2() {
    function left(){
        document.querySelector('.content2').scrollLeft -= 100;
      }
      function right(){
        document.querySelector('.content2').scrollLeft += 100;
    
      }
      return (
        <div className=' mt-9 pb-6 '>
        <div className='flex justify-between max-md:p-3'>
        <h1 className='text-2xl font-bold'>Top restaurant in your City</h1>
        <div className='flex'><div className='mr-3'><i class="fa-solid fa-arrow-left rounded-circle  w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={left}></i></div><div className='mr-3'><i class="fa-solid fa-arrow-right rounded-circle border w-9 h-9 flex justify-center items-center bg-gray-300 " onClick={right}></i></div></div>
    
        </div>
        <div className='  flex overflow-x-auto  content2 border-b-2 pl-3 pb-6 mt-3 max-md:pl-0 ' style={{width: "1100px"}}>
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
       
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
       
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
       
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
       
        <div className=' mr-6 '>
        <div className='image '>
        <img src={dish1} className=' h-full  w-full rounded-xl '/>
    
        </div>
        
        <div className='mt-6 text-lg text-gray-600 font-bold pl-3 '>
          Rice
        </div>
        <div className='mt-2 pl-3 flex'>
        <div className='rounded-circle bg-green-600 w-6 h-6 flex justify-center items-center mr-3'> <i class="fa-solid fa-star text-white "></i></div><p className='rating mr-3'>4.2</p>30-35 mins
       
        </div>
        <div className='text-gray-500 pl-3 mt-2 font-semibold'>
            Thali , South Indians, Vijay nagar
        </div>
    
        </div>
       
       
       
    
    
        </div>
       
          
        </div>
      )
}
