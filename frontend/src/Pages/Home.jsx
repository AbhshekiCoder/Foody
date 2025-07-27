import React from 'react'
import SliderContainer from './home/SliderContainer1'
import '../CSS/Home.css'
import Content2 from './home/Content2'
import ContentList from './home/ContentList'
import Location from '../misc/Location'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
export default function Home() {
  const Navigate = useNavigate();
  return (
  <>
  <div className='main-container  m-auto' style={{maxWidth: "1100px"}}>
    <div className=' max-w-xs m-auto pt-16 flex items-center hidden  max-lg:flex max-md:p-3 max-md:pt-16'>
      <input type='text' className='w-full h-10 border pl-3 rounded-lg outline-none' placeholder='search any dishes ' onClick={()=>{Navigate('/search')}} /><i class="fa-solid fa-magnifying-glass mr-3 text-orange-600 ml-3 text-xl "></i>
    </div>
    <SliderContainer/>
    <Content2/>
    <ContentList/>
    
   
  </div>
  <Footer/>
  
  </>
  )
}
