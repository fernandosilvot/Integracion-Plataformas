import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './MockAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
