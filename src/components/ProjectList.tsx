import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProjects, deleteProject, Project } from '../services/ProjectService';
import { Trash2, Edit, Plus, RefreshCw } from 'lucide-react';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar proyectos al montar el componente
  useEffect(() => {
    loadProjects();
  }, []);

  // Función para cargar los proyectos del usuario
  const loadProjects = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const userProjects = await getUserProjects();
      setProjects(userProjects);
    } catch (err: any) {
      setError('Error al cargar los proyectos: ' + (err.message || 'Desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un proyecto
  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      return;
    }
    
    try {
      await deleteProject(projectId);
      // Actualizar la lista de proyectos después de eliminar
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (err: any) {
      setError('Error al eliminar el proyecto: ' + (err.message || 'Desconocido'));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Proyectos</h1>
        <div className="flex space-x-2">
          <button
            onClick={loadProjects}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </button>
          <Link
            to="/new-project"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-4">No tienes proyectos guardados.</p>
          <Link
            to="/new-project"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear mi primer proyecto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <p className="text-xs text-gray-500">
                  Creado: {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Actualizado: {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
                <Link
                  to={`/edit-project/${project.id}`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
