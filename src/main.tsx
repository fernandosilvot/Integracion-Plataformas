import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import './index.css';
// Eliminamos la importación de AWS config

// Componentes de autenticación - Usamos la versión mock para desarrollo local
import { AuthProvider, useAuth } from './components/auth/MockAuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ConfirmSignUp from './components/auth/ConfirmSignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Componente para rutas protegidas
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-signup" element={<ConfirmSignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta por defecto - redirige a login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
