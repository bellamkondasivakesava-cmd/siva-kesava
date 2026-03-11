import React, { useState, useEffect } from 'react';
import { Map as MapIcon, Shield, Heart, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/api/leaflet/1.7.1/images/marker-shadow.png',
});

const SafetyMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setUserLocation([51.505, -0.09]);
        }
      );
    } else {
      setUserLocation([51.505, -0.09]);
    }
  }, []);

  const emergencyPlaces = [
    { id: 1, name: "City Police Station", type: "Police", pos: [51.505, -0.09] as [number, number] },
    { id: 2, name: "General Hospital", type: "Hospital", pos: [51.51, -0.1] as [number, number] },
    { id: 3, name: "Tourist Information Center", type: "Safe Area", pos: [51.501, -0.08] as [number, number] },
  ];

  if (!userLocation) return <div className="h-[600px] flex items-center justify-center">Loading Map...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center">
            <MapIcon className="mr-3 w-8 h-8 text-teal-600" />
            Interactive Safety Map
          </h2>
          <p className="mt-2 text-slate-600">Find nearby police stations, hospitals, and safe zones in real-time.</p>
        </div>
        
        <div className="h-[600px] relative">
          <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
            {emergencyPlaces.map(place => (
              <Marker key={place.id} position={place.pos}>
                <Popup>
                  <div className="p-1">
                    <p className="font-bold text-slate-900">{place.name}</p>
                    <p className="text-xs text-teal-600 font-semibold uppercase">{place.type}</p>
                    <button className="mt-2 text-xs bg-teal-600 text-white px-3 py-1 rounded-md">Get Directions</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="p-8 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Police Stations</p>
              <p className="text-xs text-slate-500">Blue markers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-red-100 p-3 rounded-xl mr-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Hospitals</p>
              <p className="text-xs text-slate-500">Red markers</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <Navigation className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Safe Zones</p>
              <p className="text-xs text-slate-500">Green markers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
