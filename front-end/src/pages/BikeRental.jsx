// BikeRental.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BikeList from "./BikeList";

const BikeRental = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bikes");
        setBikes(res.data);
      } catch (err) {
        console.error("Error fetching bikes:", err);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-[#67103d] mt-6">Available Bikes</h1>
      <BikeList bikes={bikes} />
    </div>
  );
};

export default BikeRental;
