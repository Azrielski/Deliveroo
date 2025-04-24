import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="//logotyp.us/file/deliveroo.svg" alt="Deliveroo" className="h-16 w-auto"/>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/partner">
            <button className="text-teal-500 font-medium hover:text-teal-700">Partner with us</button>
          </Link>
          <Link to="/auth">
            <button className="text-teal-500 font-medium hover:text-teal-700">Sign up or log in</button>
          </Link>
          <Link to="/account">
            <button className="text-teal-500 font-medium hover:text-teal-700">Account</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;