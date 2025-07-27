import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../misc/url';
import { Loader } from 'rsuite';
import { motion } from 'framer-motion';
import { FaUtensils, FaMotorcycle, FaCheckCircle, FaClock } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      let token = localStorage.getItem("token");
      const result = await axios.get(
        `${url}orderFetch/${token}/orderFetch/${token}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (result.data.success) {
        // Ensure price is a number in each order
        const processedOrders = result.data.data.map(order => ({
          ...order,
          price: typeof order.price === 'number' ? order.price : Number(order.price) || 0
        }));
        setOrders(processedOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely format prices
  const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : Number(price) || 0;
    return num.toFixed(2);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'preparing':
        return <GiCook className="text-orange-500 text-xl" />;
      case 'on the way':
        return <FaMotorcycle className="text-blue-500 text-xl" />;
      default:
        return <FaClock className="text-yellow-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'on the way':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getProgressSteps = (status) => {
    const steps = [
      { id: 1, name: 'Order Placed', completed: true },
      { id: 2, name: 'Preparing', completed: status === 'preparing' || status === 'on the way' || status === 'completed' },
      { id: 3, name: 'On the way', completed: status === 'on the way' || status === 'completed' },
      { id: 4, name: 'Delivered', completed: status === 'completed' },
    ];

    return steps;
  };

  return (
    <div className='mt-24 px-4 max-w-5xl mx-auto pb-10'>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-3xl font-bold mb-8 text-center text-orange-600'
      >
        <span className='inline-block mr-2'><FaUtensils /></span>
        My Orders
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size='lg' backdrop content="Loading your delicious orders..." vertical />
        </div>
      ) : (
        <div className='space-y-8'>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-xl font-bold text-gray-800'>Order #{order._id.slice(-6).toUpperCase()}</h2>
                      <p className='text-sm text-gray-500 mt-1'>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-2`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>

                  <div className='mt-6'>
                    <h3 className='font-bold text-gray-700 mb-3 text-lg'>Delivery Address</h3>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <p className='text-gray-700'>{order.address}</p>
                    </div>
                  </div>

                  <div className='mt-6'>
                    <h3 className='font-bold text-gray-700 mb-3 text-lg'>Order Summary</h3>
                    <ul className='space-y-4'>
                      {order.dishes.map((dish, i) => (
                        <li key={i} className='flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0'>
                          <div className='flex items-center'>
                            <div className='w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3'>
                              {dish.image ? (
                                <img src={dish.image} alt={dish.name} className='w-full h-full object-cover' />
                              ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                  <FaUtensils />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className='font-medium text-gray-800'>{dish.name}</p>
                              <p className='text-sm text-gray-500'>Quantity: {dish.count}</p>
                            </div>
                          </div>
                          <p className='font-semibold text-gray-800'>₹{formatPrice(dish.price * dish.count)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-6 pt-4 border-t border-gray-200'>
                    <div className='flex justify-between items-center mb-4'>
                      <p className='font-bold text-gray-700'>Subtotal</p>
                      <p className='text-gray-700'>₹{formatPrice(order.price)}</p>
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                      <p className='font-bold text-gray-700'>Delivery Fee</p>
                      <p className='text-gray-700'>₹{(order.price > 200 ? 0 : 30).toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='font-bold text-lg text-gray-800'>Total Amount</p>
                      <p className='font-bold text-lg text-orange-600'>₹{formatPrice(order.price + (order.price > 200 ? 0 : 30))}</p>
                    </div>
                  </div>

                  <div className='mt-8'>
                    <h3 className='font-bold text-gray-700 mb-3 text-lg'>Order Status</h3>
                    <div className='relative'>
                      <div className='flex justify-between mb-2'>
                        {getProgressSteps(order.status).map((step) => (
                          <div key={step.id} className='flex flex-col items-center w-1/4'>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                              {step.id}
                            </div>
                            <span className={`text-xs mt-1 text-center ${step.completed ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className='absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10'>
                        <div 
                          className={`h-1 bg-orange-500 transition-all duration-500 ease-in-out ${
                            order.status === 'completed' ? 'w-full' : 
                            order.status === 'on the way' ? 'w-2/3' : 
                            order.status === 'preparing' ? 'w-1/3' : 'w-0'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {order.status !== 'completed' && (
                  <div className='bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end'>
                    <button className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200'>
                      Track Order
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-center py-16'
            >
              <div className='max-w-md mx-auto'>
                <div className='w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <FaUtensils className='text-orange-500 text-5xl' />
                </div>
                <h3 className='text-2xl font-bold text-gray-700 mb-2'>No orders yet</h3>
                <p className='text-gray-500 mb-6'>You haven't placed any orders yet. Let's order something delicious!</p>
                <button 
                  className='px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200'
                  onClick={() => window.location.href = '/menu'}
                >
                  Browse Menu
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}