import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Drawer } from 'rsuite';
import { useDispatch } from 'react-redux';
import url from '../misc/url.js';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { locationinfo } from '../feature/location';
import axios from 'axios';
import { userinfo } from '../feature/userinfo'; 
import { motion } from 'framer-motion';
import { FaUtensils, FaCheckCircle } from 'react-icons/fa';

export default function DashBoard() {
  let user = useSelector((state) => state.name.value);
  let location = useSelector((state) => state.location.value);
  
  let [drawer1, setDrawer1] = useState(false);
  let [drawer2, setDrawer2] = useState(false);
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  const api = "AIzaSyB3Et0gdbu18Id43ibuYkD1Ggd3hVHkono";
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  const [selectPosition, setSelectPosition] = useState(null);
  const [orders, setOrders] = useState();
  const [dropdownOption, setDropdownOption] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("Fetching address...");
  const dispatch = useDispatch();

  
  const [activeTab, setActiveTab] = useState('address'); // Track active tab for mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
  // Mobile detection

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, []);

  const getAddressFromLatLng = async (lat, lng) => {
    const connect = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    
    try {
      const response = await fetch(connect);
      const data = await response.json();
      if (data) {
        dispatch(locationinfo(data.display_name));
        setSelectedAddress(data);
        let token = localStorage.getItem('token');
        let obj = {
          token: token,
          address: data.display_name
        };
        
        let result = await axios.post(
          `${url}profileUpdated/profileUpdated`,
          obj,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
      } else {
        setSelectedAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setSelectedAddress("Error fetching address");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setSelectPosition(userLocation);
          setDropdownOption([{ lat: latitude, lng: longitude }]);
        },
        () => {
          console.log("location access denied");
        }
      );
    }
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newLocation = { lat, lng };
    setSelectPosition(newLocation);
    setDropdownOption((prev) => [...prev, newLocation]);
    getAddressFromLatLng(lat, lng);
  };

  const phone_edit = (e) => {
    setPhone(e.target.value);
  };
  
  const phone_submit = async () => {
    let token = localStorage.getItem("token");
    let obj = {
      token: token,
      phone: phone
    };
    let result = await axios.post(
      `${url}profileUpdated/profileUpdated`,
      obj,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (result.data.success) {
      alert(result.data.message);
      dispatch(userinfo(result.data.data));
    }
  };

  const email_edit = (e) => {
    setEmail(e.target.value);
  };

  const email_submit = async () => {
    let token = localStorage.getItem("token");
    let obj = {
      token: token,
      email: email
    };
    let result = await axios.post(
      `${url}profileUpdated/profileUpdated`,
      obj,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (result.data.success) {
      alert(result.data.message);
      dispatch(userinfo(result.data.data));
    }
  };
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
          const processedOrders = result.data.data.filter(order => order.status === "completed");
          setOrders(processedOrders);
          console.log(processedOrders)
        }
      } catch (err) {
        console.error(err);
      } finally {
        
      }
    };
    useEffect(()=>{
      fetchOrders()

    },[])
  

  const renderMobileTabs = () => (
    <div className="md:hidden flex overflow-x-auto border-b mb-4">
      <button
        className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-orange-500 font-bold' : ''}`}
        onClick={() => setActiveTab('orders')}
      >
        <i className="fa-solid fa-bag-shopping mr-2"></i>Orders
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'favorites' ? 'border-b-2 border-orange-500 font-bold' : ''}`}
        onClick={() => setActiveTab('favorites')}
      >
        <i className="fa-solid fa-heart mr-2"></i>Favorites
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'address' ? 'border-b-2 border-orange-500 font-bold' : ''}`}
        onClick={() => setActiveTab('address')}
      >
        <i className="fa-solid fa-map-pin mr-2"></i>Address
      </button>
    </div>
  );
   const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : Number(price) || 0;
    return num.toFixed(2);
  };

  return (
    <> 
      <div className='w-full h-full pt-10' style={{backgroundColor: "rgb(55,113,142)"}}>
        <div className='max-w-7xl m-auto px-4'>
          <div className='p-6'>
            <div className='flex justify-between text-white'>
              <div>
                <div className='text-xl font-bold'>{user ? user.name.toUpperCase() : ''}</div>
                <div className='font-bold'>{user ? user.phone : ''}</div>
              </div>
              <div>
                <button 
                  className='border p-2 font-bold hover:bg-white hover:text-sky-700 text-sm md:text-base'
                  onClick={() => setDrawer2(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className='bg-white p-4 md:p-6'>
            {renderMobileTabs()}
            
            <div className='flex flex-col md:flex-row'>
              {/* Sidebar - hidden on mobile when not active */}
              {(!isMobile || activeTab === null) && (
                <div className='w-full md:w-64 pl-0 md:pl-6 pt-4 md:pt-10 border md:block' 
                     style={{backgroundColor: "rgb(237,241,247)"}}>
                  <div 
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'orders' ? 'bg-white' : 'text-gray-600 hover:text-black'} hover:cursor-pointer`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="fa-solid fa-bag-shopping mr-3 rounded-circle w-6 h-6 flex justify-center items-center bg-gray-600 text-white"></i>
                    <span className="hidden md:inline">Orders</span>
                  </div>
                 
                  <div 
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'favorites' ? 'bg-white' : 'text-gray-600 hover:text-black'} hover:cursor-pointer`}
                    onClick={() => setActiveTab('favorites')}
                  >
                    <i className="fa-solid fa-heart mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Favorites</span>
                  </div>
                  <div className='p-4 md:p-6 flex items-center font-bold text-gray-600 hover:text-black hover:cursor-pointer'>
                    <i className="fa-solid fa-wallet mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Payments</span>
                  </div>
                  <div 
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'address' ? 'bg-white' : 'text-gray-600 hover:text-black'} hover:cursor-pointer`}
                    onClick={() => setActiveTab('address')}
                  >
                    <i className="fa-solid fa-map-pin mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Addresses</span>
                  </div>
                  <div className='p-4 md:p-6 flex items-center font-bold text-gray-600 hover:text-black hover:cursor-pointer'>
                    <i className="fa-solid fa-gear mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Settings</span>
                  </div>
                </div>
              )}
              
              {/* Main Content */}
              {/* Address Tab */}
              <div className={`flex-1 p-4 md:p-6 ${ activeTab !== 'address' ? 'hidden' : 'block'}`}>
                <p className='text-2xl font-bold mb-6'>Manage Address</p>
                <div className='border p-3 flex w-full max-w-md'>
                  <div>
                    <i className="fa-solid fa-house text-lg"></i>
                  </div>
                  <div className='ml-4 md:ml-6'>
                    <div className='text-lg font-bold'>Home</div>
                    <div className='mt-2 text-sm md:text-base'>{location}</div>
                    <div className='flex mt-2'>
                      <button 
                        className='text-orange-500 font-bold text-sm md:text-base'
                        onClick={() => setDrawer1(true)}
                      >
                        Edit
                      </button>
                      <button className='text-orange-500 font-bold text-sm md:text-base ml-3'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Orders Tab */}
               <div className={`flex-1 p-4 md:p-6 ${ activeTab !== 'orders' ? 'hidden' : 'block'}`}>
                <p className='text-2xl font-bold mb-6'>Manage Orders</p>
                <div className='space-y-8  h-96 overflow-y-auto'>
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
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800  flex items-center gap-2`}>
                      <FaCheckCircle className="text-green-500 text-xl" />
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

                 
                </div>

              
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
                
               </div>
             </div>
      </div>
      </div>
      </div>
      
     
     
     
      {/* Drawers */}
      <Drawer open={drawer1} onClose={() => setDrawer1(false)} placement={isMobile ? 'bottom' : 'left'} size={isMobile ? 'sm' : 'md'}>
        <Drawer.Body className="p-4">
          <h6 className='font-bold mb-4'>Save Delivery Address</h6>
          <LoadScript googleMapsApiKey={api}>
            <div>
              <select 
                onChange={(e) => {
                  const [lat, lng] = e.target.value.split(", ").map(Number);
                  setSelectPosition({lat, lng});
                }} 
                className='w-full p-2 mb-4 border'
              >
                {dropdownOption.map((loc, index) => (
                  <option key={index} value={`${loc.lat}, ${loc.lng}`}>
                    {`Lat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}`}
                  </option>
                ))}
              </select>
              
              <div style={{height: "300px", width: "100%"}}>
                <GoogleMap
                  mapContainerStyle={{height: "100%", width: "100%"}}
                  center={selectPosition || defaultCenter}
                  zoom={13}
                  onClick={handleMapClick}
                >
                  {selectPosition && <Marker position={selectPosition} />}
                </GoogleMap>
              </div>
              
              <p className='mt-4'>
                Selected Location:{" "}
                {selectPosition
                  ? `${selectPosition.lat.toFixed(4)}, ${selectPosition.lng.toFixed(4)}`
                  : "None"}
              </p>
            </div>
          </LoadScript>
          
          <div className='border p-3 mt-4'>
            {location}
          </div>
          
          <button 
            className='mt-4 bg-orange-600 text-white font-bold w-full h-10'
            onClick={() => setDrawer1(false)}
          >
            Save Address and Proceed
          </button>
        </Drawer.Body>
      </Drawer>
      
      <Drawer open={drawer2} onClose={() => setDrawer2(false)} size={isMobile ? 'xs' : 'sm'}>
        <Drawer.Body className='p-4'>
          <h6 className='text-lg font-bold'>Edit Profile</h6>
          
          <div className='mt-6'>
            <p className='text-lg'>Phone Number</p>
            <div className='phone flex justify-between items-center mt-4 border-b pb-4'>
              <div>{user?.phone}</div>
              <button 
                className='text-orange-500 font-bold text-sm md:text-base'
                onClick={() => {
                  document.querySelector('.phone').style.display = "none";
                  document.getElementById("phone").style.display = "block";
                }}
              >
                Change
              </button>
            </div>
            
            <div id="phone" className='hidden mt-4'>
              <input 
                type='number' 
                placeholder='Number' 
                maxLength={10}
                onChange={phone_edit}
                className='p-3 border w-full mt-2'
              />
              <button 
                className='w-full h-10 bg-orange-600 text-white font-bold mt-3'
                onClick={phone_submit}
              >
                Verify
              </button>
            </div>
          </div>
          
          <div className='mt-6'>
            <p className='text-lg'>Email</p>
            <div className='email flex justify-between items-center mt-4 border-b pb-4'>
              <div>{user?.email}</div>
              <button 
                className='text-orange-500 font-bold text-sm md:text-base'
                onClick={() => {
                  document.querySelector('.email').style.display = "none";
                  document.getElementById("email").style.display = "block";
                }}
              >
                Change
              </button>
            </div>
            
            <div id="email" className='hidden mt-4'>
              <input 
                type='email' 
                placeholder='Email' 
                onChange={email_edit}
                className='p-3 border w-full mt-2'
              />
              <button 
                className='w-full h-10 bg-orange-600 text-white font-bold mt-3'
                onClick={email_submit}
              >
                Verify
              </button>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}