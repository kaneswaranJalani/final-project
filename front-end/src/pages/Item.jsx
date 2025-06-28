import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiUser, FiSmile, FiShoppingCart } from "react-icons/fi";

import bike1 from "../assets/bike1.jpg";
import bike2 from "../assets/bike2.jpg";
import bike3 from "../assets/bike3.jpg";
import bike4 from "../assets/bike4.jpg";
import bike5 from "../assets/bike5.jpg";
import bike6 from "../assets/bike6.jpg";

const bikes = [
  { id: 1, image: bike1, name: "Speedster X", price: "1000", category: "Man" },
  { id: 2, image: bike2, name: "Retro Lady", price: "1500", category: "Female" },
  { id: 3, image: bike3, name: "Mountain Pro", price: "1300", category: "Man" },
  { id: 4, image: bike4, name: "City Cruiser", price: "1200", category: "Child" },
  { id: 5, image: bike5, name: "Dirt King", price: "1000", category: "Child" },
  { id: 6, image: bike6, name: "Vintage Ride", price: "1800", category: "Man" }
];

const categories = [
  { label: "All", icon: <FiSearch /> },
  { label: "Man", icon: <FiUser /> },
  { label: "Female", icon: <FiUser /> },
  { label: "Child", icon: <FiSmile /> }
];

const Item = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate();

  const filteredBikes = bikes.filter((bike) => {
    const matchCategory = selectedCategory === "All" || bike.category === selectedCategory;
    const matchSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handlePay = async () => {
    if (!selectedColor) {
      alert("❗ Please select a color first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bike/add", {
        name: selectedBike.name,
        price: selectedBike.price,
        color: selectedColor
      });

      if (res.status === 201) {
        navigate("/payment", {
          state: {
            name: selectedBike.name,
            price: selectedBike.price,
            color: selectedColor
          }
        });
      }
    } catch (error) {
      console.error(error);
      alert("❌ Could not save selected bike.");
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* Search & Filter */}
      <div className="text-center space-y-4 mb-8">
        <div className="relative w-full max-w-md mx-auto">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Trending Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#67103d]"
          />
        </div>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                setSelectedCategory(cat.label);
                setSelectedBike(null);
              }}
              className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm transition ${
                selectedCategory === cat.label
                  ? "bg-[#67103d] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bike Grid or Selection */}
      {!selectedBike ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredBikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden p-4 text-center"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-48 h-32 object-cover mx-auto rounded"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-3">{bike.name}</h3>
              <p className="text-sm text-gray-500">Rs. {bike.price}</p>
              <button
                onClick={() => {
                  setSelectedBike(bike);
                  setSelectedColor("");
                }}
                className="mt-2 bg-[#67103d] text-white px-6 py-1 rounded-md text-sm hover:bg-[#4e0e2e] flex items-center justify-center gap-2 mx-auto"
              >
                <FiShoppingCart />
                Rent
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow max-w-lg mx-auto text-center">
          <img
            src={selectedBike.image}
            alt={selectedBike.name}
            className="w-64 h-40 object-cover mx-auto rounded mb-4"
          />
          <h2 className="text-2xl font-bold text-[#67103d] mb-2">{selectedBike.name}</h2>
          <p className="text-lg text-gray-700 mb-4">Price: Rs. {selectedBike.price}</p>

          <div className="mb-4">
            <p className="font-semibold mb-2">Choose a color:</p>
            <div className="flex justify-center gap-4">
              {["Red", "Blue", "Black"].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-4 py-1 rounded-full text-sm font-medium border ${
                    selectedColor === color
                      ? "bg-[#67103d] text-white border-[#67103d]"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePay}
            className="bg-[#67103d] text-white px-6 py-2 rounded-full hover:bg-[#500c2e] transition"
          >
            💳 Proceed to Pay
          </button>

          <div className="mt-4">
            <button
              onClick={() => setSelectedBike(null)}
              className="text-sm text-gray-500 underline"
            >
              ← Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
