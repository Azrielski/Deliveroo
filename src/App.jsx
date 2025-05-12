import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParcelProvider } from "./context/ParcelContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Landing Page Components
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";
import ForgotPassword from "./components/ForgotPassword";
import EmailVerification from "./components/EmailVerification";
import ResendVerification from "./components/ResendVerification";
import ResetPassword from "./components/ResetPassword";

// User Components
import UserNavbar from "./components/User/UserNavbar";
import UserDashboard from "./components/User/UserDashboard";
import CreateParcel from "./components/User/CreateParcel";
import ParcelDetail from "./components/User/ParcelDetail";
import DeliverySimulation from "./components/User/DeliverySimulation";

// Admin Components
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/pages/Dashboard";
import AllOrders from "./Admin/pages/AllOrders";
import Users from "./Admin/pages/Users";
import Riders from "./Admin/pages/Riders";

function App() {
  return (
    <Router>
      <ParcelProvider>
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              <>
                <Navbar />


                <Hero />
                <About />
                
                <Services id="services" />
                <Features id="features" />
                <Testimonials id="testimonials" />
                
                <Footer />
              </>
            }
          />

          {/* Auth Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User Routes */}
          <Route
            path="/user/*"
            element={
              <div className="min-h-screen bg-gray-50">
                <UserNavbar />
                <div className="w-full xl:px-20 px-6 py-8">
                  <Routes>
                    <Route index element={<UserDashboard />} />
                    <Route path="create" element={<CreateParcel />} />
                    <Route path="parcel" element={<ParcelDetail />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="resend-verification" element={<ResendVerification />} />
                    
                    <Route
                      path="parcels/:id/simulation"
                      element={<DeliverySimulation />}
                    />
                  </Routes>
                </div>
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="users" element={<Users />} />
            <Route path="riders" element={<Riders />} />
          </Route>
        </Routes>
      </ParcelProvider>
    </Router>
  );
}

export default App;
