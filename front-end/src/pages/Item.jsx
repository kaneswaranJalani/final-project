import React, { useState } from "react";

const bikes = [
  {
    id: 1,
    image: "/images/bike1.jpg",
    name: "Speedster X",
    price: "Rs. 12,000",
    category: "Man"
  },
  {
    id: 2,
    image: "/images/bike2.jpg",
    name: "Retro Lady",
    price: "Rs. 10,500",
    category: "Female"
  },
  {
    id: 3,
    image: "/images/bike3.jpg",
    name: "Mountain Pro",
    price: "Rs. 15,300",
    category: "Man"
  },
  {
    id: 4,
    image: "/images/bike4.jpg",
    name: "City Cruiser",
    price: "Rs. 11,200",
    category: "Child"
  },
  {
    id: 5,
    image: "/images/bike5.jpg",
    name: "Dirt King",
    price: "Rs. 14,000",
    category: "Child"
  },
  {
    id: 6,
    image: "/images/bike6.jpg",
    name: "Vintage Ride",
    price: "Rs. 13,800",
    category: "Man"
  }
];

const categories = ["All", "Man", "Female", "Child"];

const Item = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBikes = bikes.filter((bike) => {
    const matchCategory = selectedCategory === "All" || bike.category === selectedCategory;
    const matchSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* Filters */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-white border rounded-lg shadow text-sm font-medium">Brand new</button>
          <button className="px-4 py-2 bg-white border rounded-lg shadow text-sm font-medium">Rent now</button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#67103d]"
        />

        <div className="flex justify-center gap-4 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm ${
                selectedCategory === cat
                  ? "bg-[#67103d] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{bike.name}</h3>
              <p className="text-sm text-gray-500">{bike.price}</p>
              <button className="mt-2 bg-[#67103d] text-white px-6 py-1 rounded-md text-sm hover:bg-[#4e0e2e]">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
