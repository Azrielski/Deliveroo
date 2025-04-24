import React from 'react';

const Search = () => {
  return (
    <div className="w-full max-w-md">
      <p className="text-white mb-2">Enter a postcode to see what we deliver:</p>
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="e.g. EC4R 3TE"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;