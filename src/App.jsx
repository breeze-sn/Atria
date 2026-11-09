import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Foundations from './pages/Foundations';
import Tokens from './pages/Tokens';
import Components from './pages/Components';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/foundations" replace />} />
          <Route path="foundations" element={<Foundations />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="components" element={<Components />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
