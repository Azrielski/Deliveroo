import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParcelProvider } from './context/ParcelContext';
import Navbar from './components/NavBar';
import ParcelDetail from './components/ParcelDetail';
import CreateParcel from './components/CreateParcel';
import DeliverySimulation from './components/DeliverySimulation';
import 'leaflet/dist/leaflet.css';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <ParcelProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="w-full xl:px-20 px-6 py-8">
            <Routes>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/create" element={<CreateParcel />} />
              <Route path="/parcels/:id" element={<ParcelDetail />} />
              <Route path="/parcels/:id/simulation" element={<DeliverySimulation />} />
            </Routes>
          </div>
        </div>
      </ParcelProvider>
    </BrowserRouter>
  );
}

export default App



