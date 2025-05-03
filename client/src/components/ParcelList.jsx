import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ParcelContext from '../context/ParcelContext';
import { FiEye, FiXCircle, FiTruck, FiInfo, FiMapPin, FiPackage,FiFlag } from 'react-icons/fi';

function ParcelList() {
  const { parcels, cancelParcel, loading, error } = useContext(ParcelContext);

  if (loading) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center p-8 text-blue-600 animate-pulse">
        <div className="animate-bounce">
          <FiTruck className="inline-block text-4xl mb-4" />
        </div>
        <p className="text-lg font-medium">Loading shipments...</p>
        <p className="text-sm text-blue-400 mt-2">Please wait a moment</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center p-8 bg-red-50 rounded-xl border border-red-100">
        <FiInfo className="inline-block text-red-600 text-3xl mb-4 animate-pulse" />
        <p className="text-red-600 font-medium text-lg">Oops! Something went wrong</p>
        <p className="text-red-500 text-sm mt-2 max-w-md mx-auto">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-100 rounded-xl">
          <FiTruck className="text-3xl text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Shipments</h1>
          <p className="text-sm text-gray-500 mt-1">{parcels.length} Deliveries</p>
        </div>
      </div>

      <div className="grid gap-5">
        {parcels.map(parcel => (
          <div 
            key={parcel.id}
            className="group p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 
            border-blue-200 hover:border-blue-400 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-100 group-hover:bg-blue-400 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide ${
                    parcel.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    parcel.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {parcel.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                    <FiPackage className="text-blue-400" />
                    #{parcel.id}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-gray-800 font-medium">{parcel.description}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                      {parcel.weight}kg
                    </span>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-blue-500">
                        <FiMapPin className="flex-shrink-0" />
                        <span className="text-gray-700">{parcel.pickup_address}</span>
                      </div>
                      <span className="text-gray-300 mx-1">→</span>
                      <div className="flex items-center gap-2 text-green-600">
                        <FiFlag className="flex-shrink-0" />
                        <span className="text-gray-700">{parcel.destination_address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Link
                  to={`/parcels/${parcel.id}`}
                  className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-lg transition-all 
                  flex items-center gap-2 border border-blue-200 hover:border-blue-300 text-sm font-medium
                  justify-center"
                >
                  <FiEye className="inline-block" /> View Details
                </Link>
                
                {parcel.status === 'pending' && (
                  <button
                    onClick={() => cancelParcel(parcel.id)}
                    className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 rounded-lg transition-all
                    flex items-center gap-2 border border-red-200 hover:border-red-300 text-sm font-medium
                    justify-center"
                  >
                    <FiXCircle className="inline-block" /> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {parcels.length === 0 && (
        <div className="text-center p-8 bg-blue-50 rounded-xl mt-6 border border-blue-100">
          <FiInfo className="inline-block text-blue-600 text-3xl mb-4" />
          <p className="text-blue-600 font-medium text-lg">No shipments found</p>
          <p className="text-blue-400 text-sm mt-2">Create a new parcel to get started</p>
        </div>
      )}
    </div>
  );
};

export default ParcelList;