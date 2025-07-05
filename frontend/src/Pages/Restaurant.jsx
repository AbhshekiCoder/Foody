import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { dishCount } from '../feature/cart';

export default function Restaurant() {
  const [data, setData] = useState();
  const [dish, setDish] = useState();
  const [quantities, setQuantities] = useState({});
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();

  const getLocalQuantities = () => {
    const stored = {};
    Object.keys(localStorage).forEach(key => {
      if (!isNaN(localStorage.getItem(key))) {
        stored[key] = Number(localStorage.getItem(key));
      }
    });
    return stored;
  };

  useEffect(() => {
    restaurant();
    dish_fetch();
    setQuantities(getLocalQuantities());
  }, []);

  const restaurant = async () => {
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}restaurant/${id}/restaurant/${id}`);
    if (result.data.success) {
      setData(result.data.data);
    }
  };

  const dish_fetch = async () => {
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}dish/${id}/dish/${id}`);
    if (result.data.success) {
      setDish(result.data.data);
    }
  };

  const dish_name = async (e) => {
    let dish1 = e.target.value.toUpperCase();
    let id = localStorage.getItem("id");
    let result = await axios.get(`${url}dish/${id}/dish/${id}`);
    if (result.data.success) {
      let result1 = result.data.data.filter(Element => Element.name.toUpperCase().includes(dish1));
      setDish(result1);
    }
  };

  const add = async (name, restaurant, dish_id, price) => {
    const token = localStorage.getItem('token');
    const prevQty = quantities[dish_id] || 0;
    const newQty = prevQty + 1;
    const updatedCart = cart + 1;

    const obj = {
      name,
      restaurant,
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
      dispatch(dishCount(updatedCart));
      localStorage.setItem('count', updatedCart);
    }
  };

  const added = async (name, restaurant, dish_id, price) => {
    const token = localStorage.getItem('token');
    const prevQty = quantities[dish_id] || 0;
    const newQty = prevQty - 1;
    const updatedCart = newQty > 0 ? cart - 1 : cart - prevQty;

    if (newQty <= 0) {
      localStorage.removeItem(dish_id);
    } else {
      localStorage.setItem(dish_id, newQty);
    }

    const obj = {
      dish_id,
      token,
      count: Math.max(newQty, 0),
      price
    };

    const result = await axios.post(`${url}cart/cart`, obj, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (result.data.success) {
      setQuantities(prev => {
        const updated = { ...prev };
        if (newQty <= 0) {
          delete updated[dish_id];
        } else {
          updated[dish_id] = newQty;
        }
        return { ...updated };
      });

      dispatch(dishCount(updatedCart));
      localStorage.setItem('count', updatedCart);
    }
  };

  return (
    <>
      <div className='max-w-24 h-24 absolute fixed' style={{ marginLeft: "83%", top: "70%" }}>
        <h1 className='text-lg flex justify-center'>Menu</h1>
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper w-full h-full">
          {dish ? dish.map(Element => (
            <SwiperSlide className='bg-green-500 rounded-lg flex text-center items-center text-white font-bold p-1' key={Element._id}>
              {Element.name}
            </SwiperSlide>
          )) : ''}
        </Swiper>
      </div>

      <div className='mt-16'>
        <div className='max-w-4xl m-auto'>
          <div className='p-3'>
            <div className='text-xl font-bold'>{data ? data.restaurant_name : ''}</div>
            <div className='rounded-md mt-6 shadow-lg p-3'>
              <div className='font-bold'>
                <i className="fa-solid fa-star rounded-circle p-1 bg-green-500 text-white mr-3"></i>3.11 rating
              </div>
              <div className='mt-6'>Outlet Vijay Nagar</div>
              <div className='mt-6 font-bold'>30 - 35 min</div>
            </div>
          </div>

          <div className='mt-16'>
            <div className='flex justify-center text-lg text-gray-400'>Menu</div>
            <div className='border flex rounded-lg bg-gray-100 p-1 items-center'>
              <input type='text' placeholder='search any dishes' className='w-11/12 h-10 outline-none bg-gray-100' onChange={dish_name} />
              <i className="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-6"></i>
            </div>

            <div className='mt-6 p-3 border-b-2'>
              {dish ? dish.map(Element => {
                const qty = quantities[Element._id] || 0;
                return (
                  <div className='flex justify-between p-3 pb-6 border-b-2' key={Element._id}>
                    <div>
                      <div className='text-lg font-bold text-gray-600'>{Element.name}</div>
                      <div className='mt-6'><i className="fa-solid fa-indian-rupee-sign mr-3"></i>{Element.price}</div>
                      <div className='mt-6'><i className="fa-solid fa-star text-green-600 text-sm mr-3"></i>5</div>
                      <div className='mt-3 text-gray-400 font-bold'>
                        {Element.description.substring(0, 90)}<button className='ml-3 text-gray-600'>...More</button>
                      </div>
                    </div>

                    <div className='flex flex-col items-center'>
                      <div className='mb-3'>
                        {qty > 0 ? (
                          <div className='btn w-32 h-9 bg-white m-auto font-bold text-lg flex justify-between items-center shadow-md'>
                            <button className='text-green-400 text-2xl' onClick={() => add(Element.name, Element.restaurant_name, Element._id, Element.price)}>+</button>
                            <p className='text-gray-500'>{qty}</p>
                            <button className='text-green-400 text-2xl' onClick={() => added(Element.name, Element.restaurant_name, Element._id, Element.price)}>-</button>
                          </div>
                        ) : (
                          <button className='text-green-600 border rounded-md w-32 h-9 bg-white font-bold text-lg'
                            onClick={() => add(Element.name, Element.restaurant_name, Element._id, Element.price)}>
                            Add
                          </button>
                        )}
                      </div>
                      <div className='w-36 h-36 rounded-lg'>
                        <img src={`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-lg object-cover' />
                      </div>
                    </div>
                  </div>
                );
              }) : <Loader />}
            </div>
          </div>
        </div>
        <div className='message text-xl font-bold flex justify-center'></div>
      </div>
    </>
  );
}
