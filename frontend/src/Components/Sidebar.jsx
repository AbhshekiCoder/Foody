import React from 'react'

export default function Sidebar() {
  return (
    <div className='sidebar w-60 border h-full bg-white modal ' style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}}>
      <div className='address text-lg font-semibold text-gray-400  border-b p-3 mt-3'>
        hii
      </div>
      <div className='flex  items-center   border-b mt-3  p-3'>
    <i class="fa-solid fa-user mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Profile</span>

    </div>
      <div className='flex  items-center border-b mt-3  p-3'>
       <i class="fa-solid fa-bag-shopping mr-3 text-gray-600 "></i><a className=' text-gray-500 font-semibold hover:text-orange-600'>Diggy Corporate</a>

      </div>
      <div className='flex items-center  border-b mt-3  p-3'>
        <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Offer</span>

       </div>
       <div className='flex items-center border-b mt-3  p-3'>
       <i class="fa-solid fa-circle-info mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Help</span>

    </div>
    <div className='flex  items-center  border-b mt-3  p-3'>
    <i class="fa-solid fa-cart-shopping mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Cart</span>

    </div>
    <div className='flex items-center  border-b mt-3  p-3'>
        <i class="fa-solid fa-gift mr-3 text-gray-600"></i><span className=' text-gray-500 font-semibold  hover:text-orange-600'>Faviroute</span>

       </div>
       <div className='logout mt-16 pl-3 text-gray-600'>
       Log Out


       </div>
    </div>
  )
}
