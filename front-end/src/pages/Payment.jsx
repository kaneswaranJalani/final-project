import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, color } = location.state || {};

  const handleConfirmPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/save", {
        bikeName: name,
        amount: price,
        color: color,
        status: "Paid"
      });

      if (res.status === 201) {
        alert("✅ Payment successful!");
        navigate("/"); // Redirect to home or success page
      }
    } catch (error) {
      console.error(error);
      alert("❌ Payment failed.");
    }
  };

  if (!name || !price || !color) {
    return <div className="text-center text-red-600 mt-10">❌ No bike info</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl p-8 rounded-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#67103d] mb-4">💳 Confirm Payment</h2>
        <p><strong>Bike:</strong> {name}</p>
        <p><strong>Color:</strong> {color}</p>
        <p><strong>Price:</strong> Rs. {price}</p>

        <button
          onClick={handleConfirmPayment}
          className="mt-6 bg-[#67103d] text-white px-6 py-2 rounded-full hover:bg-[#500c2e]"
        >
          ✅ Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
