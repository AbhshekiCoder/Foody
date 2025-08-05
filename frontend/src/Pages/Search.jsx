import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dishCount } from '../feature/cart';
import { FaRupeeSign, FaPlus, FaMinus, FaArrowRight, FaSearch, FaTimes } from 'react-icons/fa';
import { setCartDetail } from '../feature/cartDetail.js';
export default function Search() {
    const [data, setData] = useState();
    const [dish, setDish] = useState();
    const [dishes, setDishes] = useState();
    const [count, setCount] = useState(Number(localStorage.getItem('count')) || 0);
    const [quantities, setQuantities] = useState({});
    const [currentRestaurant, setCurrentRestaurant] = useState(localStorage.getItem('restaurant_id') || null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);

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
        setQuantities(getLocalQuantities());
    }, []);

    const clearCartFrontendOnly = () => {
        Object.keys(localStorage).forEach(key => {
            if (!isNaN(localStorage.getItem(key))) {
                localStorage.removeItem(key);
            }
        });
        setQuantities({});
        setCount(0);
        dispatch(dishCount(0));
        localStorage.setItem('count', '0');
    };

    const search = async (e) => {
        let input = e.target.value;
        let obj = { input };
        let result = await axios.post(`${url}search/search`, obj);
        if (result.data.success) {
            setData(result.data.data);
            document.getElementById('message').innerText = '';
            document.querySelector('.search-content').style.display = "block";
            document.querySelector('.dish-content').style.display = "none";
        } else {
            document.getElementById('message').innerText = result.data.message;
        }
    };

    const filter = async (name, id, restaurant_id) => {
        if (name === "restaurant") {
            localStorage.setItem("id", restaurant_id);
            navigate('/restaurant');
        } else {
            let result = await axios.get(`${url}dish_search/${id}/dish_search/${id}`);
            if (result.data.success) {
                setDish(result.data.data);
                document.getElementById('message').innerText = '';
                document.querySelector('.search-content').style.display = "none";
                document.querySelector('.dish-content').style.display = "grid";
            } else {
                document.getElementById('message').innerText = result.data.message;
            }
        }
    };

    const btn = (id) => {
        let result = dish.filter(Element => Element._id === id);
        setDishes(result);
        document.querySelector('.detail').style.display = "block";
    };

    const add = async (name, restaurant_id, dish_id, price) => {
        const token = localStorage.getItem('token');
        if(!token){
            alert("login first");
            return;
        }

        if (currentRestaurant && currentRestaurant !== restaurant_id) {
            clearCartFrontendOnly();
        }

        setCurrentRestaurant(restaurant_id);
        localStorage.setItem('restaurant_id', restaurant_id);

        const prevQty = quantities[dish_id] || 0;
        const newQty = prevQty + 1;

        const obj = {
            name,
            restaurant: restaurant_id,
            dish_id,
            token,
            count: newQty,
            price
        };

        let result = await axios.post(`${url}cart/cart`, obj, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (result.data.success) {
            localStorage.setItem(dish_id, newQty);
            setQuantities(prev => ({ ...prev, [dish_id]: newQty }));
            setCount(prev => prev + 1);
            cartDetail()
        }
    };

    const added = async (name, restaurant_id, dish_id, price) => {
        const token = localStorage.getItem('token');
        const prevQty = quantities[dish_id] || 0;
        const newQty = prevQty - 1;

        const obj = {
            dish_id,
            token,
            count: newQty,
            price
        };

        let result = await axios.post(`${url}cart/cart`, obj, {
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
            cartDetail()
            setCount(prev => prev - 1);

        }
    };

    useEffect(() => {
        dispatch(dishCount(count));
        localStorage.setItem('count', count);
        cartDetail()
    }, [count]);

    function restaurant(id) {
        localStorage.setItem("id", id);
        navigate('/restaurant');
    }
    let cartDetail = async() =>{
           
           let token = localStorage.getItem("token");
           console.log(token)
           try{
           let result = await axios.get(`${url}cartDetail/${token}/cartDetail/${token}`);
           console.log(result)
           if(result.data.success){
               dispatch(setCartDetail({data: result.data.dish, restaurant: result.data.restaurant, total: result.data.total}))
              
             
             
           }else{
            dispatch(setCartDetail(''))
           }
       }catch(err){
           console.log(err.message)
       }
   
       }
      
   

    return (
        <>
           <div className='fixed inset-0 bg-black bg-opacity-50 z-50 hidden detail'>
                <div className='flex items-center justify-center min-h-screen p-4'>
                    <div className='bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden'>
                        <div className='flex justify-end p-4'>
                            <button 
                                className='text-gray-500 hover:text-orange-600 transition-colors'
                                onClick={() => { document.querySelector('.detail').style.display = "none" }}
                            >
                                <FaTimes className='text-xl' />
                            </button>
                        </div>
                        <div className='p-4'>
                            {dishes ? dishes.map(Element => (
                                <div key={Element._id} className='space-y-4'>
                                    <div className='w-full h-64 rounded-xl overflow-hidden'>
                                        <img 
                                            src={`data:${Element.type};base64,${Element.image}`} 
                                            className='w-full h-full object-cover'
                                            alt={Element.name}
                                        />
                                    </div>
                                    <div className='text-xl font-bold text-gray-800'>{Element.name}</div>
                                    <div className='flex items-center text-lg font-bold text-orange-600'>
                                        <FaRupeeSign className='mr-1' /> {Element.price}
                                    </div>
                                    <div className='text-gray-500'>{Element.description}</div>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Search - Enhanced */}
            <div className='mt-24 max-md:px-4 max-md:mt-16'>
                <div className='max-w-3xl mx-auto'>
                    <div className='relative flex items-center border border-orange-300 rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-shadow'>
                        <input 
                            type='text' 
                            className='w-full bg-transparent outline-none pl-2 text-gray-700 placeholder-gray-400'
                            placeholder='Search for restaurants and dishes...' 
                            onChange={search} 
                        />
                        <FaSearch className='text-orange-500 text-xl' />
                    </div>

                    <div className='mt-8'>
                        <div className='message text-center text-lg font-medium text-gray-500 mt-6' id="message"></div>
                        
                        {/* Search Results - Enhanced */}
                        <div className='search-content space-y-4'>
                            {data?.map(Element => (
                                <div 
                                    className='flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer'
                                    onClick={() => filter(Element.description ? 'dish' : 'restaurant', Element.name, Element._id)}
                                    key={Element._id}
                                >
                                    <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                                        <img 
                                            src={`data:${Element.type};base64,${Element.image}`} 
                                            className='w-full h-full object-cover'
                                            alt={Element.description ? Element.name : Element.restaurant_name}
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-lg font-semibold text-gray-800'>
                                            {Element.description ? Element.name : Element.restaurant_name}
                                        </div>
                                        <div className='mt-1 text-sm text-orange-500 font-medium'>
                                            {Element.description ? 'Dish' : 'Restaurant'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dish List - Enhanced */}
                        <div className='dish-content hidden mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {dish?.map(Element => {
                                const qty = quantities[Element._id] || 0;
                                return (
                                    <div 
                                        className='bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1'
                                        key={Element._id}
                                    >
                                        <div className='p-4 border-b border-gray-100 flex justify-between items-center'>
                                            <div className='font-bold text-gray-700'>{Element.restaurant_name}</div>
                                            <button 
                                                className='text-orange-500 hover:text-orange-700 flex items-center'
                                                onClick={() => {
                                                    localStorage.setItem("id", Element.id); 
                                                    navigate('/restaurant')
                                                }}
                                            >
                                                View <FaArrowRight className='ml-2 text-sm' />
                                            </button>
                                        </div>
                                        
                                        <div className='p-4 flex flex-col md:flex-row'>
                                            <div className='md:w-2/3 pr-4'>
                                                <div className='text-lg font-bold text-gray-800'>{Element.name}</div>
                                                <div className='flex items-center mt-2 text-orange-600 font-medium'>
                                                    <FaRupeeSign /> {Element.price}
                                                </div>
                                                <div className='mt-4'>
                                                    <button 
                                                        className='flex items-center text-orange-500 hover:text-orange-700 font-medium'
                                                        onClick={() => btn(Element._id)}
                                                    >
                                                        More Details <FaArrowRight className='ml-2 text-xs' />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className='mt-4 md:mt-0 flex flex-col items-end'>
                                                <div className='w-28 h-28 rounded-lg overflow-hidden shadow-md'>
                                                    <img 
                                                        src={`data:${Element.type};base64,${Element.image}`} 
                                                        className='w-full h-full object-cover'
                                                        alt={Element.name}
                                                    />
                                                </div>
                                                
                                                <div className='mt-4'>
                                                    {qty > 0 ? (
                                                        <div className='flex items-center bg-orange-50 rounded-full px-3 py-1'>
                                                            <button 
                                                                className='text-orange-600 text-xl w-8 h-8 flex items-center justify-center hover:bg-orange-100 rounded-full'
                                                                onClick={() => added(Element.name, Element.id, Element._id, Element.price)}
                                                            >
                                                                <FaMinus className='text-sm' />
                                                            </button>
                                                            <span className='mx-2 text-gray-700 font-bold'>{qty}</span>
                                                            <button 
                                                                className='text-orange-600 text-xl w-8 h-8 flex items-center justify-center hover:bg-orange-100 rounded-full'
                                                                onClick={() => add(Element.name, Element.id, Element._id, Element.price)}
                                                            >
                                                                <FaPlus className='text-sm' />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            className='bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 font-medium transition-colors'
                                                            onClick={() => add(Element.name, Element.id, Element._id, Element.price)}
                                                        >
                                                            Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
