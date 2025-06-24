import React from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaGoogle, FaLock, FaShieldAlt, FaBicycle } from 'react-icons/fa';

const Payment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center justify-center bg-[#67103d] text-white p-3 rounded-full mb-4">
            <FaBicycle className="text-xl" />
          </div> */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Rental</h1>
          <p className="text-gray-500">Secure payment processed with encryption</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trip Summary Card */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#67103d] px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaShieldAlt className="mr-2" />
                Rental Summary
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Bicycle Model</span>
                  <span className="font-medium text-gray-800">CityRide Pro</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Rental Duration</span>
                  <span className="font-medium text-gray-800">2 hours</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Base Rate</span>
                  <span className="font-medium text-gray-800">$8.00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium text-gray-800">$2.00</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-[#67103d]">$10.00</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <FaLock className="mr-2 text-green-500" />
                <span>Your payment is securely encrypted</span>
              </div>
            </div>
          </div>

          {/* Payment Options Card */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#67103d] px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Payment Method</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {/* Credit Card Option */}
                <div className="border border-gray-200 hover:border-[#67103d] rounded-xl p-4 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-[#67103d] text-white p-2 rounded-lg mr-4">
                      <FaCreditCard className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </div>

                {/* PayPal Option */}
                <div className="border border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4">
                      <FaPaypal className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">PayPal</h3>
                      <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                    </div>
                  </div>
                </div>

                {/* Google Pay Option */}
                <div className="border border-gray-200 hover:border-red-500 rounded-xl p-4 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-red-100 text-red-600 p-2 rounded-lg mr-4">
                      <FaGoogle className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Google Pay</h3>
                      <p className="text-sm text-gray-500">Fast and secure payment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Form (shown when credit card selected) */}
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <Link to="/SuccessMessagePage">
                <button className="w-full bg-[#67103d] hover:bg-[#7a1347] text-white font-bold py-4 px-6 rounded-xl shadow-md transition duration-300 flex items-center justify-center">
                  <FaLock className="mr-2" />
                  Pay Securely $10.00
                </button>
              </Link>

              <p className="text-center text-xs text-gray-500 mt-3">
                By continuing, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;