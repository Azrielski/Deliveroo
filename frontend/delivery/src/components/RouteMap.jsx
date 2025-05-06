import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {  useState ,useRef ,useEffect} from 'react'; 

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RouteMap({ pickup, destination, route ,pickupAddress,      
  destinationAddress }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [progressPath, setProgressPath] = useState([]);
  const intervalRef = useRef(null); 

  const position = pickup || destination || [0, 0];
  const destinationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Add truck icon
  const truckIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 46],
    iconAnchor: [15, 46],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  
  
  const startAnimation = () => {
    if (!route || route.length < 2) return;

    // Reset animation state
    setCurrentPosition(null);
    setProgressPath([]);

    let step = 0;
    const totalSteps = route.length;
    intervalRef.current = setInterval(() => {
      if (step < totalSteps) {
        setCurrentPosition(route[step]);
        setProgressPath(prev => [...prev, route[step]]);
        step++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setAnimationInterval(null);
      }
    }, 100);

    setAnimationInterval(intervalRef.current);
  };

  
  
  const handleSimulationToggle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setAnimationInterval(null);
    } else {
      startAnimation();
    }
  };

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative">
       <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md flex gap-2">
        <button 
          onClick={handleSimulationToggle}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {intervalRef.current ? '⏹️ Stop' : '▶️ Simulate Delivery'}
        </button>
      </div>
      
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

        {/* Animated truck marker */}
        {currentPosition && (
          <Marker position={currentPosition} icon={truckIcon}>
            <Popup>🚚 Parcel in transit</Popup>
          </Marker>
        )}

        {/* Progress path */}
        {progressPath.length > 1 && (
          <Polyline
            positions={progressPath}
            color="#16a34a"
            weight={3}
            opacity={0.9}
          />
        )}

        {/* Full route (dashed) */}
        {route && (
          <Polyline 
            positions={route} 
            color="#2563eb" 
            weight={2}
            opacity={0.5}
            dashArray="5, 5"
          />
        )}

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


 