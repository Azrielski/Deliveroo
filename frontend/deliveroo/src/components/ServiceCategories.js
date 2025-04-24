import React from 'react';

const ServiceCategories = () => {
  const categories = [
    { title: 'Partner with us', description: 'Join Deliveroo and reach more customers than ever. We handle delivery, so you can focus on the food.' },
    { title: 'Ride with us', description: 'The freedom to fit work around your life. Plus great fees, perks and discounts.' },
    { title: 'Deliveroo for Work', description: 'From team lunches to meal allowances for your late night workers, we\'ve got your workplace meals covered.' },
    { title: 'Gift Cards', description: 'Looking for an easy way to treat your friends and family? Give the gift of great food with a Deliveroo gift card.' },
  ];

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
              <p className="mt-2 text-gray-600">{category.description}</p>
              <button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                Get started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;