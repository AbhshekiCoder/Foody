import React, { useEffect, useState } from 'react';
import {GoogleMap, Marker, LoadScript} from '@react-google-maps/api'
import { useDispatch } from 'react-redux';
import { locationinfo } from '../feature/location';
import axios from 'axios';
import url from './url';

export default function Location() {
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
  return (
    <div className='location w-full absolute hidden z-10'>
    <div className='flex justify-end p-3'>
    <i class="fa-solid fa-xmark text-gray-500 text-xl" onClick={() =>{document.querySelector('.location').style.display = "none"  }}></i>

    </div>
      <LoadScript googleMapsApiKey={api}>
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

    </div>
  
  )
}
