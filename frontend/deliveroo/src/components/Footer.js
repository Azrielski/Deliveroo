import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Discover Deliveroo</h4>
            <ul className="space-y-2">
              {['Investors', 'About us', 'Takeaway', 'More', 'Newsroom', 'Engineering blog', 'Design blog', 'Gift Cards', 'Deliveroo Students', 'Careers', 'Restaurant signup', 'Become a rider'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-teal-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms and conditions', 'Privacy', 'Cookies', 'Modern Slavery Statement', 'Tax Strategy', 'Section 172 Statement', 'Public Authority Requests'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-teal-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {['Contact', 'FAQs', 'Cuisines', 'Brands'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-teal-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Take Deliveroo with you</h4>
            <div className="flex flex-col space-y-2">
              {/* <a href="#" className="block w-36">
                <img src="https://consumer-component-library.roocdn.com/26.19.1/static/images/ios-app-store-badge-en-gb.png" alt="App Store" className="w-full" />
              </a>
              <a href="#" className="block w-36">
                <img src="https://consumer-component-library.roocdn.com/26.19.1/static/images/android-play-store-badge-en-gb.png" alt="Google Play" className="w-full" />
              </a> */}
              <a href="#" className="block w-36">
                <img src="Screenshot 2025-04-24 124809.png" alt="Google Play"  className="w-full" />
              </a>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.6 10.2h2.1v6H8.4v-6zm1.05-3.3c.6 0 1.2.5 1.2 1.2 0 .65-.55 1.3-1.2 1.3-.65 0-1.25-.6-1.25-1.3 0-.65.55-1.2 1.25-1.2zm3.95 9.3v-5.2c0-.9.65-1.25 1.2-1.25.6 0 1.1.35 1.1 1.25v5.2h2.1v-5.85c0-1.8-1.05-2.65-2.5-2.65s-1.9.95-1.9.95v-.8h-2v8.35h2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-gray-400">
          © 2025 Deliveroo
        </div>
      </div>
    </footer>
  );
};

export default Footer;