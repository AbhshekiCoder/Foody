import React from 'react'
import SliderContainer from './home/SliderContainer1'
import '../CSS/Home.css'
import Content2 from './home/Content2'
import ContentList from './home/ContentList'
export default function Home() {
  return (
  <>
  <div className='main-container  m-auto' style={{maxWidth: "1100px"}}>
    <SliderContainer/>
    <Content2/>
    <ContentList/>
  </div>
  
  </>
  )
}
