import axios from 'axios';
import React, { useState } from 'react';
import url from '../misc/url';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    let [data , setData] = useState();
    let [dish, setDish] = useState();
    let navigate = useNavigate();

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

  return (
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
            <button className='border rounded-xl flex p-1 items-center max-md:text-sm'>More Details <i class="fa-solid fa-arrow-right ml-3 max-sm:text-sm"></i></button>
            </div>
            
        </div>
        <div className='p-3 '>
            <div className='absolute   flex justify-center ml-2 mt-36 max-md:mt-32 max-sm:mt-20 max-sm:ml-4' > <button className=' text-green-600 border rounded-md w-36 h-9 bg-white m-auto font-bold text-lg max-md:w-32 max-sm:text-md max-sm:w-16'>Add</button> </div>
           
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
  )
}
