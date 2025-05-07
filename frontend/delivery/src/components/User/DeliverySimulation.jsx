import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ParcelContext from "../../context/ParcelContext";
import RouteMap from "./RouteMap";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";

function DeliverySimulation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parcels, updateParcel } = useContext(ParcelContext);
  const [parcel, setParcel] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [routeError, setRouteError] = useState(null);

  useEffect(() => {
    const existing = parcels.find((p) => p.id === parseInt(id));
    if (existing) {
      setParcel(existing);
    } else {
      const fetchParcel = async () => {
        try {
          const response = await fetch(`http://localhost:5000/parcels/${id}`);
          if (!response.ok) throw new Error("Failed to fetch parcel");
          setParcel(await response.json());
        } catch (error) {
          console.error("Error fetching parcel:", error);
        }
      };
      fetchParcel();
    }
  }, [id, parcels]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setRouteError(null);
        if (!parcel?.pickup_lat || !parcel?.destination_lat) return;

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${parcel.pickup_lon},${parcel.pickup_lat};${parcel.destination_lon},${parcel.destination_lat}?overview=full&geometries=geojson`
        );

        if (!response.ok) throw new Error("Failed to calculate route");
        const data = await response.json();

        if (data.code !== "Ok")
          throw new Error(data.message || "Route calculation failed");

        setRouteData({
          coordinates: data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]),
        });
      } catch (error) {
        setRouteError(error.message);
      }
    };

    if (parcel) fetchRoute();
  }, [parcel]);

  if (!parcel)
    return (
      <div className="text-center p-8 text-blue-600">
        <FiLoader className="inline-block animate-spin text-4xl mb-4" />
        <p className="text-lg font-medium">Loading simulation...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => navigate(`/parcels/${id}`)}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
      >
        ← Back to Parcel Details
      </button>

      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Delivery for Parcel #{parcel.id}
      </h2>

      <div className="relative">
        {routeError && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg flex items-center gap-2">
            <FiAlertTriangle className="inline-block" />
            {routeError}
          </div>
        )}

        {!routeData && !routeError && (
          <div className="text-center p-4 text-gray-500">
            <FiLoader className="inline-block animate-spin mr-2" />
            Calculating route...
          </div>
        )}

        <RouteMap
          route={routeData?.coordinates || []}
          pickup={[parcel.pickup_lat, parcel.pickup_lon]}
          destination={[parcel.destination_lat, parcel.destination_lon]}
          pickupAddress={parcel.pickup_address}
          destinationAddress={parcel.destination_address}
          animate={true}
          onAnimationEnd={() =>
            updateParcel(parseInt(id), { status: "delivered" })
          }
        />
      </div>
    </div>
  );
}

export default DeliverySimulation;
