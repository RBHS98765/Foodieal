import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom delivery icon
const deliveryIcon = new L.DivIcon({
  className: 'custom-delivery-marker',
  html: `<div style="background: linear-gradient(135deg, #D62828, #F77F00); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(214, 40, 40, 0.4);">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M19 17h1c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 9.6V6c0-1.1-.9-2-2-2h-1V3c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1v1H6c-1.1 0-2 .9-2 2v3.6l-1.5 1.5C1.7 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h1c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3zM6 17c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm12 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
    </svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const destinationIcon = new L.DivIcon({
  className: 'custom-destination-marker',
  html: `<div style="background: #2B2B2B; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const restaurantIcon = new L.DivIcon({
  className: 'custom-restaurant-marker',
  html: `<div style="background: #FCBF49; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(252, 191, 73, 0.4);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#2B2B2B">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function LiveTrackingMap({ status, deliveryAddress }) {
  // Hyderabad coordinates - simulated route
  const restaurantPos = [17.4435, 78.3772]; // Hitech City
  const destinationPos = [17.4500, 78.3850]; // Nearby destination
  
  const [deliveryPos, setDeliveryPos] = useState(restaurantPos);
  const [progress, setProgress] = useState(0);

  // Simulate delivery movement
  useEffect(() => {
    if (status !== 'out_for_delivery') {
      if (status === 'delivered') {
        setDeliveryPos(destinationPos);
        setProgress(100);
      } else {
        setDeliveryPos(restaurantPos);
        setProgress(0);
      }
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = prev + 2;
        const lat = restaurantPos[0] + (destinationPos[0] - restaurantPos[0]) * (newProgress / 100);
        const lng = restaurantPos[1] + (destinationPos[1] - restaurantPos[1]) * (newProgress / 100);
        setDeliveryPos([lat, lng]);
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const routePath = [restaurantPos, destinationPos];

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-[#D62828]" />
          <span className="font-semibold text-[#2B2B2B]">Live Tracking</span>
        </div>
        {status === 'out_for_delivery' && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
      </div>
      
      <div className="h-64 relative">
        <MapContainer
          center={[17.4470, 78.3810]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Route line */}
          <Polyline
            positions={routePath}
            color="#D62828"
            weight={4}
            opacity={0.6}
            dashArray="10, 10"
          />
          
          {/* Restaurant marker */}
          <Marker position={restaurantPos} icon={restaurantIcon}>
            <Popup>Restaurant</Popup>
          </Marker>
          
          {/* Destination marker */}
          <Marker position={destinationPos} icon={destinationIcon}>
            <Popup>{deliveryAddress || 'Your Location'}</Popup>
          </Marker>
          
          {/* Delivery person marker */}
          {(status === 'out_for_delivery' || status === 'delivered') && (
            <Marker position={deliveryPos} icon={deliveryIcon}>
              <Popup>Delivery Partner</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-xs shadow-md z-[1000]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#FCBF49]" />
            <span>Restaurant</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#D62828]" />
            <span>Delivery Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2B2B2B]" />
            <span>Your Location</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}