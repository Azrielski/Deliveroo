// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ParcelForm from './components/ParcelForm';
import ParcelList from './components/ParcelList';
import AuthFlow from './components/AuthFlow';

function App() {
  // const [user, setUser] = useState(null);
  // const [user, setUser] = useState({ email: 'test@example.com' })
  const [user, setUser] = useState({ email: 'admin@example.com' });
  const [parcels, setParcels] = useState([]);

  // Authentication handlers
  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    setParcels([]);
  };

  // Parcel management handlers
  const handleCreateParcel = (newParcel) => {
    const newParcelWithId = { ...newParcel, id: parcels.length + 1, email: user.email };
    setParcels([...parcels, newParcelWithId]);
  };

  const handleCancelParcel = (id) => {
    setParcels(parcels.filter((parcel) => parcel.id !== id));
  };

  const handleChangeDestination = (id, newDestination) => {
    setParcels(
      parcels.map((parcel) =>
        parcel.id === id ? { ...parcel, destination: newDestination } : parcel
      )
    );
  };

  const handleUpdateStatus = (id, newStatus) => {
    setParcels(
      parcels.map((parcel) =>
        parcel.id === id ? { ...parcel, status: newStatus } : parcel
      )
    );
  };

  const handleUpdateLocation = (id, newLocation) => {
    setParcels(
      parcels.map((parcel) =>
        parcel.id === id ? { ...parcel, currentLocation: newLocation } : parcel
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>

          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Login / Auth Page */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/parcels" />
              ) : (
                <AuthFlow onLogin={handleLogin} />
              )
            }
          />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <UserDashboard
                  parcels={parcels}
                  onCreateParcel={handleCreateParcel}
                  onCancelParcel={handleCancelParcel}
                  onChangeDestination={handleChangeDestination}
                  userEmail={user.email}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Parcel Management Page */}
          <Route
            path="/parcels"
            element={
              user ? (
                <div className="p-6">
                  <ParcelForm onCreateParcel={handleCreateParcel} />
                  <ParcelList
                    parcels={parcels}
                    onCancelParcel={handleCancelParcel}
                    onChangeDestination={handleChangeDestination}
                    userEmail={user.email}
                  />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin Panel */}
          <Route
            path="/admin"
            element={
              user && user.email === 'admin@example.com' ? (
                <div className="p-6">
                  <AdminPanel
                    parcels={parcels}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdateLocation={handleUpdateLocation}
                  />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
