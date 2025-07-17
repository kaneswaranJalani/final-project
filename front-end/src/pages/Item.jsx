import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiSearch, 
  FiUser, 
  FiSmile, 
  FiShoppingCart, 
  FiChevronDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiArrowRight,
  FiArrowLeft,
  FiTrash2,
  FiBook

} from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Bike images
import bike1 from "../assets/bike1.jpg";
import bike2 from "../assets/bike2.jpg";
import bike3 from "../assets/bike3.jpg";
import bike4 from "../assets/bike4.jpg";
import bike5 from "../assets/bike5.jpg";
import bike6 from "../assets/bike6.jpg";

const bikes = [
  { id: 1, image: bike1, name: "Speedster X", price: 100, category: "Man", trending: true, rating: 4.8 },
  { id: 2, image: bike2, name: "Retro Lady", price: 150, category: "Female", trending: false, rating: 4.5 },
  { id: 3, image: bike3, name: "Mountain Pro", price: 130, category: "Man", trending: true, rating: 4.9 },
  { id: 4, image: bike4, name: "City Cruiser", price: 120, category: "Child", trending: false, rating: 4.2 },
  { id: 5, image: bike5, name: "Dirt King", price: 100, category: "Child", trending: true, rating: 4.7 },
  { id: 6, image: bike6, name: "Vintage Ride", price: 180, category: "Man", trending: false, rating: 4.6 }
];

const categories = [
  { label: "All", icon: <FiSearch /> },
  { label: "Man", icon: <FiUser /> },
  { label: "Female", icon: <FiUser /> },
  { label: "Child", icon: <FiSmile /> }
];

const statusOptions = [
  { value: "all", label: "All Status", icon: <FiSearch /> },
  { value: "available", label: "Available", icon: <FiCheckCircle /> },
  { value: "rented", label: "Rented", icon: <FiClock /> },
  { value: "maintenance", label: "Maintenance", icon: <FiXCircle /> }
];

const timeOptions = [
  { value: 1, label: "1 hour" },
  { value: 4, label: "4 hours" },
  { value: 8, label: "8 hours" },
  { value: 24, label: "1 day" },
  { value: 168, label: "1 week" }
];

const CustomArrow = ({ onClick, direction }) => (
  <button 
    onClick={onClick}
    className={`absolute top-1/2 z-10 bg-white p-2 rounded-full shadow-md transform -translate-y-1/2 hover:bg-gray-100 transition ${
      direction === 'prev' ? 'left-2' : 'right-2'
    }`}
  >
    {direction === 'prev' ? <FiArrowLeft /> : <FiArrowRight />}
  </button>
);

