// // src/components/Map.jsx
// import { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const Map = ({ center, markerPosition }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     // Initialize map
//     mapRef.current = L.map('map').setView(center, 15);

//     // Add tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(mapRef.current);

//     // Add marker
//     const bikeIcon = L.icon({
//       iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });

//     markerRef.current = L.marker(markerPosition, { icon: bikeIcon }).addTo(mapRef.current);

//     return () => {
//       mapRef.current.remove();
//     };
//   }, [center, markerPosition]);

//   return <div id="map" style={{ height: '100%', width: '100%' }} />;
// };

// export default Map;