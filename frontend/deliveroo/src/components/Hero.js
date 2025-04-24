import React from 'react';

const Hero = () => {
  return (
    <div className="bg-teal-400 relative overflow-hidden w-full">
      {/* Main Container with Images and Content */}
      <div className="relative w-full min-h-[420px]">
        {/* Left Image (Grocery Bag) */}
        <div className="absolute left-0 bottom-0 w-1/3 max-w-[350px] z-10">
          <img 
            src="https://unsplash.com/photos/brown-wooden-rolling-pin-beside-white-paper-bag-_kUCAyYFVBI " 
            alt="Grocery bag with food items" 
            className="object-contain"
          />
        </div>
        
        {/* Right Image (Burger) */}
        <div className="absolute right-0 bottom-0 w-1/3 max-w-[350px] z-10">
          <img 
            src="https://unsplash.com/photos/burger-with-lettuce-and-tomato-xBzProAYlBM " 
            alt="Burger" 
            className="object-contain"
          />
        </div>
        
        {/* Center Content */}
        <div className="container mx-auto px-6 py-8 relative z-20">
          {/* Header with Logo and Nav commented out */}
          
          {/* Main Content */}
          <div className="max-w-xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Restaurants, takeaways, supermarkets and shops. Delivered.
            </h1>
            
            {/* Search Box */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 text-left">Enter a postcode to see what we deliver:</p>
              <div className="flex w-full">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-3 flex items-center text-teal-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="e.g. EC4R 3TE" 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  />
                </div>
                <button className="ml-2 bg-teal-400 text-white font-medium px-8 py-3 rounded-lg hover:bg-teal-500 transition">
                  Search
                </button>
              </div>
              <div className="text-left mt-3">
                <button className="text-teal-400 hover:underline">Log in</button> for your recent addresses.
              </div>
              {/* Link component commented out */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;