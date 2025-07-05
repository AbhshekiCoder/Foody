import React from 'react';

export default function Offers() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10">
            <h1 className="text-4xl font-bold text-orange-600">Exclusive Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-orange-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-orange-500 mb-2">Weekend Feast – 50% OFF</h2>
                    <p className="text-gray-700">Use <b>WEEKEND50</b> every Saturday & Sunday on select restaurants. No minimum order.</p>
                </div>
                <div className="bg-white border border-orange-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-orange-500 mb-2">Razorpay Cashback</h2>
                    <p className="text-gray-700">Pay using Razorpay to get 10% instant cashback up to ₹100. Valid once per week.</p>
                </div>
                <div className="bg-white border border-orange-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-orange-500 mb-2">Refer & Earn</h2>
                    <p className="text-gray-700">Invite your friends and earn ₹100 for each signup. They get ₹50 too!</p>
                </div>
                <div className="bg-white border border-orange-200 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-orange-500 mb-2">Festival Combo Deals</h2>
                    <p className="text-gray-700">Enjoy specially curated meals during festivals at unbeatable prices.</p>
                </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl shadow text-gray-800">
                <h2 className="text-2xl font-bold mb-2">Loyalty Program</h2>
                <p>Collect Foody Points on every order and redeem for meal coupons, discounts, and surprise rewards every month.</p>
            </div>
        </div>
    );
}

