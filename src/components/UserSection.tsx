import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/MockAuthContext';
import { getUserProjects, Project } from '../services/MockProjectService';
import { PieChart, BarChart, Calendar, Clock, Settings, Shield, Bell, Key, User } from 'lucide-react';

const UserSection: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (user) {
          const userProjects = await getUserProjects(user.attributes.sub);
          setProjects(userProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  // Función para obtener la fecha de registro (simulada)
  const getRegistrationDate = () => {
    // Simulamos una fecha de registro 6 meses antes
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return date.toLocaleDateString();
  };

  // Función para obtener estadísticas de proyectos
  const getProjectStats = () => {
    if (projects.length === 0) return { total: 0, thisMonth: 0, avgSize: 0 };
    
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const projectsThisMonth = projects.filter(project => {
      const projectDate = new Date(project.createdAt);
      return projectDate.getMonth() === thisMonth && projectDate.getFullYear() === thisYear;
    });
    
    return {
      total: projects.length,
      thisMonth: projectsThisMonth.length,
      avgSize: Math.round(projects.reduce((sum, project) => sum + (project.content.sections.length || 0), 0) / projects.length)
    };
  };

  const stats = getProjectStats();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Estadísticas de Proyectos</h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <BarChart className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Proyectos</dt>
                            <dd className="text-3xl font-semibold text-gray-900">{stats.total}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Proyectos este mes</dt>
                            <dd className="text-3xl font-semibold text-gray-900">{stats.thisMonth}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <PieChart className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Secciones promedio</dt>
                            <dd className="text-3xl font-semibold text-gray-900">{stats.avgSize}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Actividad Reciente</h3>
                <div className="mt-5 flow-root">
                  <ul className="-mb-8">
                    {projects.slice(0, 3).map((project, projectIdx) => (
                      <li key={project.id}>
                        <div className="relative pb-8">
                          {projectIdx !== projects.slice(0, 3).length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                <Clock className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">{project.name}</span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  Actualizado el {new Date(project.updatedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                <p>{project.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la Cuenta</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales y de contacto.</p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Usuario Demo</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Fecha de registro</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{getRegistrationDate()}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Plan</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Premium
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Cambiar contraseña</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Actualiza tu contraseña para mantener tu cuenta segura.</p>
                </div>
                <form className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="password" className="sr-only">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Nueva contraseña"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cambiar
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Preferencias de Notificaciones</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">Notificaciones por email</label>
                      <p className="text-gray-500">Recibe actualizaciones sobre nuevas características y mejoras.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing"
                        name="marketing"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing" className="font-medium text-gray-700">Emails de marketing</label>
                      <p className="text-gray-500">Recibe información sobre ofertas especiales y promociones.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Tema de la Interfaz</h3>
                <div className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div className="flex items-center">
                      <input
                        id="light"
                        name="theme"
                        type="radio"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="light" className="ml-3 block text-sm font-medium text-gray-700">
                        Claro
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="dark"
                        name="theme"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="dark" className="ml-3 block text-sm font-medium text-gray-700">
                        Oscuro
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="system"
                        name="theme"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="system" className="ml-3 block text-sm font-medium text-gray-700">
                        Sistema
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Eliminar cuenta</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Una vez que elimines tu cuenta, perderás todos tus datos de forma permanente.</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Autenticación de dos factores</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Añade una capa adicional de seguridad a tu cuenta activando la autenticación de dos factores.</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Activar 2FA
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Sesiones activas</h3>
                <div className="mt-4 space-y-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Este dispositivo</p>
                        <p className="text-sm text-gray-500">Última actividad: Ahora</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Historial de inicios de sesión</h3>
                <div className="mt-4 space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm font-medium text-gray-900">Hoy, 12:30 PM</p>
                    <p className="text-sm text-gray-500">Chrome en Windows</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm font-medium text-gray-900">Ayer, 9:15 AM</p>
                    <p className="text-sm text-gray-500">Safari en macOS</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">15 de mayo, 2025, 3:45 PM</p>
                    <p className="text-sm text-gray-500">Firefox en Windows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <PieChart
                className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                  activeTab === 'overview' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">Resumen</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                activeTab === 'account'
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <User
                className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                  activeTab === 'account' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">Cuenta</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Settings
                className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                  activeTab === 'settings' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">Preferencias</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                activeTab === 'security'
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Shield
                className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                  activeTab === 'security' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">Seguridad</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserSection;
