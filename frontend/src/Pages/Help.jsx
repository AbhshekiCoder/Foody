import React from 'react';

export default function Help() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10">
            <h1 className="text-4xl font-bold text-gray-800">Help & Support</h1>
            <section>
                <h2 className="text-2xl font-semibold text-orange-600 mb-2">Popular Questions</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>How to cancel or change an order?</li>
                    <li>What are the delivery hours?</li>
                    <li>How do I use promo codes?</li>
                    <li>Why is my order delayed?</li>
                    <li>How to report an issue with the food quality?</li>
                </ul>
            </section>
            <section className="bg-gray-100 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-2">Need to Talk?</h2>
                <p className="text-gray-700 mb-3">Contact us any time via:</p>
                <ul className="space-y-1 text-gray-700">
                    <li>Email: <b>support@foody.com</b></li>
                    <li>Phone: <b>1800-123-FOOD</b> (9am – 11pm)</li>
                    <li>Live Chat: Available in app</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-orange-600 mb-2">Track Your Request</h2>
                <p className="text-gray-700">Already submitted a request? Track your ticket status anytime in your profile under 'My Support Tickets'.</p>
            </section>
            <section className="bg-orange-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-2">Emergency Support</h2>
                <p className="text-gray-700">Facing an urgent issue like wrong delivery or payment failure? Tap the red 'Emergency Help' in the app for immediate response.</p>
            </section>
        </div>
    );
}
