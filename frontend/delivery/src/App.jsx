import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Services from './components/Services';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
    </>
  )
}

export default App