const Item = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTime, setSelectedTime] = useState(1);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const filteredBikes = bikes.filter((bike) => {
    const matchCategory = selectedCategory === "All" || bike.category === selectedCategory;
    const matchSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === "all" || 
                       (selectedStatus === "available" && !bike.trending) ||
                       (selectedStatus === "rented" && bike.trending);
    return matchCategory && matchSearch && matchStatus;
  });

  const trendingBikes = bikes.filter(bike => bike.trending);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const calculateTotalPrice = () => {
    if (!selectedBike) return 0;
    return selectedBike.price * selectedTime;
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("❗ Please select a color first.");
      return;
    }

    const newCartItem = {
      id: `${selectedBike.id}-${Date.now()}`,
      bike: selectedBike,
      color: selectedColor,
      duration: selectedTime,
      price: calculateTotalPrice()
    };

    setCartItems([...cartItems, newCartItem]);
    setSelectedBike(null);
    setSelectedColor("");
    setSelectedTime(1);
    setShowCart(true);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handlePay = async () => {
    if (cartItems.length === 0) {
      alert("❗ Your cart is empty. Please add items first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bike/add", {
        items: cartItems.map(item => ({
          name: item.bike.name,
          price: item.price,
          color: item.color,
          duration: item.duration,
          status : item.status || "pending"
        }))
      });
      

      if (res.status === 201) {
        navigate("/payment", {
          state: {
            items: cartItems.map(item => ({
              name: item.bike.name,
              price: item.price,
              color: item.color,
              duration: item.duration
            })),
            total: cartItems.reduce((sum, item) => sum + item.price, 0)
          }
        });
      }
    } catch (error) {
      console.error(error);
      alert("❌ Could not process your order.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, trendingBikes.length),
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, trendingBikes.length),
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setShowCart(!showCart)}
          className="bg-[#67103d] text-white p-3 rounded-full shadow-lg hover:bg-[#500c2e] transition relative"
        >
          <FiShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-40 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCart(false)}
          ></div>
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiXCircle size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex border-b pb-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={item.bike.image} 
                            alt={item.bike.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold">{item.bike.name}</h3>
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                          <p className="text-sm text-gray-500">Duration: {timeOptions.find(t => t.value === item.duration)?.label}</p>
                          <p className="font-bold text-[#67103d]">Rs. {item.price}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl text-[#67103d]">
                    Rs. {cartItems.reduce((sum, item) => sum + item.price, 0)}
                  </span>
                </div>
                <button
                  onClick={handlePay}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 rounded-lg text-white font-bold transition ${
                    cartItems.length > 0 ? "bg-[#67103d] hover:bg-[#500c2e]" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
  <h1 className="text-4xl font-bold text-gray-900 mb-3">Premium Bike Rentals</h1>
  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    Explore our collection of high-performance bikes for your next adventure
  </p>
  <div className="flex justify-center mt-6">
    <button
      onClick={() => navigate("/RentalHistory")}
      className="flex items-center gap-2 px-4 py-2 bg-[#67103d] text-white rounded-full hover:bg-[#500c2e] transition"
    >
      <FiBook />
      View Rental History
    </button>
  </div>
</div>


      {/* Trending Section */}
      {trendingBikes.length > 0 && (
        <div className="max-w-5xl mx-auto mb-15">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-gray-900">🔥 Trending Now</h2>
            <div className="flex items-center text-[#67103d]">
              <span className="mr-2">View all</span>
              <FiArrowRight />
            </div>
          </div>
          
          <Slider {...sliderSettings} className="px-4">
            {trendingBikes.map((bike) => (
              <div key={bike.id} className="px-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#67103d] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <FiStar className="mr-1" /> TRENDING
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{bike.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        <FiStar className="mr-1" />
                        <span>{bike.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{bike.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#67103d]">Rs. {bike.price}/hour</span>
                      <button
                        onClick={() => {
                          setSelectedBike(bike);
                          setSelectedColor("");
                          setSelectedTime(1);
                        }}
                        className="bg-[#67103d] text-white px-3 py-1 rounded-lg text-sm flex items-center"
                      >
                        <FiShoppingCart className="mr-1" /> Rent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#67103d] transition duration-300"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300"
              >
                {statusOptions.find(opt => opt.value === selectedStatus)?.icon}
                {statusOptions.find(opt => opt.value === selectedStatus)?.label}
                <FiChevronDown className={`transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} />
              </button>
              {isStatusOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedStatus(option.value);
                        setIsStatusOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${
                        selectedStatus === option.value
                          ? 'bg-[#67103d] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setSelectedCategory(cat.label);
                    setSelectedBike(null);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                    selectedCategory === cat.label
                      ? "bg-[#67103d] text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bike Grid or Selection */}
      {!selectedBike ? (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4">All Bikes</h2>
          {filteredBikes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
              {filteredBikes.map((bike) => (
                <div
                  key={bike.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {bike.trending && (
                      <div className="absolute top-3 left-3 bg-[#67103d] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <FiStar className="mr-1" /> TRENDING
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{bike.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        <FiStar className="mr-1" />
                        <span>{bike.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{bike.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#67103d]">Rs. {bike.price}/hour</span>
                      <button
                        onClick={() => {
                          setSelectedBike(bike);
                          setSelectedColor("");
                          setSelectedTime(1);
                        }}
                        className="bg-[#67103d] text-white px-3 py-1 rounded-lg text-sm flex items-center hover:bg-[#500c2e] transition"
                      >
                        <FiShoppingCart className="mr-1" /> Rent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bikes found matching your criteria</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 md:h-64 relative">
              <img
                src={selectedBike.image}
                alt={selectedBike.name}
                className="w-full h-50 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              {selectedBike.trending && (
                <span className="inline-flex items-center bg-[#67103d] text-white text-xs font-bold px-2 py-1 rounded-full mb-3">
                  <FiStar className="mr-1" /> TRENDING
                </span>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBike.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-4">
                  <FiStar className="mr-1" />
                  <span>{selectedBike.rating}</span>
                </div>
                <span className="text-gray-500">{selectedBike.category}</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-[#67103d]">Rs. {calculateTotalPrice()}</p>
                  <p className="text-gray-500 text-sm mb-1">(Rs. {selectedBike.price}/hour)</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold mb-3">Select Rental Duration:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedTime(option.value)}
                        className={`px-4 py-2 rounded-lg font-medium border-2 transition-all ${
                          selectedTime === option.value
                            ? "bg-[#67103d] text-white border-[#67103d]"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold mb-3">Select Color:</p>
                  <div className="flex gap-3">
                    {["Red", "Blue", "Black"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`px-4 py-2 rounded-lg font-medium border-2 transition-all ${
                          selectedColor === color
                            ? "bg-[#67103d] text-white border-[#67103d]"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedBike(null)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedColor}
                  className={`flex-1 py-2 rounded-lg text-white transition flex items-center justify-center gap-2 ${
                    selectedColor ? "bg-[#67103d] hover:bg-[#500c2e]" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FiShoppingCart /> Add to Cart (Rs. {calculateTotalPrice()})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;