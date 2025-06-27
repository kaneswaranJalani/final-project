import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [bicycles, setBicycles] = useState([]);
  const [formData, setFormData] = useState({
    bicycleId: '',
    startDate: '',
    endDate: '',
    pickupLocation: '',
    quantity: 1,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  const pickupLocations = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Trincomalee',
    'Negombo', 'Anuradhapura', 'Batticaloa', 'Nuwara Eliya', 'Matara'
  ];

  // Fetch bicycles once component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setBicycles(res.data))
      .catch(() => setMessage('❌ Failed to load bicycles'));
  }, []);

  // Recalculate total price whenever form data or bicycles list changes
  useEffect(() => {
    const { bicycleId, startDate, endDate, quantity } = formData;
    const selectedBike = bicycles.find(b => b._id === bicycleId);

    if (selectedBike && startDate && endDate && quantity > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate hours difference, minimum 1 hour
      const hours = Math.max((end - start) / (1000 * 60 * 60), 1);

      // Calculate total price
      const price = selectedBike.price * hours * quantity;

      setTotalPrice(price.toFixed(2));
      setMessage('');
    } else {
      setTotalPrice(0);
    }
  }, [formData, bicycles]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle payment button click - replace this with real payment integration
  const handlePayment = () => {
    if (totalPrice > 0) {
      alert(`Proceeding to payment for $${totalPrice}`);
      // Here you can redirect to payment gateway or open a payment modal
    } else {
      alert('Please fill in all fields to calculate total price.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🚲 Rent a Bicycle</h1>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded text-center font-medium 
            ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {message}
        </div>
      )}

      <form className="space-y-5" onSubmit={e => e.preventDefault()}>
        {/* Bicycle dropdown */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Select Bicycle</label>
          <select
            name="bicycleId"
            value={formData.bicycleId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Choose a bicycle --</option>
            {bicycles.map(bike => (
              <option key={bike._id} value={bike._id}>
                {bike.bicycleName} ({bike.category}) - ${bike.price}/hr
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Location dropdown */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Pickup Location (Sri Lanka)</label>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select location --</option>
            {pickupLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Total Price Display */}
        <div className="text-lg font-semibold text-indigo-700 text-center">
          Total Price: ${totalPrice}
        </div>

        {/* Payment Button */}
        <div className="text-center">
          {totalPrice > 0 && (
            <button
              type="button"
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
            >
              💳 Proceed to Pay
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Order;
