import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import AuthForm from './components/AuthForm';
import PartnerSection from './components/PartnerSection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/partner" element={<PartnerSection/>} />
      <Route path="/account" element={<div>Account Page Placeholder</div>} />
    </Routes>
  );
}

export default App;