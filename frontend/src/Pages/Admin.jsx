import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../misc/url.js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiPlusCircle, FiUpload, FiPhone } from 'react-icons/fi';
import { FaUtensils, FaStore } from 'react-icons/fa';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Admin() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchAdmin()
    
      document.querySelector(".navbar").style.display = "none"
    
  }, []);



  const fetchOrders = async () => {
    try {
      let token = localStorage.getItem("admin");
      const result = await axios.get(`${url}admin/order/${token}`);
      if (result.data.success) {
        // Process orders to ensure price is a number
        const processedOrders = result.data.data.map(order => ({
          ...order,
          price: typeof order.price === 'number' ? order.price : Number(order.price) || 0,
          // Ensure dishes have proper prices too
          dishes: order.dishes.map(dish => ({
            ...dish,
            price: typeof dish.price === 'number' ? dish.price : Number(dish.price) || 0
          }))
        }));
        setOrders(processedOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAdmin = async() =>{
    const id = localStorage.getItem("admin")
    try{
    const result  =  await axios.get(`${url}admin/data/${id}` );
    if(result.data.success){
      setRestaurant(result.data.data)
      console.log(result.data.data)
    }
  }catch(err){
    console.log(err.message)
  }
  }
  // Helper function to safely format prices
  const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : Number(price) || 0;
    return num.toFixed(2);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    
    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("file", file);
    formData.append("id", localStorage.getItem('admin'));
    formData.append("price", form.price.value);
    formData.append("type", file.type);

    try {
      const result = await axios.post(`${url}dish_fetch/dish_fetch`, formData);
      alert(result.data.message);
      if (result.data.success) {
        form.reset();
        setPreview(null);
      }
    } catch (error) {
      alert("Failed to add dish. Please try again.");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const result = await axios.put(`${url}admin/orders/${orderId}`, { status });
      if (result.data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'on the way': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className='admin min-h-screen bg-gray-50'>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex justify-between items-center h-16 px-6 bg-white shadow-sm sticky top-0 z-10'
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className='flex items-center font-bold text-xl text-orange-600'
        >
          <FaUtensils className='mr-2' />
          <span>Foody Admin</span>
        </motion.div>
        
        <div className='flex items-center space-x-4'>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className='flex items-center text-orange-500 font-semibold'
          >
            <FaStore className='mr-2' />
            <span>{restaurant?restaurant.restaurant_name:''}</span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center text-gray-700 font-medium'
            onClick={() => { localStorage.removeItem("admin"); navigate('/'); }}
          >
            <FiLogOut className='mr-1' />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList className="flex border-b border-gray-200 mb-6">
            <Tab className="px-4 py-2 font-medium text-gray-600 cursor-pointer focus:outline-none">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={activeTab === 0 ? 'text-orange-600 border-b-2 border-orange-600' : ''}
              >
                Add Dish
              </motion.div>
            </Tab>
            <Tab className="px-4 py-2 font-medium text-gray-600 cursor-pointer focus:outline-none">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={activeTab === 1 ? 'text-orange-600 border-b-2 border-orange-600' : ''}
              >
                Manage Orders
              </motion.div>
            </Tab>
          </TabList>

          {/* Add Dish Tab */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-xl shadow-md overflow-hidden'
            >
              <div className='p-8'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2'>Add New Dish</h1>
                <p className='text-gray-600 mb-6'>Fill in the details of your delicious dish</p>
                
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Dish Name</label>
                        <input 
                          type='text' 
                          name='name' 
                          required
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
                        />
                      </div>
                      
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                        <textarea 
                          name='description' 
                          rows={4}
                          required
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price (₹)</label>
                        <input 
                          type='number' 
                          name='price' 
                          min="0"
                          step="0.01"
                          required
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
                        />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Dish Image</label>
                      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                        <div className='space-y-1 text-center'>
                          {preview ? (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className='relative'
                            >
                              <img src={preview} alt="Preview" className='mx-auto h-40 rounded-lg object-cover' />
                              <button
                                type='button'
                                onClick={() => { setPreview(null); setFile(null); }}
                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                              >
                                ×
                              </button>
                            </motion.div>
                          ) : (
                            <>
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label className='relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none'>
                                  <span>Upload a file</span>
                                  <input 
                                    type='file' 
                                    className='sr-only' 
                                    onChange={handleImageChange}
                                    accept='image/*'
                                    required
                                  />
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>PNG, JPG up to 5MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex justify-end'>
                    <motion.button
                      type='submit'
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-sm hover:bg-orange-700 focus:outline-none'
                    >
                      <FiPlusCircle className='mr-2' />
                      Add Dish
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </TabPanel>

          {/* Manage Orders Tab */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-xl shadow-md overflow-hidden'
            >
              <div className='p-6'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2'>Manage Orders</h1>
                <p className='text-gray-600 mb-6'>View and update order status</p>
                
                {loading ? (
                  <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
                  </div>
                ) : (
                  <div className='space-y-6'>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <motion.div
                          key={order._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow'
                        >
                          <div className='p-5'>
                            <div className='flex justify-between items-start'>
                              <div>
                                <h3 className='text-lg font-semibold text-gray-800'>Order #{order._id.slice(-6).toUpperCase()}</h3>
                                <p className='text-sm text-gray-500'>
                                  {new Date(order.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </div>
                            </div>
                            
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
                              <div>
                                <h4 className='text-sm font-medium text-gray-500'>Customer</h4>
                                <p className='text-gray-800'>{order.user?.userName || order.user?.email || 'N/A'}</p>
                                {order.user?.phone && (
                                  <div className='flex items-center mt-1 text-sm text-gray-600'>
                                    <FiPhone className='mr-1' />
                                    <span>{order.user.phone}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className='text-sm font-medium text-gray-500'>Delivery Address</h4>
                                <p className='text-gray-800'>{order.address || 'N/A'}</p>
                              </div>
                              <div>
                                <h4 className='text-sm font-medium text-gray-500'>Total Amount</h4>
                                <p className='text-orange-600 font-semibold'>₹{formatPrice(order.price)}</p>
                              </div>
                            </div>
                            
                            <div className='mt-4'>
                              <h4 className='text-sm font-medium text-gray-500 mb-2'>Items Ordered</h4>
                              <ul className='divide-y divide-gray-200'>
                                {order.dishes.map((dish, i) => (
                                  <li key={i} className='py-2 flex justify-between'>
                                    <div>
                                      <p className='text-gray-800'>{dish.name}</p>
                                      <p className='text-sm text-gray-500'>Qty: {dish.count}</p>
                                    </div>
                                    <p className='text-gray-800'>₹{formatPrice(dish.price * dish.count)}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className='mt-4 pt-4 border-t border-gray-200'>
                              <h4 className='text-sm font-medium text-gray-500 mb-2'>Update Status</h4>
                              <div className='flex flex-wrap gap-2'>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => updateOrderStatus(order._id, 'preparing')}
                                  className={`px-3 py-1 rounded-full text-sm ${order.status === 'preparing' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800'}`}
                                >
                                  Preparing
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => updateOrderStatus(order._id, 'on the way')}
                                  className={`px-3 py-1 rounded-full text-sm ${order.status === 'on the way' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
                                >
                                  On the Way
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => updateOrderStatus(order._id, 'completed')}
                                  className={`px-3 py-1 rounded-full text-sm ${order.status === 'completed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
                                >
                                  Completed
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className='text-center py-12'>
                        <div className='mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4'>
                          <FaUtensils className='text-orange-500 text-3xl' />
                        </div>
                        <h3 className='text-lg font-medium text-gray-800'>No orders yet</h3>
                        <p className='text-gray-500 mt-1'>When customers place orders, they'll appear here.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}