import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dishCount } from '../feature/cart';

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
            setCount(prev => prev - 1);
        }
    };

    useEffect(() => {
        dispatch(dishCount(count));
        localStorage.setItem('count', count);
    }, [count]);

    function restaurant(id) {
        localStorage.setItem("id", id);
        navigate('/restaurant');
    }

    return (
        <>
            {/* Modal */}
            <div className='modal detail w-100 h-100 hidden'>
                <div className='w-full h-full flex justify-center items-center border'>
                    <div className='bg-white w-96 h-fit rounded-md p-3'>
                        <div className='flex justify-end'>
                            <i className="fa-solid fa-xmark text-gray-500 text-xl" onClick={() => { document.querySelector('.detail').style.display = "none" }}></i>
                        </div>
                        <div>
                            {dishes ? dishes.map(Element => (
                                <div key={Element._id}>
                                    <div className='w-full h-60'>
                                        <img src={`data:${Element.type};base64,${Element.image}`} className='w-full h-full' />
                                    </div>
                                    <div className='mt-6 text-lg font-bold'>{Element.name}</div>
                                    <div className='text-lg font-bold'>
                                        <i className="fa-solid fa-indian-rupee-sign mr-3"></i> {Element.price}
                                    </div>
                                    <div className='text-gray-400 font-bold'>{Element.description}</div>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Search */}
            <div className='mt-36 max-md:p-3'>
                <div className='max-w-3xl m-auto flex border items-center rounded-md p-2'>
                    <input type='text' className='w-11/12 h-6 outline-none pl-3' placeholder='search for restaurant and dish' onChange={search} />
                    <i className="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-6"></i>
                </div>

                <div className='mt-6 max-w-3xl m-auto'>
                    <div className='mt-3 search-content'>
                        {data ? data.map(Element => (
                            <div className='flex mt-6 hover:bg-blue-100 hover:cursor-pointer' onClick={() => filter(Element.description ? 'dish' : 'restaurant', Element.name, Element._id)} key={Element._id}>
                                <div className='w-16 h-16'>
                                    <img src={`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-md' />
                                </div>
                                <div className='ml-6'>
                                    <div className='text-lg'>{Element.description ? Element.name : Element.restaurant_name}</div>
                                    <div className='mt-3 text-gray-400'>{Element.description ? 'dish' : 'restaurant'}</div>
                                </div>
                            </div>
                        )) : ''}
                    </div>

                    {/* Dish List */}
                    <div className='dish-content bg-blue-100 grid grid-cols-2 hidden mt-6 p-3 max-sm:grid-cols-1' style={{ columnGap: "20px", rowGap: "20px" }}>
                        {dish ? dish.map(Element => {
                            const qty = quantities[Element._id] || 0;
                            return (
                                <div className='p-3 bg-white rounded-2xl shadow-lg' key={Element._id}>
                                    <div className='flex justify-between border-b-2 border-dotted pb-3'>
                                        <div className='text-lg font-bold text-gray-500'>{Element.restaurant_name}</div>
                                        <i className="fa-solid fa-arrow-right mr-3 hover:cursor-pointer" onClick={() =>{localStorage.setItem("id", Element.id); navigate('/restaurant')}}></i>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <div className='mt-3 text-lg font-bold'>{Element.name}</div>
                                            <div className='mt-3'>
                                                <i className="fa-solid fa-indian-rupee-sign mr-3"></i>{Element.price}
                                            </div>
                                            <div className='mt-3'>
                                                <button className='border rounded-xl flex p-1 items-center text-sm' onClick={() => btn(Element._id)}>More Details <i className="fa-solid fa-arrow-right ml-3 text-sm"></i></button>
                                            </div>
                                        </div>
                                        <div className='p-3 flex flex-col items-center'>
                                            <div className='mb-2'>
                                                {qty > 0 ? (
                                                    <div className='w-36 h-9 bg-white font-bold text-lg flex justify-between items-center shadow-md p-2'>
                                                        <button className='text-green-400 text-2xl' onClick={() => added(Element.name, Element.id, Element._id, Element.price)}>-</button>
                                                        <p className='text-gray-500'>{qty}</p>
                                                        <button className='text-green-400 text-2xl' onClick={() => add(Element.name, Element.id, Element._id, Element.price)}>+</button>
                                                    </div>
                                                ) : (
                                                    <button className='text-green-600 border rounded-md w-36 h-9 bg-white font-bold text-lg' onClick={() => add(Element.name, Element.id, Element._id, Element.price)}>Add</button>
                                                )}
                                            </div>
                                            <div className='w-40 h-40 rounded-lg'>
                                                <img src={`data:${Element.type};base64,${Element.image}`} className='w-full h-full rounded-lg object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : ''}
                    </div>

                    {/* Message */}
                    <div className='message text-xl font-bold text-gray-400 mt-6 flex justify-center' id="message"></div>
                </div>
            </div>
        </>
    );
}
