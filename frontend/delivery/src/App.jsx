import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Contact />
    </>
  )
}

export default App
