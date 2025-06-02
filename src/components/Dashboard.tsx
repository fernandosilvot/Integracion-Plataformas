import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/MockAuthContext';
import { getUserProjects, Project, createSampleProjects } from '../services/MockProjectService';
import ProjectCard from './ProjectCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.attributes?.sub) {
        try {
          // Intentar obtener proyectos existentes
          let userProjects = await getUserProjects(user.attributes.sub);
          
          // Si no hay proyectos, crear algunos de ejemplo para la demo
          if (userProjects.length === 0) {
            createSampleProjects(user.attributes.sub);
            userProjects = await getUserProjects(user.attributes.sub);
          }
          
          setProjects(userProjects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, [user]);

  const handleCreateNewProject = () => {
    navigate('/new-project');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
            <div>
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Mi Perfil
              </Link>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {/* Sección de bienvenida */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Bienvenido, {user?.username || 'Usuario'}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Aquí puedes gestionar tus proyectos de sitios web personalizados.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleCreateNewProject}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Crear nuevo proyecto
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección de proyectos */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Mis Proyectos
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Proyectos de sitios web que has creado.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No tienes proyectos aún.</p>
                      <div className="mt-4">
                        <button
                          onClick={handleCreateNewProject}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Crear tu primer proyecto
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sección de información del cliente */}
              <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Información del Cliente
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Detalles de tu cuenta y uso.
                    </p>
                  </div>
                  <Link
                    to="/client-info"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Ver detalles completos
                  </Link>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.email || user?.username || 'No disponible'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Proyectos activos
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {projects.length}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Enlace a Sobre Nosotros en lugar de mostrar toda la información */}
              <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Sobre Nosotros
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Conoce más sobre La PiriApp Customizer y nuestro equipo.
                    </p>
                  </div>
                  <Link
                    to="/about"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Ver más información
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
