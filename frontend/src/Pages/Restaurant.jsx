import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url';

export default function Restaurant() {
  let [data, setData] = useState();
  let [dish, setDish] = useState();
  let restaurant = async() =>{
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}restaurant/${id}/restaurant/${id}`);
    if(result.data.success){
      setData(result.data.data)
      document.querySelector()
      
    }

  
  }
  let dish_fetch = async()=>{
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}dish/${id}/dish/${id}`);
    if(result.data.success){
      setDish(result.data.data)

    }


  }
  useEffect(()=>{
    restaurant()
    dish_fetch()

  },[])
  return (
    <div className='mt-16'>
    <div className='max-w-4xl m-auto'>
    <div className='p-3 '>
      <div className='text-xl font-bold'>
       {data?data.restaurant_name:''}
      </div>
      <div className='rounded-md mt-6 shadow-lg p-3'>
      <div className='font-bold'>
      <i class="fa-solid fa-star rounded-circle p-1 bg-green-500 text-white mr-3"></i>3.11rating
      </div>
      <div className='mt-6'>
        outlet vijay nagar
      </div>
      <div className='mt-6 font-bold'>
      30 - 35 min

      </div>

      </div>
    </div>
    <div className='mt-16'>
    <div className='flex justify-center text-lg text-gray-400'>
      Menu
    </div>
    <div className='border flex rounded-lg bg-gray-100 p-1 items-center'>
    <input type='text' placeholder='search any dishes' className=' w-11/12 h-10 outline-none bg-gray-100  content-center ' /> <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-6" ></i>


    </div>
    <div className='mt-6 p-3 border-b-2'>
   {dish?dish.map(Element =>(
    <div className='flex justify-between p-3 pb-6 border-b-2'>
    <div className=''>
    <div className='text-lg font-bold text-gray-600'>
     {Element.name}


    </div>
  
    <div className='mt-6'>
    <i class="fa-solid fa-indian-rupee-sign mr-3"></i>300

    </div>
    <div className='mt-6'>
    <i class="fa-solid fa-star text-green-600 text-sm mr-3"></i>5
   </div>
   <div className='mt-3 text-gray-400 font-bold'>
    {Element.description.substring(0, 90)}<button className='ml-3 text-gray-600'>...More</button>
   </div>

    </div>
    <div className=''>
    <div className='absolute   flex justify-center ml-2 mt-32 max-md:mt-32 max-sm:mt-20 max-sm:ml-4' > <button className=' text-green-600 border rounded-md w-32 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-16'>Add</button> </div>
           
           <div className=' w-36 h-36 rounded-lg max-md:w-36 max-md:h-36 max-sm:w-24 max-sm:h-24'>
           <img src= {`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-lg object-cover'/>

           </div>

    </div>

    </div>

   )):''}
    </div>
    

    </div>

    </div>
    <div className='message text-xl font-bold flex justify-center'>

    </div>
      
    </div>
  )
}
