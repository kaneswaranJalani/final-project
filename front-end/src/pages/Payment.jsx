import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  FiCreditCard, FiDollarSign, FiCheckCircle, FiClock,
  FiLock, FiShield
} from "react-icons/fi";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    const state = location.state;
    if (!state?.items || !Array.isArray(state.items)) {
      console.warn("Missing cart data. Redirecting...");
      navigate("/item");
    } else {
      setItems(state.items);
      setTotal(state.total || 0);
    }
  }, [location.state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Stripe client secret
  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!total) return;
      try {
        const res = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
          amount: total * 100,
          currency: "inr",
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Stripe Init Error:", err);
        alert("Error initializing payment.");
      }
    };

    if (paymentMethod === "card") fetchClientSecret();
  }, [total, paymentMethod]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    if (paymentMethod === "card") {
      if (!stripe || !elements) {
        alert("Stripe not ready");
        setIsProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert("Card element not found");
        setIsProcessing(false);
        return;
      }

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { name: "Test User" },
          },
        });

        if (error) {
          alert("Payment failed: " + error.message);
          setIsProcessing(false);
          return;
        }

        await axios.post("http://localhost:5000/api/payments/save", {
          items,
          total,
          paymentMethod: "card",
          cardLast4: "****",
        });

        navigate("/paymentsuccess", {
          state: {
            transactionId: paymentIntent.id,
            amount: total,
            items,
          },
        });
      } catch (err) {
        console.error(err);
        alert("Error processing payment.");
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Enter a valid UPI ID");
        setIsProcessing(false);
        return;
      }

      try {
        await axios.post("http://localhost:5000/api/payments/save", {
          items,
          total,
          paymentMethod: "upi",
          upiId,
        });

        navigate("/paymentsuccess", {
          state: {
            transactionId: `upi_txn_${Date.now()}`, // fake txn ID for demo
            amount: total,
            items,
          },
        });
      } catch (err) {
        console.error(err);
        alert("UPI Payment failed.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f5f7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#67103d] mb-2">Complete Your Payment</h1>
          <p className="text-[#8a5a75]">Secure checkout with Stripe</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e8d8e1]">
              <h2 className="text-xl font-semibold text-[#67103d] mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-[#67103d]" /> Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="bg-[#f9f0f5] p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bike Model:</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium capitalize">{item.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{item.duration} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-[#67103d]">Rs. {item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e8d8e1] pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-[#67103d]">Total</span>
                  <span className="font-bold text-[#67103d]">Rs. {total}</span>
                </div>
              </div>

              <div className="mt-6 bg-[#f0e4eb] p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[#67103d]">
                  <FiClock />
                  <span className="font-medium">Complete in {formatTime(timer)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
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
                    <FiCreditCard className="text-[#67103d]" /> Card Payment
                  </h2>
                  <div className="mb-4 border border-[#e8d8e1] p-4 rounded-xl bg-gray-50">
                    <CardElement options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#4c092b",
                          "::placeholder": { color: "#a87b96" }
                        },
                        invalid: { color: "#ff4b4b" }
                      }
                    }} />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-[#67103d] mb-6 flex items-center gap-2">
                    <FiDollarSign className="text-[#67103d]" /> Enter UPI ID
                  </h2>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 bg-white border border-[#e8d8e1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d]"
                  />
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
                  {isProcessing ? "Processing..." : <> <FiLock /> Pay Rs. {total} </>}
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
