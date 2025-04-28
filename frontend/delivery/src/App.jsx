import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <UserDashboard />
      <Contact />
      <Footer />
    </>
  )
}

export default App
