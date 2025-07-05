export default function Corporate() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10">
            <h1 className="text-4xl font-bold text-gray-800">Corporate Services</h1>
            <p className="text-lg text-gray-600 leading-8">
                Foody’s corporate solutions empower businesses to simplify employee meal management, enhance workplace satisfaction, and deliver delicious food on time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold text-orange-600 mb-2">Custom Plans</h2>
                    <p className="text-gray-600">From breakfast to dinner, choose from flexible meal plans tailored for small teams or entire companies.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold text-orange-600 mb-2">Real-Time Order Tracking</h2>
                    <p className="text-gray-600">Know exactly when your meals are being prepared, picked, and delivered — live tracking for all orders.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold text-orange-600 mb-2">Vendor Diversity</h2>
                    <p className="text-gray-600">Access to over 1,500 verified restaurants including local kitchens and premium brands.</p>
                </div>
            </div>
            <div className="bg-orange-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-2">Serving Across India</h3>
                <p className="text-gray-700">Foody serves businesses in 50+ cities including Delhi, Mumbai, Bangalore, Pune, and Hyderabad.</p>
            </div>
            <div className="p-6 bg-orange-200 rounded-xl">
                <h3 className="text-xl font-bold">Schedule a Demo</h3>
                <p className="text-gray-700">Email us at <b>corporate@foody.com</b> to schedule a free consultation and meal sampling session for your office.</p>
            </div>
        </div>
    );
}
