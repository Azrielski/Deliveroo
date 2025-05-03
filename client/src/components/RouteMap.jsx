import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RouteMap({ pickup, destination, route ,pickupAddress,      
  destinationAddress }) {
  const position = pickup || destination || [0, 0];
  const destinationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative">
      <MapContainer 
        center={position} 
        zoom={pickup && destination ? 13 : 5} 
        className="h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickup && (
          <Marker position={pickup} >
            <Popup className="text-lg font-medium">
              🚚 Pickup Location
              <br />
              <span className="text-sm text-gray-600">{pickupAddress || "Unknown address"}</span>
            </Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup className="text-lg font-medium" >
              🏁 Destination
              <br />
              <span className="text-sm text-gray-600">{destinationAddress || "Unknown address"}</span>
            </Popup>
          </Marker>
        )}


        {route && (
          <Polyline 
            positions={route} 
            color="#2563eb" 
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-md">
        <span className="text-sm font-medium text-gray-700">
          🗺️ Scroll to zoom | 🖱️ Drag to pan
        </span>
      </div>
    </div>
  );
}


 