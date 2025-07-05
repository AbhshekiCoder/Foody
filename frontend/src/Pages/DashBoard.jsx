import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Drawer } from 'rsuite';
import { useDispatch } from 'react-redux';
import url from '../misc/url.js';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { locationinfo } from '../feature/location';
import axios from 'axios';
import { userinfo } from '../feature/userinfo';

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
  const [dropdownOption, setDropdownOption] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("Fetching address...");
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('address'); // Track active tab for mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobile detection

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
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'orders' ? 'bg-white' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="fa-solid fa-bag-shopping mr-3 rounded-circle w-6 h-6 flex justify-center items-center bg-gray-600 text-white"></i>
                    <span className="hidden md:inline">Orders</span>
                  </div>
                  <div className='p-4 md:p-6 flex items-center font-bold'>
                    Diggy One
                  </div>
                  <div 
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'favorites' ? 'bg-white' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => setActiveTab('favorites')}
                  >
                    <i className="fa-solid fa-heart mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Favorites</span>
                  </div>
                  <div className='p-4 md:p-6 flex items-center font-bold text-gray-600 hover:text-black'>
                    <i className="fa-solid fa-wallet mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Payments</span>
                  </div>
                  <div 
                    className={`p-4 md:p-6 flex items-center font-bold ${activeTab === 'address' ? 'bg-white' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => setActiveTab('address')}
                  >
                    <i className="fa-solid fa-map-pin mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>
                    <span className="hidden md:inline">Addresses</span>
                  </div>
                  <div className='p-4 md:p-6 flex items-center font-bold text-gray-600 hover:text-black'>
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