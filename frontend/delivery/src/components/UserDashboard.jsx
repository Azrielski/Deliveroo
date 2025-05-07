// UserDashboard.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ParcelContext from '../context/ParcelContext';
import { FiEye, FiXCircle, FiTruck, FiInfo, FiMapPin, FiPlusCircle } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UserDashboard() {
  const { parcels, cancelParcel, loading, error } = useContext(ParcelContext);

  // Status configuration with colors and icons
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    'in transit': { color: 'bg-purple-100 text-purple-800', label: 'In Transit' },
    delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
  };

  // Calculate status counts
  const statusCounts = parcels.reduce((acc, parcel) => {
    acc.total++;
    acc[parcel.status] = (acc[parcel.status] || 0) + 1;
    return acc;
  }, { total: 0 });

  if (loading) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={120} borderRadius={16} />
        ))}
      </div>
      <Skeleton height={400} borderRadius={16} />
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
        <FiInfo className="inline-block text-red-600 text-3xl mb-4 animate-pulse" />
        <h2 className="text-red-600 font-medium text-lg mb-2">Oops! Something went wrong</h2>
        <p className="text-red-500 text-sm mb-4 max-w-md mx-auto">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full xl:px-20 px-6 py-8">
    {/* Header */}
    <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
      <div>
        <h1 className="text-4xl font-semibold text-gray-900 mb-1">Welcome back, User!</h1>
        <p className="text-gray-500 text-sm">Easily track and manage your shipments in one place.</p>
      </div>
      <Link
        to="/create"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-transform duration-200 hover:scale-105 shadow-lg"
      >
        <FiPlusCircle className="text-xl" />
        New Shipment
      </Link>
    </div>
  
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {[
        { status: 'total', label: 'Total Parcels', color: 'border-blue-500', icon: <FiTruck /> },
        { status: 'pending', label: 'Pending', color: 'border-yellow-500', icon: <FiInfo /> },
        { status: 'cancelled', label: 'Cancelled', color: 'border-red-500', icon: <FiXCircle /> },
        { status: 'delivered', label: 'Delivered', color: 'border-green-500', icon: <FiTruck /> },
      ].map(({ status, label, color, icon }) => (
        <div
          key={status}
          className={`bg-white p-6 rounded-2xl border-l-4 ${color} shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm text-gray-500 font-medium">{label}</h3>
            <span className="text-gray-400 text-2xl">{icon}</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts[status] || 0}</p>
        </div>
      ))}
    </div>
  
    {/* Recent Shipments Table */}
    {parcels.length > 0 ? (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Shipments</h2>
          <span className="text-sm text-gray-500">{parcels.length} items</span>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['ID', 'Description', 'Weight', 'Destination', 'Status', 'Actions'].map(header => (
                  <th key={header} className="px-6 py-4 text-left font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parcels.map(parcel => (
                <tr key={parcel.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">#{String(parcel.id).slice(0, 8)}</td>
                  <td className="px-6 py-4 max-w-[220px] truncate text-gray-700">{parcel.description}</td>
                  <td className="px-6 py-4 text-gray-700">{parcel.weight} kg</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-blue-500 flex-shrink-0" />
                      <span className="truncate max-w-[180px] text-gray-700">{parcel.destination_address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusConfig[parcel.status]?.color || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {statusConfig[parcel.status]?.label || parcel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/parcels/${parcel.id}`}
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                        aria-label="View shipment"
                      >
                        <FiEye className="text-lg" />
                      </Link>
                      {parcel.status === 'pending' && (
                        <button
                          onClick={() => cancelParcel(parcel.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
                          aria-label="Cancel shipment"
                        >
                          <FiXCircle className="text-lg" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="text-center p-12 bg-blue-50 rounded-2xl border border-blue-200">
        <FiTruck className="inline-block text-blue-600 text-5xl mb-4 animate-bounce" />
        <h2 className="text-blue-700 text-xl font-semibold mb-2">No shipments found</h2>
        <p className="text-blue-500 text-sm mb-6">Start by creating your first shipment.</p>
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition"
        >
          <FiPlusCircle />
          Create New Shipment
        </Link>
      </div>
    )}
  </div>
  
  );
}

export default UserDashboard;