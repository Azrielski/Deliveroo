import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParcelProvider } from './context/ParcelContext';
import Navbar from './components/NavBar';
import ParcelList from './components/ParcelList';
import ParcelDetail from './components/ParcelDetail';
import CreateParcel from './components/CreateParcel';
import DeliverySimulation from './components/DeliverySimulation';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      <ParcelProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-4xl mx-auto p-8">
            <Routes>
              <Route path="/" element={<ParcelList />} />
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



