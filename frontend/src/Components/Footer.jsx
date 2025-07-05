import React from 'react';
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pb-10">

        {/* Logo */}
        <div>
          <div className="flex items-center mb-3">
            <div className="bg-orange-500 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold text-lg text-orange-600">Foody</span>
          </div>
          <p className="text-gray-500 mt-2">© 2025 Foody Limited</p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-2">Company</h3>
          <ul className="space-y-1 text-gray-600">
            <li>About Us</li>
            <li>Foody Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Foody One</li>
            <li>Foody Instamart</li>
            <li>Foody Dineout</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-2">Contact us</h3>
          <ul className="space-y-1 text-gray-600">
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>
          <h3 className="font-bold mt-4 mb-2">Legal</h3>
          <ul className="space-y-1 text-gray-600">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="font-bold mb-2">Available in:</h3>
          <ul className="space-y-1 text-gray-600">
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
          </ul>
          <select className="mt-2 border rounded px-2 py-1 text-gray-600">
            <option>685 cities</option>
          </select>
        </div>

        {/* Life at Foody & Social */}
        <div>
          <h3 className="font-bold mb-2">Life at Foody</h3>
          <ul className="space-y-1 text-gray-600">
            <li>Explore With Foody</li>
            <li>Foody News</li>
            <li>Snackables</li>
          </ul>
          <h3 className="font-bold mt-4 mb-2">Social Links</h3>
          <div className="flex space-x-4 text-xl text-gray-600">
            <FaLinkedinIn className="hover:text-orange-500 cursor-pointer" />
            <FaInstagram className="hover:text-orange-500 cursor-pointer" />
            <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
            <FaPinterestP className="hover:text-orange-500 cursor-pointer" />
            <FaTwitter className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* App Store Section */}
      <div className="border-t pt-6 pb-10 mt-4 text-center">
        <p className="font-semibold text-gray-700 mb-4">
          For better experience, download the Foody app now
        </p>
        <div className="flex justify-center gap-4">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-12"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-12"
          />
        </div>
      </div>
    </footer>
  );
}
