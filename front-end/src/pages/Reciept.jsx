import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Receipt = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentDate, setPaymentDate] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const bikeDetails = {
    id: 'CR-2023-45',
    model: 'City Cruiser Pro',
    image: '/assets/city-bike.jpg', // make sure this image path is correct
    duration: '4 hours',
    pickupLocation: 'Central Park Station'
  };

  const priceDetails = {
    baseRate: 12.00,
    insurance: 2.50,
    serviceFee: 1.00,
    total: 15.50
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      alert("Card element not found.");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.error(error);
        setPaymentStatus('failed');
        return;
      }

      // Simulate backend confirmation
      setPaymentStatus('completed');
      setPaymentDate(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      setPaymentStatus('failed');
    }
  };

  const getStatusClass = () => {
    switch (paymentStatus) {
      case 'completed': return 'status-completed';
      case 'failed': return 'status-failed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Payment Receipt</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Bike Info</h3>
        <img src={bikeDetails.image} alt={bikeDetails.model} className="w-full h-40 object-cover rounded mb-3" />
        <p><strong>Model:</strong> {bikeDetails.model}</p>
        <p><strong>ID:</strong> {bikeDetails.id}</p>
        <p><strong>Duration:</strong> {bikeDetails.duration}</p>
        <p><strong>Pickup:</strong> {bikeDetails.pickupLocation}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Pricing</h3>
        <div className="space-y-1">
          <div className="flex justify-between"><span>Base Rate:</span><span>${priceDetails.baseRate.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Insurance:</span><span>${priceDetails.insurance.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Service Fee:</span><span>${priceDetails.serviceFee.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold pt-2 border-t"><span>Total:</span><span>${priceDetails.total.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Payment Method</h3>

        <div className="flex gap-2 mb-4">
          {['card', 'paypal', 'wallet'].map((method) => (
            <button
              key={method}
              onClick={() => handlePaymentMethodChange(method)}
              className={`border px-4 py-2 rounded ${paymentMethod === method ? 'bg-[#67103d] text-white' : 'bg-gray-100'}`}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handlePaymentSubmit}>
            <CardElement className="p-2 border rounded mb-3" />
            <button
              type="submit"
              disabled={paymentStatus === 'completed'}
              className="w-full py-2 rounded text-white bg-green-600 hover:bg-green-700 transition"
            >
              {paymentStatus === 'pending' ? `Pay $${priceDetails.total.toFixed(2)}` :
                paymentStatus === 'completed' ? 'Paid' : 'Retry Payment'}
            </button>
          </form>
        )}

        {paymentMethod !== 'card' && (
          <div className="text-sm text-gray-500">
            This payment method is not yet integrated.
          </div>
        )}
      </div>

      {paymentStatus !== 'pending' && (
        <div className={`p-4 mt-4 rounded text-sm ${getStatusClass()}`}>
          <p><strong>Status:</strong> {paymentStatus}</p>
          <p><strong>Date:</strong> {paymentDate}</p>
        </div>
      )}
    </div>
  );
};

export default Receipt;
