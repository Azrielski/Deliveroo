import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
            Deliveroo
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors font-medium">
              Dashboard
            </Link>
            <Link to="/create" className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors font-medium">
              + New Parcel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;