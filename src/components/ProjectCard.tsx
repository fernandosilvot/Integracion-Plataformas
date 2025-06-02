import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../services/MockProjectService';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Formatear la fecha para mostrarla de manera legible
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">
            {project.name}
          </h3>
          <div 
            className="h-4 w-4 rounded-full" 
            style={{ backgroundColor: project.colors.primary }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <span>Actualizado: {formatDate(project.updatedAt)}</span>
        </div>
        
        {/* Vista previa del diseño */}
        <div className="mt-4 border border-gray-200 rounded p-2 bg-gray-50">
          <div className="h-24 overflow-hidden flex flex-col" style={{ backgroundColor: project.colors.background }}>
            <div className="p-2" style={{ backgroundColor: project.colors.primary, color: '#fff' }}>
              <div className="text-xs font-bold truncate">{project.content.title}</div>
            </div>
            <div className="p-2 flex-grow">
              <div className="text-xs truncate" style={{ color: project.colors.text }}>
                {project.content.subtitle}
              </div>
            </div>
            <div className="p-1 text-center text-xs" style={{ backgroundColor: project.colors.secondary, color: '#fff' }}>
              Footer
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-between">
        <Link
          to={`/edit-project/${project.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Editar
        </Link>
        <Link
          to={`/preview-project/${project.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Vista previa
        </Link>
        <button
          className="text-sm font-medium text-red-600 hover:text-red-500"
          onClick={() => {
            // Aquí iría la lógica para eliminar el proyecto
            alert(`Eliminar proyecto: ${project.id}`);
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
