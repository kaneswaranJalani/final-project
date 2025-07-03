import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiCheckCircle,
  FiClock,
  FiLock,
  FiUser,
  FiCalendar,
  FiShield
} from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, color } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minute timer

  // Format card number as user types
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return value;
  };

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/payments/save", {
        bikeName: name,
        amount: price,
        color: color,
        paymentMethod,
        ...(paymentMethod === "card" ? { 
          cardLast4: cardDetails.number.slice(-4) 
        } : {}),
        ...(paymentMethod === "upi" ? { upiId } : {})
      });

      if (res.status === 201) {
        navigate("/paymentsuccess", {
          state: {
            transactionId: res.data.id,
            amount: price,
            bikeName: name
          }
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!name || !price || !color) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f9f5f7]">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md border border-[#e8d8e1]">
          <div className="w-16 h-16 bg-[#f0e4eb] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="text-[#67103d] text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#67103d] mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-6">Your bike selection has timed out. Please select again.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#67103d] text-white px-6 py-2 rounded-lg hover:bg-[#4c092b] transition"
          >
            Back to Selection
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#f9f5f7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#67103d] mb-2">Complete Your Payment</h1>
          <p className="text-[#8a5a75]">Secure checkout with military-grade encryption</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e8d8e1]">
              <h2 className="text-xl font-semibold text-[#67103d] mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-[#67103d]" /> Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bike Model</span>
                  <span className="font-medium text-[#4c092b]">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color</span>
                  <span className="font-medium text-[#4c092b] capitalize">{color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-[#4c092b]">1 Day Rental</span>
                </div>
              </div>

              <div className="border-t border-[#e8d8e1] pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-[#67103d]">Total</span>
                  <span className="font-bold text-[#67103d]">Rs. {price}</span>
                </div>
              </div>

              <div className="mt-6 bg-[#f0e4eb] p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[#67103d]">
                  <FiClock />
                  <span className="font-medium">Complete in {formatTime(timer)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 border border-[#e8d8e1]">
              <h2 className="text-xl font-semibold text-[#67103d] mb-4">Payment Options</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === "card" 
                      ? "border-[#67103d] bg-[#f9f0f5]" 
                      : "border-gray-200 hover:border-[#a87b96]"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    paymentMethod === "card" ? "bg-[#67103d] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <FiCreditCard size={20} />
                  </div>
                  <span className="font-medium">Credit/Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === "upi" 
                      ? "border-[#67103d] bg-[#f9f0f5]" 
                      : "border-gray-200 hover:border-[#a87b96]"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    paymentMethod === "upi" ? "bg-[#67103d] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <FiDollarSign size={20} />
                  </div>
                  <span className="font-medium">UPI Payment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e8d8e1]">
              {paymentMethod === "card" ? (
                <>
                  <h2 className="text-xl font-semibold text-[#67103d] mb-6 flex items-center gap-2">
                    <FiCreditCard className="text-[#67103d]" /> Card Details
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4c092b] mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                        />
                        <div className="absolute right-3 top-3 flex gap-2">
                          <FaCcVisa className="text-[#1a1f71]" />
                          <FaCcMastercard className="text-[#eb001b]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4c092b] mb-1">Cardholder Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                          placeholder="Name on card"
                          className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                        />
                        <FiUser className="absolute right-3 top-3 text-[#a87b96]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4c092b] mb-1">Expiry Date</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                          />
                          <FiCalendar className="absolute right-3 top-3 text-[#a87b96]" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4c092b] mb-1">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '')})}
                            placeholder="•••"
                            maxLength={3}
                            className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                          />
                          <FiLock className="absolute right-3 top-3 text-[#a87b96]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-[#67103d] mb-6 flex items-center gap-2">
                    <FiDollarSign className="text-[#67103d]" /> UPI Payment
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4c092b] mb-1">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                      />
                    </div>

                    <div className="text-center text-[#a87b96] text-sm">
                      OR
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <button className="p-3 border-2 border-[#e8d8e1] rounded-xl hover:border-[#a87b96] transition">
                        <FaGooglePay className="mx-auto text-[#4285F4] text-xl" />
                      </button>
                      <button className="p-3 border-2 border-[#e8d8e1] rounded-xl hover:border-[#a87b96] transition">
                        <SiPhonepe className="mx-auto text-[#5F259F] text-xl" />
                      </button>
                      <button className="p-3 border-2 border-[#e8d8e1] rounded-xl hover:border-[#a87b96] transition">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Paytm_Logo.svg/1200px-Paytm_Logo.svg.png" 
                          alt="Paytm" 
                          className="h-6 mx-auto"
                        />
                      </button>
                      <button className="p-3 border-2 border-[#e8d8e1] rounded-xl hover:border-[#a87b96] transition">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bhim_-_Made_for_India.svg/1200px-Bhim_-_Made_for_India.svg.png" 
                          alt="BHIM" 
                          className="h-6 mx-auto"
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 pt-6 border-t border-[#e8d8e1]">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isProcessing 
                      ? "bg-[#a87b96] cursor-not-allowed" 
                      : "bg-[#67103d] hover:bg-[#4c092b] shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLock /> Pay Rs. {price}
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#8a5a75]">
                  <FiShield className="text-[#67103d]" />
                  <span>256-bit SSL secured payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;