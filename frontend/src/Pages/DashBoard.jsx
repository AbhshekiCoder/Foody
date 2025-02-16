import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Drawer} from 'rsuite'
import Location from '../misc/Location';
import { useDispatch } from 'react-redux';
import url from '../misc/url';
import {GoogleMap, Marker, LoadScript} from '@react-google-maps/api'
import { locationinfo } from '../feature/location';
import axios from 'axios';
import { userinfo } from '../feature/userinfo';


export default function DashBoard() {
  let user = useSelector((state) => state.name.value);
  let location = useSelector((state) => state.location.value)
  
  let [drawer1, setDrawer1] = useState(false);
  let [drawer2, setDrawer2] = useState(false);
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState()
  const api = "AIzaSyB3Et0gdbu18Id43ibuYkD1Ggd3hVHkono";
    const defaultCenter = { lat: 20.5937, lng: 78.9629};
    const [selectPosition, setSelectPosition] = useState(null);
    const[dropdownOption , setDropdownOption] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("Fetching address...");
    const dispatch = useDispatch()
    const mapContainerStyle = {
        height: "400px",
        width: "100%",
      };
      const getAddressFromLatLng = async (lat, lng) => {
        const connect = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
        
        try {
          const response = await fetch(connect);
          const data = await response.json();
          console.log(data)
          if (data) {
           
            dispatch(locationinfo(data.display_name));
            setSelectedAddress(data)
            let token = localStorage.getItem('token');
            let obj = {
              token: token,
              address: data.display_name
            }
          
            let result = await axios.post(
              `${url}profileUpdated/profileUpdated`,
              obj,
              {
                headers:{
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
                } 
               
                
              },
             
             )
          } else {
            setSelectedAddress("Address not found");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setSelectedAddress("Error fetching address");
        }
      };
    useEffect(() =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (pos) =>{
                    const {latitude, longitude} = pos.coords;
                    const userLocation = {lat: latitude, lng: longitude};
                    setSelectPosition(userLocation);

                    
                    setDropdownOption([{lat: latitude, lng: longitude }])
                },
                () =>{
                    console.log("location access denied")
                }

            )
        }

    },[])
    const handleMapClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newLocation = { lat, lng };
      setSelectPosition(newLocation);
      setDropdownOption((prev) => [...prev, newLocation]);
      getAddressFromLatLng(lat, lng)
      console.log(selectedAddress)
    };
    let phone_edit = (e) =>{
      setPhone(e.target.value)
      

    }
    
    let phone_submit = async() =>{
      let token = localStorage.getItem("token")
      let obj = {
        token: token,
        phone: phone
      }
      let result = await axios.post(
        `${url}profileUpdated/profileUpdated`,
        obj,
        {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
         
          
        },
       
       )
       if(result.data.success){
        alert(result.data.message);
        console.log(result.data.data)
        dispatch(userinfo(result.data.data))
        
       }

    }
    let email_edit = (e) =>{
      setEmail(e.target.value)
    }
    let email_submit = async() =>{
      let token = localStorage.getItem("token")
      let obj = {
        token: token,
        email: email
      }
      let result = await axios.post(
        `${url}profileUpdated/profileUpdated`,
        obj,
        {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
         
          
        },
       
       )
       if(result.data.success){
        alert(result.data.message);
        dispatch(userinfo(result.data.data))
        
       }

    }
  return (
    <> 
    <div className='w-full h-full pt-10 ' style={{backgroundColor: "rgb(55,113,142)"}}>
     <div className=' max-w-7xl m-auto'>
     <div className='p-6 '>
     <div className='flex justify-between text-white'>
     <div className=''>
     <div className='text-xl font-bold'>{user?user.name.toUpperCase():''}</div>
     <div className=' font-bold'>{user?user.phone:''}</div>
     

     </div>
     <div>
      <button className='border p-2 font-bold hover:bg-white hover:text-sky-700' onClick = {() =>{setDrawer2(true)}}>Edit Profile</button>
     </div>

     </div>

     </div>
     <div className='bg-white flex  p-6'>
     <div className=' w-64 pl-6 pt-10 border max-md:hidden' style={{backgroundColor: "rgb(237,241,247)"}}>
     <div className='p-6 flex  items-center item font-bold text-gray-600  hover:text-black' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"}}>
     <i class="fa-solid fa-bag-shopping mr-3 rounded-circle w-6 h-6 flex justify-center items-center bg-gray-600 text-white "></i>Orders

     </div>
     <div className='p-6 flex  items-center item font-bold' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"}}>
      Diggy One

     </div>
     <div className='p-6 flex  items-center item font-bold' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"}}>
     <i class="fa-solid fa-heart mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center "></i> Favorites

     </div>
     <div className='p-6 flex  items-center item font-bold' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"}}>
     <i class="fa-solid fa-wallet mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i>Payments
     </div>
     <div className='p-6 flex  items-center item font-bold' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"; document.getElementById('address').style.display = "block"; console.log("hello")}}>
     <i class="fa-solid fa-map-pin fa-solid fa-wallet mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center" onClick={(() =>{document.querySelector('.address').style.display = "block"; console.log("hello")})}></i> Addresses

     </div>
     <div className='p-6 flex  items-center item font-bold' onClick={(e) =>{Array.from(document.getElementsByClassName("item")).forEach(function(Element){Element.style.backgroundColor = "rgb(237,241,247)"}); e.target.style.backgroundColor = "white"}}>
     <i class="fa-solid fa-gear  mr-3 rounded-circle p-1 bg-gray-600 text-white w-6 h-6 flex justify-center items-center"></i> Settings

     </div>
      
     <div>

     </div>


     </div>
     <div className='address p-6  hidden' id = "address">
     <p className='text-2xl font-bold max-sm:text-lg'>Manage Address</p>
     <div className='mt-6 border p-3 flex w-96 max-md:w-72 max-sm:w-60'>
     <div>
     <i class="fa-solid fa-house text-lg max-sm:text-md"></i>
     </div>
     <div className='ml-6'>
      <div className='text-lg font-bold max-sm:text-lg'>Home</div>
      <div className='mt-3 max-sm:text-xs'>{location}</div>
      <div className='flex'>
      <button className='text-orange-500 font-bold text-lg' onClick={() =>{setDrawer1(true);}}>Edit</button> <button className='text-orange-500 font-bold text-lg ml-3'>Delete</button>

      </div>
     </div>


     </div>


     </div>

     </div>
    </div>
    </div>
    <Drawer  open={drawer1} onClose={() => setDrawer1(false)} placement='left'>
        <Drawer.Body>
        <h6 className='font-bold '>Save Delivery Address</h6>
        <LoadScript googleMapsApiKey={api} className=" w-36 h-72">
        <div>
      
       <select onChange={(e) =>{
        const [lat, lng] = e.target.value.split(", ").map(Number);
        setSelectPosition({lat, lng})
       }}  className=''>
       {dropdownOption.map((loc, index) =>{
         <option key = {index} value= {`${loc.lat}, ${loc.lng}`}>
         {`Lat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}`}

         </option>
       })}
        
       </select>
       <GoogleMap
       mapContainerStyle={mapContainerStyle}
       center={selectPosition|| defaultCenter}
       zoom = {13}
       onClick={handleMapClick}
       >
       {selectPosition && <Marker position={selectPosition} />}
        </GoogleMap>

        <p>
          Selected Location:{" "}
          {selectPosition
            ? `${selectPosition.lat.toFixed(4)}, ${selectPosition.lng.toFixed(4)}`
            : "None"}
        </p>
    

     
    </div>

    </LoadScript>
    <div className='border p-3'>
     {location}

    </div>
    <button className='mt-3 bg-orange-600 text-white font-bold w-full h-10 '>Save Address and Proceed</button>
        </Drawer.Body>
     </Drawer>
     <Drawer open={drawer2} onClose={() =>setDrawer2(false)} size={window.innerWidth < 768?'xs':'sm'} >
      <Drawer.Body className='p-6 max-md:p-3 max-sm:w-60'>
      <h6 className='text-lg font-bold'>Edit Profile</h6>
      <p className='mt-6 text-lg'>Phone Number</p>
      <div className=''>
      <div className='phone flex justify-between max-w-96 items-center mt-6 border-b pb-6'>
      <div>{user.phone}</div>
      <button className='text-orange-500 font-bold text-lg' onClick={() =>{document.querySelector('.phone').style.display = "none"; document.getElementById("phone").style.display = "block"}}>Change</button>


      </div>
      <div id = "phone" className='hidden'>
      <input type='number' placeholder='Number' maxLength={10}  onChange={phone_edit}  className='p-3 border w-96 mt-3 max-md:w-72 max-sm:w-60'/>
      <button className='w-96 h-10 bg-orange-600 text-white font-bold mt-3 max-md:w-72 max-sm:w-60' onClick={phone_submit}>Verify</button>
      </div>
     
      </div>
      <p className='mt-6 text-lg'>Email</p>
      <div className='email flex justify-between max-w-96 items-center mt-6 border-b pb-6'>
      <div>{user.email}</div>
      <button className='text-orange-500 font-bold text-lg' onClick={() =>{document.querySelector('.email').style.display = "none"; document.getElementById("email").style.display = "block"}}>Change</button>

      </div>
      <div id = "email" className='hidden'>
      <input type='email' placeholder='email'   onChange={email_edit}  className='p-3 border w-96 mt-3 max-md:w-72 max-sm:w-60'/>
      <button className='w-96 h-10 bg-orange-600 text-white font-bold mt-3 max-md:w-72 max-sm:w-60' onClick={email_submit}>Verify</button>
      </div>
     

      </Drawer.Body>
     </Drawer>
      </>
  )
}

