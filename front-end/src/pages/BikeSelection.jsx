import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft, FiClock, FiCreditCard, FiShoppingCart,
  FiPlus, FiMinus, FiMapPin, FiCalendar, FiAlertCircle
} from "react-icons/fi";

const timeOptions = [
  { value: 1, label: "1 hour" },
  { value: 4, label: "4 hours" },
  { value: 8, label: "8 hours" },
  { value: 24, label: "1 day" },
  { value: 168, label: "1 week" }
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "black", label: "Black" },
  { value: "green", label: "Green" }
];

const BikeSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBike = location.state?.selectedBike;

  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [dateError, setDateError] = useState("");

  // Set default time and date on component mount
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().substring(0, 5); // HH:MM format
    
    setSelectedDate(currentDate);
    setSelectedStartTime(currentTime);
  }, []);

  if (!selectedBike) {
    return <div className="p-4 text-red-500">No bike selected.</div>;
  }

  const calculateTotalPrice = () => {
    return selectedBike.price * selectedTime * quantity;
  };

  const validateDate = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (selectedDateTime < now) {
      setDateError("Selected date/time cannot be in the past");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    validateDate(newDate, selectedStartTime);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setSelectedStartTime(newTime);
    validateDate(selectedDate, newTime);
  };

  const handlePayment = () => {
    if (!validateDate(selectedDate, selectedStartTime)) return;
    
    navigate("/payment", {
      state: {
        name: selectedBike.name,
        price: calculateTotalPrice(),
        color: selectedColor,
        duration: timeOptions.find(t => t.value === selectedTime)?.label,
        pickupLocation: selectedLocation,
        startDate: selectedDate,
        startTime: selectedStartTime
      }
    });
  };

  const handleAddToCart = () => {
    if (!validateDate(selectedDate, selectedStartTime)) return;
    
    setIsAddedToCart(true);
    setShowCartModal(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const navigateToCart = () => {
    navigate("/CartPage", {
      state: {
        cartItems: [{
          bike: selectedBike,
          duration: selectedTime,
          color: selectedColor,
          quantity: quantity,
          pickupLocation: selectedLocation,
          startDate: selectedDate,
          startTime: selectedStartTime,
          totalPrice: calculateTotalPrice()
        }]
      }
    });
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(q => q - 1);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-8 border border-gray-100">
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-[#67103d] mb-4">Item Added to Cart!</h3>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedBike.image} 
                alt={selectedBike.name} 
                className="w-20 h-20 object-contain rounded-lg"
              />
              <div>
                <p className="font-medium">{selectedBike.name}</p>
                <p className="text-sm text-gray-600">Color: {selectedColor}</p>
                <p className="text-sm text-gray-600">
                  Duration: {timeOptions.find(t => t.value === selectedTime)?.label}
                </p>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="font-bold text-[#67103d]">Rs. {calculateTotalPrice()}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/Item">
                <button onClick={() => setShowCartModal(false)} className="flex-1 py-2 rounded-lg border-2 border-[#67103d] text-[#67103d] hover:bg-gray-50">Continue Shopping</button>
              </Link>
              <button onClick={navigateToCart} className="flex-1 py-2 rounded-lg bg-[#67103d] text-white hover:bg-[#500c2e]">View Cart</button>
            </div>
          </div>
        </div>
      )}

      <div className="md:flex">
        <div className="md:w-1/2 relative">
          <div className="aspect-w-4 aspect-h-3 h-full">
            <img 
              src={selectedBike.image} 
              alt={selectedBike.name} 
              className="w-full h-full object-contain p-4"
            />
          </div>
          {selectedBike.isTrending && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-[#67103d] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              TRENDING
            </div>
          )}
        </div>

        <div className="p-6 md:w-1/2">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 text-[#67103d] hover:text-[#500c2e]">
            <FiArrowLeft /> Back to Bikes
          </button>

          <h1 className="text-3xl font-bold text-[#67103d]">{selectedBike.name}</h1>
          <p className="text-gray-600 mt-1">{selectedBike.category}</p>

          {/* Color Selection */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">Select Color</label>
            <div className="flex gap-3">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`px-4 py-2 rounded-md border-2 ${
                    selectedColor === color.value
                      ? `bg-${color.value}-100 border-${color.value}-500 text-${color.value}-800`
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium flex items-center gap-2"><FiClock /> Rental Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedTime(option.value)}
                  className={`p-2 rounded-lg border-2 ${
                    selectedTime === option.value
                      ? "bg-[#67103d] text-white border-[#67103d]"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button onClick={decreaseQuantity} disabled={quantity <= 1} className="p-2 border-2 rounded-full text-[#67103d] border-[#67103d]">
                <FiMinus />
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button onClick={increaseQuantity} className="p-2 border-2 rounded-full text-[#67103d] border-[#67103d]">
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 flex items-center gap-2"><FiMapPin /> Pickup Location</label>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 flex items-center gap-2"><FiCalendar /> Start Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Start Time */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 flex items-center gap-2"><FiClock /> Start Time</label>
            <input
              type="time"
              value={selectedStartTime}
              onChange={handleTimeChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Date validation error */}
          {dateError && (
            <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle /> {dateError}
            </div>
          )}

          {/* Summary & Buttons */}
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Price per hour:</span>
              <span>Rs. {selectedBike.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Duration:</span>
              <span>{timeOptions.find(t => t.value === selectedTime)?.label}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
              <span>Total:</span>
              <span className="text-[#67103d]">Rs. {calculateTotalPrice()}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedLocation || dateError}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                selectedColor && selectedLocation && !dateError
                  ? "bg-white text-[#67103d] border-2 border-[#67103d] hover:bg-[#67103d] hover:text-white"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              }`}
            >
              <FiShoppingCart />
              {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={handlePayment}
              disabled={!selectedColor || !selectedLocation || dateError}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                selectedColor && selectedLocation && !dateError
                  ? "bg-gradient-to-r from-[#67103d] to-[#8a1550] text-white hover:from-[#500c2e] hover:to-[#67103d]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiCreditCard /> Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeSelection;