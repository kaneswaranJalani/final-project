import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  FiCreditCard, FiCheckCircle, FiLock, FiShield, FiCalendar, 
  FiClock, FiMapPin, FiArrowLeft
} from "react-icons/fi";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [bikeData, setBikeData] = useState({
    name: "",
    price: "",
    color: "",
    pickupLocation: "",
    startDate: "",
    startTime: "",
    endTime: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Get bike data from location state
  useEffect(() => {
    const { name, price, color, pickupLocation, startDate, startTime, endTime } = location.state || {};
    if (!name || !price || !color || !pickupLocation || !startDate || !startTime || !endTime) {
      navigate("/payment", { replace: true });
    } else {
      setBikeData({ name, price, color, pickupLocation, startDate, startTime, endTime });
    }
  }, [location.state, navigate]);

  const { name, price, color, pickupLocation, startDate, startTime, endTime } = bikeData;

  // Get client secret for Stripe
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!price) return;

      try {
        const res = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
          amount: price * 100,
          currency: "inr",
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        alert("Error initializing payment.");
      }
    };

    createPaymentIntent();
  }, [price]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe is not ready.");
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Card input not found.");
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
        bikeName: name,
        amount: price,
        color,
        pickupLocation,
        startDate,
        startTime,
        endTime,
        paymentMethod: "card",
        cardLast4: "****",
      });

      navigate("/paymentsuccess", {
        state: {
          transactionId: paymentIntent.id,
          amount: price,
          bikeName: name,
          pickupLocation,
          startDate,
          startTime,
          endTime
        },
      });
    } catch (err) {
      console.error("Payment processing error:", err);
      alert("Payment failed.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f5f7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#67103d] mb-6 hover:text-[#4c092b]"
        >
          <FiArrowLeft /> Back to Cart
        </button>

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
                <div className="flex justify-between">
                  <span className="text-gray-600">Bike Model</span>
                  <span className="font-medium text-[#4c092b]">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color</span>
                  <span className="font-medium text-[#4c092b] capitalize">{color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FiMapPin /> Pickup Location
                  </span>
                  <span className="font-medium text-[#4c092b]">{pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FiCalendar /> Rental Date
                  </span>
                  <span className="font-medium text-[#4c092b]">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FiClock /> Rental Period
                  </span>
                  <span className="font-medium text-[#4c092b]">
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#e8d8e1] pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-[#67103d]">Total</span>
                  <span className="font-bold text-[#67103d]">Rs. {price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e8d8e1]">
              <h2 className="text-xl font-semibold text-[#67103d] mb-6 flex items-center gap-2">
                <FiCreditCard className="text-[#67103d]" /> Card Payment
              </h2>

              <div className="mb-4 border border-[#e8d8e1] p-4 rounded-xl bg-gray-50">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#4c092b",
                        "::placeholder": { color: "#a87b96" },
                      },
                      invalid: { color: "#ff4b4b" },
                    },
                  }}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-[#e8d8e1]">
                <button
                  onClick={handleCardPayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isProcessing
                      ? "bg-[#a87b96] cursor-not-allowed"
                      : "bg-[#67103d] hover:bg-[#4c092b] shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isProcessing ? "Processing..." : <> <FiLock /> Pay Rs. {price} </>}
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