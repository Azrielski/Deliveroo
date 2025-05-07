import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParcelProvider } from "./context/ParcelContext";
import Navbar from "./components/User/NavBar";
import ParcelDetail from "./components/User/ParcelDetail";
import CreateParcel from "./components/User/CreateParcel";
import DeliverySimulation from "./components/User/DeliverySimulation";
import "leaflet/dist/leaflet.css";
import UserDashboard from "./components/User/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <ParcelProvider>
        {/* {user routes} */}
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="w-full xl:px-20 px-6 py-8">
            <Routes>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/create" element={<CreateParcel />} />
              <Route path="/parcels/:id" element={<ParcelDetail />} />
              <Route
                path="/parcels/:id/simulation"
                element={<DeliverySimulation />}
              />
            </Routes>
          </div>
        </div>
      </ParcelProvider>
    </BrowserRouter>
  );
}

export default App;
