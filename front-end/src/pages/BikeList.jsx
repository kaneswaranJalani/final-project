import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiSmile, FiStar, FiArrowRight, FiBook, FiShoppingCart } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Bike images (replace with your actual image imports)
import bike1 from '../assets/bike1.jpg';
import bike2 from '../assets/bike2.jpg';
import bike3 from '../assets/bike3.jpg';
import bike4 from '../assets/bike4.jpg';
import bike5 from '../assets/bike5.jpg';
import bike6 from '../assets/bike6.jpg';

const bikes = [
  { id: 1, image: bike1, name: 'Speedster X', price: 100, category: 'Man', trending: true, rating: 4.8 },
  { id: 2, image: bike2, name: 'Retro Lady', price: 150, category: 'Female', trending: false, rating: 4.5 },
  { id: 3, image: bike3, name: 'Mountain Pro', price: 130, category: 'Man', trending: true, rating: 4.9 },
  { id: 4, image: bike4, name: 'City Cruiser', price: 120, category: 'Child', trending: false, rating: 4.2 },
  { id: 5, image: bike5, name: 'Dirt King', price: 100, category: 'Child', trending: true, rating: 4.7 },
  { id: 6, image: bike6, name: 'Vintage Ride', price: 180, category: 'Man', trending: false, rating: 4.6 }
];

const categories = [
  { label: 'All', icon: <FiSearch /> },
  { label: 'Man', icon: <FiUser /> },
  { label: 'Female', icon: <FiUser /> },
  { label: 'Child', icon: <FiSmile /> }
];

const BikeList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const filteredBikes = bikes.filter((bike) => {
    const matchCategory = selectedCategory === 'All' || bike.category === selectedCategory;
    const matchSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const trendingBikes = bikes.filter(bike => bike.trending);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, trendingBikes.length),
    slidesToScroll: 1,
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

  const handleBikeSelect = (bike) => {
    navigate('/BikeSelection', {
      state: { selectedBike: bike }
    });
  };

  const navigateToCart = () => {
    navigate('/CartPage', {
      state: { cartItems }
    });
  };

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Navbar with Cart Button */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#67103d]">BikeRental</h1>
        <button 
          onClick={navigateToCart}
          className="relative p-2 text-[#67103d] hover:bg-gray-100 rounded-full transition"
        >
          <FiShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Premium Bike Rentals</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our collection of high-performance bikes for your next adventure
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/UserDashboard')}
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
            <div 
              className="flex items-center text-[#67103d] cursor-pointer"
              onClick={() => navigate('/trending-bikes')}
            >
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
                        onClick={() => handleBikeSelect(bike)}
                        className="bg-[#67103d] text-white px-3 py-1 rounded-lg text-sm flex items-center"
                      >
                        Rent Now
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

          <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
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

      {/* Bike Grid */}
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
                      onClick={() => handleBikeSelect(bike)}
                      className="bg-[#67103d] text-white px-3 py-1 rounded-lg text-sm flex items-center hover:bg-[#500c2e] transition"
                    >
                      Rent Now
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
    </div>
  );
};

export default BikeList;