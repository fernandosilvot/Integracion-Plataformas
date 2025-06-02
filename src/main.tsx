import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Componentes de autenticación - Usamos la versión mock para desarrollo local
import { AuthProvider, useAuth } from './components/auth/MockAuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ConfirmSignUp from './components/auth/ConfirmSignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Componentes de la aplicación
import Dashboard from './components/Dashboard';
import ProjectEditor from './components/ProjectEditor';
import ProjectViewer from './components/ProjectViewer';

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
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-project" 
        element={
          <ProtectedRoute>
            <ProjectEditor mode="create" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-project/:projectId" 
        element={
          <ProtectedRoute>
            <ProjectEditor mode="edit" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/view-project/:projectId" 
        element={
          <ProtectedRoute>
            <ProjectViewer />
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
      
      {/* Ruta por defecto - redirige a dashboard si está autenticado, o a login si no */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
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
