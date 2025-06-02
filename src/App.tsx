import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './components/auth/MockAuthContext';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import UserProfile from './components/auth/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Aquí irían más rutas para editar proyectos, vista previa, etc. */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
