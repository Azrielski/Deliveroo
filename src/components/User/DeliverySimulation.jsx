import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ParcelContext from "../../context/ParcelContext";
import RouteMap from "./RouteMap";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";
import authService from "../authService";

function DeliverySimulation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parcels, updateParcel } = useContext(ParcelContext);
  const [parcel, setParcel] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [routeError, setRouteError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const existing = parcels.find((p) => p.id === parseInt(id));
    if (existing) {
      setParcel(existing);
    } else {
      const fetchParcel = async () => {
        try {
          setFetchError(null);
          const token = authService.getToken();
          
          // Debug token
          console.debug("Using token for fetch:", token);
          
          // Check if user is authenticated
          const currentUser = authService.getCurrentUser();
          if (!currentUser || !token) {
            throw new Error("Authentication required");
          }

          const response = await fetch(`http://localhost:5000/parcel/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            credentials: "include" // Send cookies if your server uses them
          });
          
          console.debug("Fetch response status:", response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error("Failed to fetch parcel");
          }
          
          const data = await response.json();
          setParcel(data);
        } catch (error) {
          console.error("Error fetching parcel:", error);
          setFetchError(error.message);
        }
      };
      fetchParcel();
    }
  }, [id, parcels]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setRouteError(null);
        if (
          !parcel?.pickup_lat ||
          !parcel?.pickup_lon ||
          !parcel?.destination_lat ||
          !parcel?.destination_lon
        ) {
          setRouteError("Invalid parcel coordinates");
          return;
        }

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

  if (fetchError) {
    return (
      <div className="text-center p-8 text-red-600">
        <FiAlertTriangle className="inline-block text-4xl mb-4" />
        <p className="text-lg font-medium">Error: {fetchError}</p>
        <button
          onClick={() => navigate("/user/parcels")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Parcels
        </button>
      </div>
    );
  }

  if (!parcel)
    return (
      <div className="text-center p-8 text-blue-600">
        <FiLoader className="inline-block animate-spin text-4xl mb-4" />
        <p className="text-lg font-medium">Loading simulation...</p>
      </div>
    );

  if (
    !parcel.pickup_lat ||
    !parcel.pickup_lon ||
    !parcel.destination_lat ||
    !parcel.destination_lon
  ) {
    return (
      <div className="text-center p-8 text-red-600">
        <FiAlertTriangle className="inline-block text-4xl mb-4" />
        <p className="text-lg font-medium">Invalid parcel coordinates</p>
        <button
          onClick={() => navigate(`/user/parcels/${id}`)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Parcel Details
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => navigate(`/user/parcels/${id}`)}
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