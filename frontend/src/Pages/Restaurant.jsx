import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { dishCount } from '../feature/cart';
import { FaHeart, FaRegHeart, FaStar, FaRupeeSign, FaSearch } from 'react-icons/fa';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';


export default function Restaurant() {
  const [data, setData] = useState();
  const [dish, setDish] = useState();
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.value);
  const [count, setCount] = useState(Number(localStorage.getItem('count')) || 0);
  const [restaurantId, setRestaurantId] = useState(localStorage.getItem('id'));
  const [isinterested, setisIntrested] = useState(false)

  useEffect(() => {
    restaurant();
    dish_fetch();
    setQuantities(getLocalQuantities());
  }, []);

  const getLocalQuantities = () => {
    const stored = {};
    Object.keys(localStorage).forEach(key => {
      if (!isNaN(localStorage.getItem(key))) {
        stored[key] = Number(localStorage.getItem(key));
      }
    });
    return stored;
  };

  const restaurant = async () => {
    let result = await axios.get(`${url}restaurant/${restaurantId}/restaurant/${restaurantId}`);
    if (result.data.success) {
      setData(result.data.data);
      console.log(data)
    }
  };

  const dish_fetch = async () => {
    let result = await axios.get(`${url}dish/${restaurantId}/dish/${restaurantId}`);
    if (result.data.success) {
      setDish(result.data.data);
    }
  };

  const dish_name = async (e) => {
    let query = e.target.value.toUpperCase();
    let result = await axios.get(`${url}dish/${restaurantId}/dish/${restaurantId}`);
    if (result.data.success) {
      let filtered = result.data.data.filter(d => d.name.toUpperCase().includes(query));
      setDish(filtered);
    }
  };

  const add = async (name, restaurant_name, dish_id, price) => {
    const token = localStorage.getItem('token');
    const prevQty = quantities[dish_id] || 0;
    const newQty = prevQty + 1;

    const currentRestaurant = localStorage.getItem('restaurant_id');
    const newRestaurant = restaurantId;

    if (currentRestaurant && currentRestaurant !== newRestaurant) {
      Object.keys(localStorage).forEach(key => {
        if (!isNaN(localStorage.getItem(key))) {
          localStorage.removeItem(key);
        }
      });
      setQuantities({});
      setCount(0);
      dispatch(dishCount(0));
      localStorage.setItem('count', '0');
    }

    localStorage.setItem('restaurant_id', newRestaurant);

    const obj = {
      name,
      restaurant: restaurant_name,
      dish_id,
      token,
      count: newQty,
      price
    };

    const result = await axios.post(`${url}cart/cart`, obj, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (result.data.success) {
      localStorage.setItem(dish_id, newQty);
      setQuantities(prev => ({ ...prev, [dish_id]: newQty }));
      setCount(prev => prev + 1);
    }
  };

  const added = async (name, restaurant, dish_id, price) => {
    const token = localStorage.getItem('token');
    const prevQty = quantities[dish_id] || 0;
    const newQty = prevQty - 1;

    const obj = {
      dish_id,
      token,
      count: Math.max(0, newQty),
      price
    };

    const result = await axios.post(`${url}cart/cart`, obj, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (result.data.success) {
      if (newQty > 0) {
        localStorage.setItem(dish_id, newQty);
        setQuantities(prev => ({ ...prev, [dish_id]: newQty }));
      } else {
        localStorage.removeItem(dish_id);
        setQuantities(prev => {
          const updated = { ...prev };
          delete updated[dish_id];
          return updated;
        });
      }
      setCount(prev => prev - 1);
    }
  };

  useEffect(() => {
    dispatch(dishCount(count));
    localStorage.setItem('count', count);
  }, [count]);

  let interested = async(id) =>{
    const token = localStorage.getItem('token');

    const result = await axios.post(`${url}interested/interested`, {id: id, token: token},{
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }

    })
     console.log(result.data)
    if(result.data.success){
     
      setisIntrested(true)
    }
    else{
      setisIntrested(false)
    }


  }

  return (
    <>
       <div className='fixed z-10 right-4 bottom-24 w-24 h-24 shadow-xl rounded-lg bg-white border border-orange-200'>
        <h1 className='text-sm font-bold text-center pt-1 text-orange-600'>Menu</h1>
        <Swiper 
          effect={'cards'} 
          grabCursor={true} 
          modules={[EffectCards]} 
          className="h-20 w-full"
        >
          {dish?.map(Element => (
            <SwiperSlide 
              className='bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-center text-white font-bold p-1 text-xs' 
              key={Element._id}
            >
              {Element.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='mt-16 pb-16 max-w-4xl mx-auto px-4'>
        {/* Restaurant Header */}
        <div className='p-4 bg-white rounded-xl shadow-md'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>{data?.restaurant_name || ''}</h1>
              <div className='flex items-center mt-2 text-gray-500'>
                <IoLocationOutline className='mr-1' />
                <span className='text-sm'>{data?.address || 'Outlet Vijay Nagar'}</span>
              </div>
            </div>
            <button 
              className='text-2xl p-2'
              onClick={() => interested(data?._id)}
            >
              {isinterested ? (
                <FaHeart className='text-red-500 animate-pulse' />
              ) : (
                <FaRegHeart className='text-red-500 hover:text-red-600' />
              )}
            </button>
          </div>

          {/* Restaurant Info Card */}
          <div className='mt-4 rounded-xl bg-orange-50 p-4 border border-orange-100'>
            <div className='flex items-center mb-3'>
              <div className='bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2'>
                <FaStar className='text-xs' />
              </div>
              <span className='font-bold text-gray-700'>3.11 rating</span>
            </div>
            
            <div className='flex items-center text-gray-600'>
              <MdOutlineDeliveryDining className='mr-2 text-lg' />
              <span className='font-medium'>30-35 min • Free delivery</span>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className='mt-8'>
          <h2 className='text-center text-xl font-bold text-orange-600 mb-6'>Menu</h2>
          
          {/* Search Input */}
          <div className='relative'>
            <input 
              type='text' 
              placeholder='Search any dish...' 
              className='w-full h-12 pl-12 pr-4 rounded-full border border-orange-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all'
              onChange={dish_name}
            />
            <FaSearch className='absolute left-4 top-3.5 text-orange-500 text-lg' />
          </div>

          {/* Dish List */}
          <div className='mt-6 space-y-6'>
            {dish ? dish.map(Element => {
              const qty = quantities[Element._id] || 0;
              return (
                <div 
                  className='bg-white rounded-xl shadow-md overflow-hidden p-4 transition-all hover:shadow-lg'
                  key={Element._id}
                >
                  <div className='flex justify-between'>
                    {/* Dish Info */}
                    <div className='w-2/3 pr-4'>
                      <h3 className='text-lg font-bold text-gray-800'>{Element.name}</h3>
                      
                      <div className='flex items-center mt-2 text-orange-600 font-medium'>
                        <FaRupeeSign className='mr-1' />
                        <span>{Element.price}</span>
                      </div>
                      
                      <div className='flex items-center mt-2 text-yellow-500'>
                        <FaStar className='mr-1 text-sm' />
                        <span className='text-gray-700'>5</span>
                      </div>
                      
                      <p className='mt-3 text-gray-500 text-sm'>
                        {Element.description.substring(0, 90)}
                        {Element.description.length > 90 && (
                          <button className='ml-1 text-orange-500 font-medium'>...More</button>
                        )}
                      </p>
                    </div>
                    
                    {/* Dish Image and Add Button */}
                    <div className='flex flex-col items-end'>
                      <div className='w-24 h-24 rounded-lg overflow-hidden shadow-md mb-3'>
                        <img 
                          src={`data:${Element.type};base64,${Element.image}`} 
                          className='w-full h-full object-cover'
                          alt={Element.name}
                        />
                      </div>
                      
                      {qty > 0 ? (
                        <div className='flex items-center bg-orange-50 rounded-full px-2'>
                          <button 
                            className='text-orange-600 w-8 h-8 flex items-center justify-center hover:bg-orange-100 rounded-full transition-colors'
                            onClick={() => added(Element.name, Element.restaurant_name, Element._id, Element.price)}
                          >
                            -
                          </button>
                          <span className='mx-1 w-6 text-center font-medium'>{qty}</span>
                          <button 
                            className='text-orange-600 w-8 h-8 flex items-center justify-center hover:bg-orange-100 rounded-full transition-colors'
                            onClick={() => add(Element.name, Element.restaurant_name, Element._id, Element.price)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button 
                          className='bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors'
                          onClick={() => add(Element.name, Element.restaurant_name, Element._id, Element.price)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className='flex justify-center py-10'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
