import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef, useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const truckIcon = new L.Icon({
  iconUrl: "/truck.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45],
  className: "animated-truck",
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function RouteMap({
  pickup,
  destination,
  route = [],
  pickupAddress,
  destinationAddress,
  animate,
  onAnimationEnd,
}) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [progressPath, setProgressPath] = useState([]);
  const intervalRef = useRef(null);

  const getPosition = () => {
    if (pickup?.length === 2) return pickup;
    if (destination?.length === 2) return destination;
    return [0, 0];
  };

  useEffect(() => {
    if (animate && route?.length > 1) {
      startAnimation();
    } else {
      resetAnimation();
    }

    return () => resetAnimation();
  }, [animate, route]);

  const startAnimation = () => {
    if (!Array.isArray(route) || route.length < 2) return;

    resetAnimation();
    let step = 0;
    intervalRef.current = setInterval(() => {
      if (step < route.length) {
        const coord = route[step];
        if (coord?.length === 2) {
          setCurrentPosition(coord);
          setProgressPath((prev) => [...prev, coord]);
        }
        step++;
      } else {
        resetAnimation();
        if (onAnimationEnd) onAnimationEnd();
      }
    }, 100);
  };

  const resetAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentPosition(null);
    setProgressPath([]);
  };

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative">
      <MapContainer
        center={getPosition()}
        zoom={pickup && destination ? 13 : 5}
        className="h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Animated truck marker */}
        {currentPosition?.length === 2 && (
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
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="#2563eb"
            weight={2}
            opacity={0.5}
            dashArray="5, 5"
          />
        )}

        {/* Pickup marker */}
        {pickup?.length === 2 && (
          <Marker position={pickup}>
            <Popup className="text-lg font-medium">
              🚚 Pickup Location
              <br />
              <span className="text-sm text-gray-600">
                {pickupAddress || "Unknown address"}
              </span>
            </Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {destination?.length === 2 && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup className="text-lg font-medium">
              🏁 Destination
              <br />
              <span className="text-sm text-gray-600">
                {destinationAddress || "Unknown address"}
              </span>
            </Popup>
          </Marker>
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
