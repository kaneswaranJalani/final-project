import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSmartphone, FiMapPin, FiClock, FiBattery, FiUser, FiNavigation, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { FaBicycle } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bicycle icon
const createBicycleIcon = () => {
  return new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const BicycleTrackingSystem = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [bicycleData, setBicycleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  
  // Map references
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Initialize map only once
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Default to Chennai coordinates if no bicycle data
      const defaultLat = 13.0827;
      const defaultLng = 80.2707;
      
      mapRef.current = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], 13);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Update map when bicycle data changes
  useEffect(() => {
    if (!bicycleData || !mapRef.current) return;

    const { lat, lng } = bicycleData.location;
    
    // Update map view
    mapRef.current.setView([lat, lng], 15);
    
    // Remove existing marker if any
    if (markerRef.current) {
      markerRef.current.remove();
    }
    
    // Add new marker
    markerRef.current = L.marker([lat, lng], { icon: createBicycleIcon() })
      .addTo(mapRef.current)
      .bindPopup(`Bicycle ${bicycleData.bicycleId}`);
    
  }, [bicycleData]);

  // Fetch bicycle data from API
  const fetchBicycleData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, replace this with your actual API call
      // const response = await fetch(`https://your-api-endpoint.com/tracking?phone=${searchPhone}`);
      // const data = await response.json();
      
      // For demo purposes, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const mockData = createMockData();
      
      setBicycleData(mockData);
      setLastUpdated(new Date().toLocaleTimeString());
      
    } catch (err) {
      setError(err.message || 'Failed to fetch bicycle data');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock data generator (for testing only)
  const createMockData = () => {
    const latMovement = (Math.random() * 0.002 - 0.001);
    const lngMovement = (Math.random() * 0.002 - 0.001);
    
    return {
      phoneNumber: searchPhone,
      bicycleId: `RBK${searchPhone.slice(-4)}`,
      status: 'in-use',
      battery: Math.max(10, Math.floor(Math.random() * 30) + 70),
      location: {
        lat: 13.0827 + latMovement,
        lng: 80.2707 + lngMovement,
        address: getRandomAddress(latMovement, lngMovement)
      },
      user: {
        name: searchPhone === '9876543210' ? 'Ramesh Kumar' : 'Customer',
        startTime: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: calculateTripDuration(),
        distance: calculateTripDistance(latMovement, lngMovement)
      },
      lastUpdated: new Date().toISOString()
    };
  };

  // Helper functions for mock data
  const getRandomAddress = (latDiff, lngDiff) => {
    const streets = ['Mount Road', 'Anna Salai', 'GST Road', 'OMR', 'ECR'];
    const area = latDiff > 0 ? 'North' : 'South';
    const block = Math.floor(Math.random() * 100);
    return `${block} ${streets[Math.floor(Math.random() * streets.length)]}, ${area} Chennai`;
  };

  const calculateTripDuration = () => {
    const mins = Math.floor(Math.random() * 30) + 5;
    return `${mins} mins`;
  };

  const calculateTripDistance = (latDiff, lngDiff) => {
    const distance = Math.sqrt(latDiff*latDiff + lngDiff*lngDiff) * 111;
    return `${distance.toFixed(1)} km`;
  };

  // Handle phone number search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!phoneNumber.match(/^[0-9]{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setSearchPhone(phoneNumber);
  };

  // Fetch data when searchPhone changes
  useEffect(() => {
    if (!searchPhone) return;
    
    fetchBicycleData();
    const interval = setInterval(fetchBicycleData, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(interval);
  }, [searchPhone]);

  // Open navigation in Google Maps
  const handleNavigate = () => {
    if (bicycleData) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${bicycleData.location.lat},${bicycleData.location.lng}&travelmode=driving`,
        '_blank'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-xl font-bold text-[#67103d] mb-4 flex items-center gap-2">
            <FiSmartphone /> Find Your Bicycle
          </h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSmartphone className="text-gray-400" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your phone number"
                maxLength={10}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#67103d] text-white rounded-lg hover:bg-[#4c092b] flex items-center"
            >
              <FiSearch />
            </button>
          </form>
          
          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FiAlertCircle /> {error}
            </p>
          )}
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#67103d] mx-auto mb-4"></div>
            <p>Searching for bicycle linked to {searchPhone}...</p>
          </div>
        )}

        {bicycleData && !loading && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-[#67103d] text-white p-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold flex items-center gap-2">
                  <FaBicycle /> Bicycle {bicycleData.bicycleId}
                </h2>
                <p className="text-sm text-[#d9b8c8] flex items-center gap-1">
                  <FiClock size={14} /> Updated: {lastUpdated}
                </p>
              </div>
              <button 
                onClick={fetchBicycleData}
                className="p-1 bg-white/20 rounded-full hover:bg-white/30"
              >
                <FiRefreshCw />
              </button>
            </div>

            {/* Map Container */}
            <div 
              ref={mapContainerRef}
              className="h-64 z-0"
              style={{ minHeight: '256px' }}
            ></div>

            {/* Status Cards */}
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="bg-[#f9f0f5] p-3 rounded-lg">
                <p className="text-sm text-[#8a5a75] mb-1">Battery</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-[#e8d8e1] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-[#67103d]" 
                      style={{ width: `${bicycleData.battery}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold">{bicycleData.battery}%</span>
                </div>
              </div>

              <div className="bg-[#f9f0f5] p-3 rounded-lg">
                <p className="text-sm text-[#8a5a75] mb-1">Status</p>
                <p className="font-semibold capitalize">{bicycleData.status}</p>
              </div>

              <div className="bg-[#f9f0f5] p-3 rounded-lg">
                <p className="text-sm text-[#8a5a75] mb-1">Duration</p>
                <p className="font-semibold">{bicycleData.user.duration}</p>
              </div>

              <div className="bg-[#f9f0f5] p-3 rounded-lg">
                <p className="text-sm text-[#8a5a75] mb-1">Distance</p>
                <p className="font-semibold">{bicycleData.user.distance}</p>
              </div>
            </div>

            <div className="p-4 border-t border-[#e8d8e1]">
              <h3 className="font-semibold text-[#67103d] mb-2 flex items-center gap-2">
                <FiUser /> Rider Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span>{bicycleData.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span>{bicycleData.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trip Started</span>
                  <span>{bicycleData.user.startTime}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#e8d8e1] flex gap-3">
              <button 
                onClick={handleNavigate}
                className="flex-1 py-2 bg-[#67103d] text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FiNavigation /> Navigate
              </button>
              <button className="flex-1 py-2 border border-[#67103d] text-[#67103d] rounded-lg">
                End Ride
              </button>
            </div>
          </div>
        )}

        {!bicycleData && !loading && searchPhone && (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaBicycle className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No active bicycle found
            </h3>
            <p className="text-gray-500">
              We couldn't find any bicycle linked to {searchPhone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BicycleTrackingSystem;