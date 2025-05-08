import { Link, useLocation } from "react-router-dom";
import { FiBox, FiUser, FiTruck } from "react-icons/fi";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg mb-8">
      <div className="w-full xl:px-20 px-6 py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-100 transition-colors flex items-center gap-2"
          >
            <FiTruck className="text-2xl" />
            <span>Deliveroo</span>
          </Link>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/user"
              className={`flex items-center gap-2 hover:text-blue-200 transition-colors font-medium ${
                pathname === "/user" ? "text-blue-200" : ""
              }`}
            >
              <FiUser className="text-lg" />
              Dashboard
            </Link>

            <Link
              to="/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-md"
            >
              <FiBox className="text-lg" />
              New Parcel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
