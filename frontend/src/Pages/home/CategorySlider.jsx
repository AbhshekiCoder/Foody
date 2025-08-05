// CategorySlider.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function CategorySlider() {
  const data = useSelector(state => state.data.value);
  const navigate = useNavigate();

  function restaurant(id) {
    localStorage.setItem("id", id);
    navigate('/restaurant');
  }
  let left = () =>{
    document.querySelector('.content').scrollLeft -= 200;
  }
  
  let right = () =>{
    document.querySelector('.content').scrollLeft += 200
  }
  return (
    <div className="mb-12 max-w-4xl ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Food Categories</h2>
          <p className="text-gray-600">Browse by your favorite cuisine</p>
        </div>
        <div className="flex space-x-3 ">
          <button className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center hover:bg-orange-200 transition" onClick={left}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center hover:bg-orange-200 transition" onClick={right}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div className=" content flex ">
        {data ? data.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border  h-36  mr-6 rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => restaurant(item.id)}
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3">
              <img 
                src={`data:${item.type};base64,${item.image}`} 
                className="w-full h-full object-cover rounded-circle"
                alt={item.name}
              />
            </div>
            <span className="font-medium text-gray-800 text-center">{item.name}</span>
          </div>
        )) : Array(6).fill().map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <Skeleton circle width={64} height={64} className="mb-3" />
            <Skeleton width={80} height={20} />
          </div>
        ))}
      </div>
    </div>
  );
}