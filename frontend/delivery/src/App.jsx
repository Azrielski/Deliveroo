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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Services />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  )
}

export default App