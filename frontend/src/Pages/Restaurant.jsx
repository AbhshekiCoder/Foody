import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { dishCount } from '../feature/cart';



export default function Restaurant() {
  let [data, setData] = useState();
  let [dish, setDish] = useState();
  let cart = useSelector(state => state.cart.value);
  let dispatch = useDispatch();
  

  let restaurant = async() =>{
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}restaurant/${id}/restaurant/${id}`);
    if(result.data.success){
      setData(result.data.data)
     
      
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
  let dish_name = async(e) =>{
    let dish1 = e.target.value.toUpperCase();
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}dish/${id}/dish/${id}`);
    if(result.data.success){
      
    let result1 = result.data.data.filter(Element => Element.name.toUpperCase().includes(dish1));
   
    setDish(result1);
    }
    
  }
  let add = async(name, restaurant, dish_id, price) =>{
    let token = localStorage.getItem('token');
    let dish = localStorage.getItem(`${dish_id}`);
    document.getElementById(dish_id).childNodes[1].innerText = dish?Number(dish) + 1:1;
       
 
    let obj = {
        name: name,
        restaurant: restaurant,
        dish_id: dish_id,
        token: token,
        count: dish?Number(dish) + 1:1,
        price: price
       
    }
    let result = await axios.post(
       `${url}cart/cart`,
            obj,
            
            {
                headers:{

                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }

           
            }
            
           
    );
    if(result.data.success){
        localStorage.setItem(`${result.data.data.dish_id}`,  result.data.data.count);
        dispatch(dishCount(cart + 1));
        localStorage.setItem('count', cart);
       
    }

}
let added = async(name, restaurant, dish_id, price) =>{
    let token = localStorage.getItem('token');
    let dish = localStorage.getItem(`${dish_id}`);
    if(Number(dish) == 0){
        
        localStorage.removeItem(`${dish_id}`);
        return;
    }
    document.getElementById(dish_id).childNodes[1].innerText = Number(dish) - 1;
       
 
    let obj = {
        dish_id: dish_id,
        token: token,
        count: Number(dish) - 1,
        price: price
       
    }
    let result = await axios.post(
       `${url}cart/cart`,
            obj,
            
            {
                headers:{

                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }

           
            }
            
           
    );
    if(result.data.success){
        localStorage.setItem(`${result.data.data.dish_id}`,  result.data.data.count);
        dispatch(dishCount(cart - 1))
         localStorage.setItem('count', cart);
       
       
    }
    else{
        localStorage.removeItem(`${dish_id}`);
       
    }
   
}

  
  return (
    <>  
    <div className='max-w-24 h-24 absolute fixed' style={{marginLeft: "83%", top: "70%"}}>
    <h1 className='text-lg flex justify-center'>Menu</h1>
    <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-full h-full">
        {dish?dish.map(Element =>(
          <SwiperSlide className='bg-green-500 rounded-lg flex  text-center items-center text-white font-bold p-1 ' style={{display: "flex", justifyContent: "center", alignItems: "center"}}> {Element.name}</SwiperSlide>

        )):''}
      
       
       
      </Swiper>

    </div>
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
    <input type='text' placeholder='search any dishes' className=' w-11/12 h-10 outline-none bg-gray-100  content-center ' onChange={dish_name} /> <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-6" ></i>


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
    <div className='absolute   flex justify-center ml-2 mt-32 max-md:mt-32 max-sm:mt-20 ' >{localStorage.getItem(`${Element._id}`)?<div className='btn w-32 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-24  flex justify-between  items-center shadow-md' id ={Element._id}><button className='text-green-400 text-2xl' onClick={() =>add(Element.name, Element.restaurant_name, Element._id, Element.price)}>+</button><p className='text-gray-500'>{localStorage.getItem(`${Element._id}`)?localStorage.getItem(`${Element._id}`):0}</p><button className='text-green-400 text-2xl' onClick={() =>added(Element.name, Element.restaurant_name, Element._id, Element.price)}>-</button></div>:       <button className=' text-green-600 border rounded-md w-32 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-16 ' onClick = {(e) =>{document.getElementById(Element._id).style.display = "flex"; e.target.style.display = "none"}}>Add</button>} 
     
     <div className='btn w-32 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-24  flex justify-between hidden items-center shadow-md' id ={Element._id}><button className='text-green-400 text-2xl' onClick={() =>add(Element.name, Element.restaurant_name, Element._id)}>+</button><p className="text-gray-500" itemId={Element._id}>{localStorage.getItem(`${Element._id}`)?localStorage.getItem(`${Element._id}`):0}</p><button className='text-green-400 text-2xl' onClick={() =>added(Element.name, Element.restaurant_name, Element._id)}>-</button></div> 
     </div>
           
           <div className=' w-36 h-36 rounded-lg max-md:w-36 max-md:h-36 max-sm:w-24 max-sm:h-24'>
           <img src= {`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-lg object-cover'/>

           </div>

    </div>

    </div>

   )):<Loader/>}
    </div>
    

    </div>

    </div>
    <div className='message text-xl font-bold flex justify-center'>

    </div>
      
    </div>
    </>
  )
}
