// Home.js - Updated Design
import React from 'react';
import CategorySlider from './home/CategorySlider';
import RestaurantGrid from './home/RestaurantGrid';
import FeaturedRestaurants from './home/FeaturedRestaurants';
import '../CSS/Home.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious food delivered to your door
              </h1>
              <p className="text-xl mb-6">
                Discover the best restaurants in your city
              </p>
              <div 
                className="bg-white rounded-full flex items-center px-4 py-2 max-w-md cursor-pointer shadow-lg"
                onClick={() => navigate('/search')}
              >
                <input
                  type="text"
                  className="w-full h-10 bg-transparent outline-none text-gray-800"
                  placeholder="Search for dishes or restaurants..."
                />
                <i className="fa-solid fa-magnifying-glass text-orange-500 text-xl ml-2"></i>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-300 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-orange-200 rounded-full opacity-50"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-2">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Food Categories */}
        <CategorySlider />
        
        {/* Featured Restaurants */}
        <FeaturedRestaurants 
          title="Popular Near You" 
          description="Top-rated restaurants in your area"
        />
        
        {/* Restaurant Grid */}
        <RestaurantGrid 
          title="Top Restaurants in Your City" 
          description="Curated selection of the best dining experiences"
        />
      </div>
      
      <Footer />
    </div>
  );
}