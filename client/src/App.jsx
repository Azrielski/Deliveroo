import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParcelProvider } from './context/ParcelContext';
import CreateParcel from './components/CreateParcel';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <ParcelProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto p-8">
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateParcel />} />
            </Routes>
          </div>
        </div>
      </ParcelProvider>
    </BrowserRouter>
  );
}
