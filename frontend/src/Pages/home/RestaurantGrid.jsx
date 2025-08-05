// RestaurantGrid.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function RestaurantGrid({ title, description }) {
  const data = useSelector(state => state.data.value);
  const navigate = useNavigate();

  function restaurant(id) {
    localStorage.setItem("id", id);
    navigate('/restaurant');
  }

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data ? data.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
            onClick={() => restaurant(item.id)}
          >
            <div className="relative">
              <div className="h-48 bg-gray-200">
                <img 
                  src={`data:${item.type};base64,${item.image}`} 
                  className="w-full h-full object-cover"
                  alt={item.name}
                />
              </div>
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                4.2 ★
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-xl text-gray-800 mb-1">{item.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <span className="mr-3">30-35 min</span>
                <span className="mr-3">•</span>
                <span>Free delivery</span>
              </div>
              <p className="text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        )) : Array(6).fill().map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
            <Skeleton height={192} />
            <div className="p-4">
              <Skeleton height={24} width="70%" className="mb-2" />
              <Skeleton height={16} width="50%" className="mb-3" />
              <Skeleton height={14} count={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}