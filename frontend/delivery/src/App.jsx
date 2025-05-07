import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm'; 
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './Admin/pages/Dashboard';
import AdminLayout from './Admin/AdminLayout';
import AllOrders from './Admin/pages/AllOrders';
import Users from './Admin/pages/Users';
import Riders from './Admin/pages/Riders';
// User Pages
import { ParcelProvider } from './User/context/ParcelContext';
import UserNavbar from './User/components/NavBar';
import UserDashboard from './User/components/UserDashboard';
import CreateParcel from './User/components/CreateParcel';
import ParcelDetail from './User/components/ParcelDetail';
import DeliverySimulation from './User/components/DeliverySimulation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Services id="services"/>
            <Contact id="contact"/>
            <Footer />
          </>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth" element={<AuthForm />} />
        {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="users" element={<Users />} />
        <Route path="riders" element={<Riders />} />
      </Route>

        {/* User Routes (Wrapped with ParcelProvider) */}
        <Route
          path="/user/*"
          element={
            <ParcelProvider>
              <div className="min-h-screen bg-gray-50">
                <UserNavbar />
                <div className="w-full xl:px-20 px-6 py-8">
                  <Routes>
                    <Route path="/user" element={<UserDashboard />} />
                    <Route path="create" element={<CreateParcel />} />
                    <Route path="parcels/:id" element={<ParcelDetail />} />
                    <Route path="parcels/:id/simulation" element={<DeliverySimulation />} />
                  </Routes>
                </div>
              </div>
            </ParcelProvider>
          }
        />

      </Routes>
    </Router>
  )
}

export default App