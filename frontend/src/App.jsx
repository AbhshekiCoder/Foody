import { useEffect, useState } from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import './CSS/Common.css';
import Signup from './Pages/Singnup';
import Login from './Components/Login';
import 'rsuite/dist/rsuite.min.css';
import url from './misc/url.js';
import axios from 'axios';
import { Message } from 'rsuite';
import Profile from './Components/Profile';
import Singnin from './Pages/Singnin';
import Admin from './Pages/Admin';
import Search from './Pages/Search';
import Restaurant from './Pages/Restaurant';
import Footer from './Components/Footer'


import DashBoard from './Pages/DashBoard';
import { useDispatch, useSelector } from 'react-redux';
import { locationinfo } from './feature/location';
import { userinfo } from './feature/userinfo';
import Cart from './Pages/Cart';
import { dishData } from './feature/data.js';
import Corporate from './Pages/Corporate.jsx';
import Offers from './Pages/Offers.jsx';
import Help from './Pages/Help.jsx';
import 'react-loading-skeleton/dist/skeleton.css'
import Order from './Pages/Order.jsx';
import { setCartDetail } from './feature/cartDetail.js';

function App() {
  const name = useSelector(state => state.name.value)
  
   function login(){
    console.log("hello")
    document.querySelector('.signin').style.display = "block";
   }
   let [type, setType] = useState("success");
   let [profile, setProfile] = useState(false);
   let dispatch = useDispatch();
     let content = async() =>{
               let result = await axios.post(`${url}dishes/dishes`);
               if(result.data){
                
                 dispatch(dishData(result.data))
               }
               else{
                 console.log("something went wrong")
               }
       
             }

   let  signin = async (e)=>{
    console.log("hello")
       e.preventDefault();
       let form = document.forms['login'];
     
       let email = form.email.value;
      
       let password = form.password.value;
       let obj = {
         email: email,
         password: password
        
       }
 
       let result = await axios.post(`${url}login/login`, obj );
       if(!result.data.success){
         setType("warning")
         document.getElementById("message").innerText = result.data.message;
         document.querySelector('.message').style.display = "block";
         setTimeout(()=>{
           document.querySelector('.message').style.display = "none";
 
         },2000)
       }
       else{
        
         setType("success")
         document.querySelector(".signin").style.display = "none";
         document.getElementById("message").innerText = result.data.message;
         document.querySelector('.message').style.display = "block";
         localStorage.setItem("token", result.data.token);

         
          let token = localStorage.getItem('token');
          try{
           let result = await axios.post(`${url}user/user`, {token} );
           dispatch(userinfo(result.data))
           
           dispatch(locationinfo(result.data.address))
           content()
           
          }catch(err){
           console.log(err.message)
          }
         
         setTimeout(()=>{
           document.querySelector('.message').style.display = "none";
 
         },2000)
         setProfile(true)
         
       }
 
 
 
   }
   function logout(){
    localStorage.removeItem("token");
    setProfile(false);
    
   }
   useEffect(()=>{
   
    let token = localStorage.getItem("token");
    if(token){
      setProfile(true)
    }
    setTimeout(() =>{
       content()
     

    },2000)
  
  

   },[name])
    let dish = async() =>{
           console.log("hrllo")
           let token = localStorage.getItem("token");
           console.log(token)
           try{
           let result = await axios.get(`${url}cartDetail/${token}/cartDetail/${token}`);
         
           if(result.data.success){
               dispatch(setCartDetail({data: result.data.dish, restaurant: result.data.restaurant, total: result.data.total}))
               
             
             
           }
       }catch(err){
           console.log(err.message)
       }
   
       }
       useEffect(() =>{
           dish();
   
       },[])
   
  
  return (
    <>
   
    <Profile  logout={logout}/>
    <Navbar login={login} profile={profile} />
    <Login signin={signin} type={type}
    />
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path = "/signup" element={<Signup/>}></Route>
      <Route path= "/login" element={<Singnin/>}></Route>
      <Route path = "/admin" element={<Admin/>}></Route>
      <Route path = "/Search" element={<Search/>}></Route>
      <Route path = "/restaurant" element={<Restaurant/>}></Route>
      <Route path = "/dashboard" element = {<DashBoard/>}></Route>
      <Route path = "/cart" element={<Cart/>}></Route>
      <Route path = "/corporate" element={<Corporate/>}></Route>
      <Route path = "/offers" element={<Offers/>}></Route>
      <Route path="/help" element={<Help/>}></Route>
      <Route path = "/order" element={<Order/>}></Route>
    </Routes>
    
 
       
      
   
      
    </>
  )
}

export default App
