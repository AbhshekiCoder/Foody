import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import url from '../misc/url'

export default function Cart() {
    let address = useSelector((state) => state.location.value);
    let user = useSelector((state) => state.name.value);


    let [data, setData] = useState();
    let [restaurant, setRestaurant] = useState();
    let [total, setTotal] = useState();

    function btn(e){
        document.getElementById('wallet-icon').style.backgroundColor = "black";
        document.querySelector('.payment-text').style.display = "none";
        document.querySelector('.payment-btn').style.display = "block";
        e.target.style.display = "none";
    }
    let dish = async() =>{
        let token = localStorage.getItem("token");
        let result = await axios.get(`${url}cartDetail/${token}/cartDetail/${token}`);
        if(result.data.success){
            setData(result.data.dish)
            setRestaurant(result.data.restaurant)
            setTotal(result.data.total)
            console.log(result.data.restaurant)
            
        }

    }
    useEffect(() =>{
        dish();

    },[])

    let payment = async() =>{
        let array = [];
        for(let i = 0; i< data.length; i++){
            array.push(data[i].name)

        }

        let obj = {
            name: array,
            username: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            price: total,
            restaurant: restaurant._id


        }
        let result = await axios.post(`${url}order/order`, obj);

        const options = {
			key: "rzp_test_pEZdDpwnJejkWR", // Add your Razorpay Key ID
			amount: result.data.data.amount * 100, // Amount in paise
			currency:'INR',
			name: "Your Company Name",
			description: "Test Transaction",
			order_id: result.data.data.id,
			handler: function (response) {
			 alert(`Payment ID: ${response.razorpay_payment_id}`);
			},
			prefill: {
			  name: "John Doe",
			  email: "john.doe@example.com",
			  contact: "9999999999",
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
    <button className='text-lg font-bold h-10 text-white bg-green-600 mt-6 w-full' style={{backgroundColor: "rgb(27,166,114)"}} onClick = {payment}>
        Proceed to Pay
    </button>

    </div>

    </div>

    </div>
    {
        restaurant?
            <div className='col-md bg-white p-3 ' >
    <div className='flex'>
    <div className='w-16 h-16'>
    <img src = {`data:${restaurant.type};base64,${restaurant.image}`} className='w-full h-full object-cover'/>

    </div>
    <div className='ml-6 text-lg font-bold'>
    {restaurant.restaurant_name}
    <div className='text-gray-400 text-sm'>{restaurant.address}</div>
    <div className='mt-6 w-10 border-b-2 border-black'></div>
    
    <div>

    </div>
   
    </div>

    </div>
    <div  className = ' overflow-y-auto  overflow-visible border-black border-b-2' style={{height: "400px", overflowY: "auto"}}>
    {data?data.map(Element =>(<div className='mt-3' >
    <div className='flex justify-between items-center'>
    <div className='text-lg'>
    {Element.name}
    </div>
    <div>
    <i class="fa-solid fa-indian-rupee-sign mr-3"></i>{Element.price}
    </div>
   
    </div>
    <div className='mt-6 p-2 flex justify-center' style={{backgroundColor: "rgb(250,250,250)"}}>
    <i class="fa-solid fa-quote-left mr-3"></i>Any Suggestion We will pass it on...

    </div>
    

    </div>)):''}
    <button className='h-10  border-2 border-dotted border-black w-full mt-6 '>
        Apply Coupon
    </button>
    <div className='border-b-2 pb-3 mt-6'>
    <div className='text-sm font-bold'>Bill Details</div>
    <div className='mt-3 flex justify-between'>
        <div>item total</div>
        <div>100</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>Deliver Fee</div>
        <div>20</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>Extra discount for you</div>
        <div>-20</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>item total</div>
        <div>100</div>
    </div>

    </div>
    <div className='border-b-2 pb-3 mt-6'>
    <div className='text-sm font-bold'>Bill Details</div>
    <div className='mt-3 flex justify-between'>
        <div>item total</div>
        <div>100</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>Deliver Fee</div>
        <div>20</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>Extra discount for you</div>
        <div>-20</div>
    </div>
    <div className='mt-3 flex justify-between'>
        <div>item total</div>
        <div>100</div>
    </div>

    </div>
    </div>
    <div className='flex justify-between font-bold mt-3' >
    <div>Total Pay</div>
    <div><i class="fa-solid fa-indian-rupee-sign mr-3"></i>{total}</div>

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
