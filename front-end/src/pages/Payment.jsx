import React from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Rental</h1>

        {/* Trip Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Bicycle Model:</span>
              <span className="font-medium">CityRide Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rental Duration:</span>
              <span className="font-medium">2 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Rate:</span>
              <span className="font-medium">$8.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance:</span>
              <span className="font-medium">$2.00</span>
            </div>
          </div>

          {/* Payment Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Rental (2 hrs)</td>
                  <td className="px-4 py-3 text-gray-500">Credit/Debit Card</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Insurance</td>
                  <td className="px-4 py-3 text-gray-500">Included</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-xl font-bold">$10.00</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          {/* PayPal Option */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold">P</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                <p className="text-gray-500">Pay with your PayPal account</p>
              </div>
            </div>
          </div>

          {/* Google Pay Option */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">G</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Google Pay</h3>
                <p className="text-gray-500">Fast and secure payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-8">
          <Link to="/SuccessMessagePage">
            <button className="w-full bg-[#67103d] hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300">
              Pay $10.00
            </button>
          </Link>
        </div>

        <p className="text-center text-gray-500 text-sm mt-2">
          Your payment is secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default Payment;
