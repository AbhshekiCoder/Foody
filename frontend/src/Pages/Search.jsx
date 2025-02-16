import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dishCount } from '../feature/cart';
import { createSlice } from '@reduxjs/toolkit';


export default function Search() {
    let [data , setData] = useState();
    let [dish, setDish] = useState();
    let [dishes, setDishes] = useState();
    let [count, setCount] = useState(Number(localStorage.getItem('count')) || 0);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let cart = useSelector((state) => state.cart.value);

    let search = async(e) =>{
        let input = e.target.value;
        let obj = {
            input: input
        }
        let result = await axios.post(`${url}search/search`, obj);
        if(result.data.success){
            setData(result.data.data)
            document.getElementById('message').innerText = ''
            document.querySelector('.search-content').style.display = "block"
            document.querySelector('.dish-content').style.display = "none"

        }
        else{
            console.log(result.data.message)
            document.getElementById('message').innerText = result.data.message

        }
       
    }
    let filter = async(name, id, restaurant_id)=>{
       if(name == "restaurant"){
        localStorage.setItem("id", restaurant_id);
         navigate('/restaurant')
       }
       else{
        let result = await axios.get(`${url}dish_search/${id}/dish_search/${id}`);
        if(result.data.success){
            console.log("hello")
            setDish(result.data.data);
              document.getElementById('message').innerText = '';
               document.querySelector('.search-content').style.display = "none"
               document.querySelector('.dish-content').style.display = "grid"

        }
        else{
            document.getElementById('message').innerText = result.data.message;

        }
        

       }

    }
    let btn = (id) =>{
        let result = dish.filter(Element => Element._id  == id);
        setDishes(result)

        document.querySelector('.detail').style.display = "block";
    }
    let add = async(name, restaurant_id, dish_id, price) =>{
        let token = localStorage.getItem('token');
        let dish = localStorage.getItem(`${dish_id}`);
        document.getElementById(dish_id).childNodes[1].innerText = dish?Number(dish) + 1:1;
        console.log(restaurant_id)
     
        let obj = {
            name: name,
            restaurant: restaurant_id,
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
            setCount(count + 1);
            console.log(count)
           
           
        }

    }
    let added = async(name, restaurant_id, dish_id, price) =>{
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
        let result = await axios.post( `${url}cart/cart`,
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
            setCount(count - 1);
            console.log(count)
            
        }
        else{
            localStorage.removeItem(`${dish_id}`);
            document.getElementById(dish_id).childNodes[1].innerText = 0;
           
           
           
        }
       
    }
   useEffect(() =>{
    dispatch(dishCount(count));
    localStorage.setItem('count', count);

   },[count])
  return (
    <> 
    <div className='modal detail w-100 h-100   hidden'>
    <div className='w-full h-full flex justify-center items-center border'>
    <div className='bg-white  w-96 h-fit rounded-md p-3'>
    <div className='flex justify-end'>
    <i class="fa-solid fa-xmark text-gray-500 text-xl" onClick={() =>{document.querySelector('.detail').style.display = "none"  }}></i>

    </div>
    <div>
        {dishes?dishes.map(Element =>(
            <div>
            <div className='w-full h-60'>
            <img src = {`data:${Element.type};base64,${Element.image}`} className='w-full h-full'/>
            
            </div>
            <div className='mt-6 text-lg font-bold'>
            {Element.name}
            </div>
            <div className='text-lg font-bold'>
            <i class="fa-solid fa-indian-rupee-sign mr-3"></i> {Element.price}
            </div>
            <div className='text-gray-400 font-bold'>
            {Element.description}
            </div>

            </div>

        )):''}
    </div>
    </div>

    </div>

    </div>

    
    <div className=' mt-36 max-md:p-3'>
    <div className=' max-w-3xl m-auto flex border items-center rounded-md p-2 '>
    <input type='text' className=' w-11/12 h-6  outline-none pl-3 ' placeholder='search for restaurant and dish' onChange={search}/>
    <i class="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-6" ></i>

    </div>
    <div className='mt-6 max-w-3xl m-auto '>
    <div className='mt-3 search-content'>
    {data?data.map(Element =>(
        <div className='flex mt-6  hover:bg-blue-100' onClick={()=>filter(Element.description?'dish':'restaurant', Element.name, Element._id)}  >
        <div className=' w-16 h-16'>
        <img src = {`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-md'/>

        </div>
        <div className='ml-6'>
        <div className='text-lg'>{Element.description?Element.name:Element.restaurant_name}</div>
        <div className='mt-3 text-gray-400'>{Element.description?'dish':'restaurant'}</div>
        </div>
        </div>

    )):''}

    </div>
    <div className='dish-content bg-blue-100 grid grid-cols-2 hidden mt-6 p-3 max-sm:grid-cols-1' style={{columnGap: "20px", rowGap: "20px"}}>
    {dish?dish.map((Element)  =>(
        <div className='p-3 bg-white rounded-2xl shadow-lg'>
        <div className='flex justify-between border-b-2 border-dotted pb-3'>
        <div className='text-lg font-bold text-gray-500'>{Element.restaurant_name}</div>
        <div className=''>
        <i class="fa-solid fa-arrow-right mr-3"></i>

        </div>
        
        <div>

        </div>


        </div>
        <div className='flex justify-between'>
        <div className=''>
            <div className='mt-3 text-lg font-bold'>
            {Element.name}
            </div>
            <div className='mt-3'>
            <i class="fa-solid fa-indian-rupee-sign mr-3"></i>{Element.price}

            </div>
            <div className='mt-3 h-1/2 flex items-end justify-betweens max-md:h-1/3'>
            <button className='border rounded-xl flex p-1 items-center max-md:text-sm' onClick = {() =>btn(Element._id)}>More Details <i class="fa-solid fa-arrow-right ml-3 max-sm:text-sm"></i></button>
            </div>
            
        </div>
        <div className='p-3 '>
      
            <div className='absolute   flex justify-center ml-2 mt-36 max-md:mt-32 max-sm:mt-20 max-sm:ml-0' >
            {localStorage.getItem(Element._id)?<div className='btn w-36 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-24  flex justify-between  items-center shadow-md ' ><button className='text-green-400 text-2xl' onClick={() =>add(Element.name, Element.id, Element._id, Element.price)}>+</button><p className='text-gray-500'>{localStorage.getItem(`${Element._id}`)?localStorage.getItem(`${Element._id}`):0}</p><button className='text-green-400 text-2xl' onClick={() =>added(Element.name, Element.id, Element._id)}>-</button></div>:       <button className=' text-green-600 border rounded-md w-36 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-16 ' onClick = {(e) =>{ e.target.style.display = "none";  dispatch(dishCount(0)); document.getElementById(Element._id).style.display = "flex"}}>Add</button>} 
     
            <div className='btn   w-36 h-9 bg-white font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-24   justify-between hidden items-center shadow-md' id ={Element._id}><button className='text-green-400 text-2xl' onClick={() =>add(Element.name, Element.id, Element._id)}>+</button><p className="text-gray-500" itemId={Element._id}>{localStorage.getItem(`${Element._id}`?localStorage.getItem(`${Element._id}`):0)}</p><button className='text-green-400 text-2xl' onClick={() =>added(Element.name, Element.restaurant_name, Element._id, Element.price)}>-</button></div>   </div>
           
            <div className=' w-40 h-40 rounded-lg max-md:w-36 max-md:h-36 max-sm:w-24 max-sm:h-24'>
            <img src= {`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-lg object-cover'/>

            </div>
           


        </div>

        </div>
      
        </div>

    )):''}

    </div>
    <div className='message  text-xl font-bold text-gray-400 mt-6 flex justify-center' id= "message">

    </div>

    </div>
      
    </div>
    </>
  )
}
