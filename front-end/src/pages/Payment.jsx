import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, color } = location.state || {};

  const [paymentType, setPaymentType] = useState("Card");

  const handleConfirmPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/save", {
        bikeName: name,
        amount: price,
        color: color,
        status: "Paid",
        method: paymentType,
      });

      if (res.status === 201) {
        alert("✅ Payment successful!");
        navigate("/PaymentSuccess");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Payment failed.");
    }
  };

  if (!name || !price || !color) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <p className="text-red-600 text-lg font-semibold">❌ No bike info found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
        {/* Virtual Card Image Background */}
        <img
          src="https://cdn.pixabay.com/photo/2020/06/12/19/52/credit-card-5298765_1280.png"
          alt="card"
          className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-64 opacity-20 pointer-events-none"
        />

        <h2 className="text-2xl font-bold text-center text-[#67103d] mb-6">
          Confirm Your Payment
        </h2>

        <div className="space-y-4 text-gray-800 text-base">
          <div className="flex justify-between">
            <span className="font-medium">Bicycle Name:</span>
            <span>{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Color:</span>
            <span>{color}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-[#4c092b]">
            <span>Total:</span>
            <span>Rs. {price}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Type</label>
          <div className="flex gap-3">
            {["Card", "UPI", "Cash"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentType(method)}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  paymentType === method
                    ? "bg-[#67103d] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <Link to="/PaymentSuccess">
        <button
          onClick={handleConfirmPayment}
          className="mt-8 w-full bg-gradient-to-r from-[#67103d] to-[#4c092b] text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transition transform duration-300 shadow-lg"
        >
          ✅ Pay Now
        </button>
         </Link>  
        {/* Secure Payment Info */}
        <div className="mt-6 text-sm text-gray-600 text-center space-y-2">
          <div className="flex justify-center items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Secure and Encrypted Payment</span>
          </div>
          <div>SSL encryption enabled 🔒</div>
          <div className="text-xs text-gray-400">By continuing, you agree to our Terms & Conditions.</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
