import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import url from '../misc/url.js'
import { FaRupeeSign } from 'react-icons/fa'
import { dishCount } from '../feature/cart.js'
import { setCartDetail } from '../feature/cartDetail.js'
export default function Cart() {
    let address = useSelector((state) => state.location.value);
    let user = useSelector((state) => state.name.value);
    let cart = useSelector((state) => state.cartDetail.value);
    const dispatch = useDispatch()


    

    function btn(e){
        document.getElementById('wallet-icon').style.backgroundColor = "black";
        document.querySelector('.payment-text').style.display = "none";
        document.querySelector('.payment-btn').style.display = "block";
        e.target.style.display = "none";
    }
   
    let payment = async() =>{
      

        let obj = {
            dish: data,
            username: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            price: total,
            restaurant: restaurant


        }
        let result = await axios.post(`${url}order/order`, obj);

        const options = {
			key: "rzp_test_pEZdDpwnJejkWR", // Add your Razorpay Key ID
			amount: result.data.data.amount * 100, // Amount in paise
			currency:'INR',
			name: "Foody",
			description: "Test Transaction",
			order_id: result.data.data.id,
			handler: function (response) {
               alert("order is created")
               data.forEach(Element =>{
                localStorage.removeItem(Element.dish_id);
                

               })
               localStorage.setItem("count", 0);
               dispatch(dishCount(0))

              dispatch(setCartDetail(''));
              
           document.querySelector('.payment-text').style.display = "block";
           document.querySelector('.payment-btn').style.display = "none";
              
			},
			prefill: {
			  name: user.name,
			  email: user.email,
			  contact: user.phone,
			},
			theme: {
			  color: "#3399cc",
			},                                                                                             
		  };
        const rzp =  new window.Razorpay(options)
		rzp.open();
        

    }
  return (
    <div  className='w-full  h-screen pt-6 pb-3' style={{backgroundColor: "rgb(233,236,238)"}}>
    <div className='max-w-7xl m-auto row max-md:w-full ' style={{backgroundColor: "rgb(233,236,238)"}}>
   
    <div className='col-7 p-6 border max-md:w-full' style={{backgroundColor: "rgb(233,236,238)"}}>
   
    <div className='bg-white p-6'>
    <div className='text-lg font-bold '>
    Delivery Address<i class="fa-solid fa-circle-check ml-6 text-green-600 font-bold"></i>
    <div className='border p-3 flex mt-6 max-w-72 hover:shadow-lg hover:cursor-pointer ' >
    <div><i class="fa-solid fa-house text-lg "></i></div>
    <div className='pl-3'>
    <div>Home</div>
    <div className='text-gray-400 text-sm max-w-60'>
    {address}

    </div>
    <div className='mt-6 w-fit p-2 text-white font-bold text-sm ' onClick={btn} style={{backgroundColor: "rgb(27,166,114)"}}>
    DELIVER HERE


    </div>

    </div>

    </div>

    </div>

    </div>
    <div className='mt-6 bg-white p-9'>
    <div className='font-bold text-xl payment-text'>
        Payment
    </div>
    <div className='p-3 payment-btn hidden'>
    <div className='text-lg font-bold'>Choose Payment Method</div>
    <button className='text-lg font-bold h-10 text-white bg-green-600 mt-6 w-full' style={{backgroundColor: "rgb(27,166,114)"}} onClick = {payment} disabled={cart.data?false:true} >
        Proceed to Pay
    </button>

    </div>

    </div>

    </div>
    {
        cart?
            <div className='col-md bg-white p-3 ' >
    <div className='flex'>
    <div className='w-16 h-16'>
    <img src = {`data:${cart.restaurant.type};base64,${cart.restaurant.image}`} className='w-full h-full object-cover'/>

    </div>
    <div className='ml-6 text-lg font-bold'>
    {cart.restaurant.restaurant_name}
    <div className='text-gray-400 text-sm'>{cart.restaurant.address}</div>
    <div className='mt-6 w-10 border-b-2 border-black'></div>
    
    <div>

    </div>
   
    </div>

    </div>
    <div  className = ' overflow-y-auto  overflow-visible border-black border-b-2' style={{height: "400px", overflowY: "auto"}}>
    {cart.data?cart.data.map(Element =>(<div className='mt-3' >
    <div className='flex justify-between items-center'>
    <div className='text-md text-gray-500 font-bold'>
    {Element.name}
    </div>
    <div>
        Qty:{Element.count}
    </div>
    <div>
    <i class="fa-solid fa-indian-rupee-sign mr-3"></i>{Element.price * Element.count}
    </div>
   
    </div>
   

    </div>)):''}
     <div className='mt-6 p-2 flex justify-center' style={{backgroundColor: "rgb(250,250,250)"}}>
    <i class="fa-solid fa-quote-left mr-3"></i>Any Suggestion We will pass it on...

    </div>
    
    <button className='h-10  border-2 border-dotted border-black w-full mt-6 '>
        Apply Coupon
    </button>
    <div className='border-b-2 border-dotted pb-3 mt-6'>
    <div className='text-sm font-bold '>Bill Details</div>
    <div className='mt-3 flex justify-between'>
        <div>item total</div>
        <div className='flex items-center'>  <FaRupeeSign className=' ' /> {total}</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>Deliver Fee</div>
        <div className='flex items-center'><FaRupeeSign/>20</div>
    </div>
    

    </div>
    <div className='border-b-2  pb-3 mt-6'>
    
  
    <div className='mt-3 flex justify-between'>
        <div>Extra discount for you</div>
        <div>  <i class="fa-solid fa-indian-rupee-sign mr-3"></i>-20</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>GST & Other charges</div>
        <div>  <i class="fa-solid fa-indian-rupee-sign mr-3"></i>34</div>
    </div>

    </div>
    </div>
    <div className='flex justify-between font-bold mt-3' >
    <div>Total Pay</div>
    <div><i class="fa-solid fa-indian-rupee-sign mr-3"></i>{cart.total + 20 + 34}</div>

    </div>


    </div>
:<div className='col-md flex justify-center items-center text-lg font-bold'>
    No Item in cart
</div>


    }
    
    <div className='absolute w-fit'>
    <i class="fa-solid fa-location-pin border text-lg    w-9 h-9 mt-3 text-white bg-black flex justify-center items-center"></i>
    <div className=' border-dotted  border-l-2 ml-2 h-72 w-1  border-black'>
    
  
    </div>
    <div className='border'>
    <i class="fa-solid fa-wallet  border text-lg    w-9 h-9  text-black bg-white flex justify-center items-center wallet " id ="wallet-icon"></i>


    </div>

    </div>

    </div>
      
    </div>
  )
}
