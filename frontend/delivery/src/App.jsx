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
      </Routes>
    </Router>
  )
}

export default App