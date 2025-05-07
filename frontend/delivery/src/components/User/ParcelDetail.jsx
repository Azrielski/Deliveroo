import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ParcelContext from "../../context/ParcelContext";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";

function ParcelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parcels, updateParcel } = useContext(ParcelContext);
  const [parcel, setParcel] = useState(null);
  const [newDestination, setNewDestination] = useState("");
  const [routeData, setRouteData] = useState(null);
  const [routeError, setRouteError] = useState(null);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json`,
        { headers: { "User-Agent": "Deliveroo-App/1.0" } }
      );
      const data = await response.json();
      return data[0]
        ? [parseFloat(data[0].lat), parseFloat(data[0].lon)]
        : null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

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
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
          coordinates: data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]),
        });
      } catch (error) {
        setRouteError(error.message);
      }
    };

    fetchRoute();
  }, [parcel]);

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

  const handleUpdate = async () => {
    if (!newDestination.trim()) return;
    try {
      const newCoords = await geocodeAddress(newDestination);
      if (!newCoords) throw new Error("Could not geocode new destination");

      await updateParcel(id, {
        destination: newDestination,
        destination_lat: newCoords[0],
        destination_lon: newCoords[1],
      });

      setNewDestination("");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const formatDuration = (seconds) => {
    const totalMinutes = Math.round(seconds / 60);
    if (totalMinutes < 60) return `${totalMinutes} minutes`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (!parcel)
    return (
      <div className="text-center p-8 text-blue-600">
        <FiLoader className="inline-block animate-spin text-4xl mb-4" />
        <p className="text-lg font-medium">Loading parcel details...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
      >
        ← Back to Dashboard
      </button>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Parcel #{parcel.id}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Status</h3>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              parcel.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : parcel.status === "delivered"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {parcel.status}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">
            Current Location
          </h3>
          <p className="font-medium">
            {parcel.present_location || "In transit"}
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        {/* Recipient Name */}
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">
            Recipient Name:
          </span>
          <span className="font-medium">{parcel.recipient_name}</span>
        </div>

        {/* Recipient Phone */}
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">
            Recipient Phone:
          </span>
          <span className="font-medium">{parcel.recipient_phone}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">
            Description:
          </span>
          <span className="font-medium">{parcel.description}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">Weight:</span>
          <span className="font-medium">{parcel.weight} kg</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">
            Pickup Address:
          </span>
          <span className="font-medium text-right max-w-[200px]">
            {parcel.pickup_address}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-600">
            Destination:
          </span>
          <span className="font-medium text-right max-w-[200px]">
            {parcel.destination}
          </span>
        </div>
      </div>

      {parcel.status === "pending" && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium text-blue-600 mb-4">
            Update Destination
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new destination"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              aria-label="New destination address"
            />
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {parcel.status !== "cancelled" && parcel.status !== "delivered" && (
        <div className="mt-8 space-y-6">
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

          {routeData && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-blue-600">Distance</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {(routeData.distance / 1000).toFixed(1)} km
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-blue-600">
                  Estimated Duration
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {formatDuration(routeData.duration)}
                </p>
              </div>
            </div>
          )}

          {routeData && (
            <div className="flex justify-between items-center mb-4">
              <Link
                to={`/parcels/${parcel.id}/simulation`}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-sm"
              >
                View Live Delivery →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ParcelDetail;
