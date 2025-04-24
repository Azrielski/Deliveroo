import React from 'react';

const PartnerSection = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular in your area</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* This would typically be populated from an API */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Restaurant Name</h3>
              <p className="text-sm text-gray-500">$$$ • Cuisine Type</p>
              <div className="flex items-center mt-2">
                <div className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">4.8</div>
                <span className="text-xs text-gray-500 ml-2">30-45 min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;