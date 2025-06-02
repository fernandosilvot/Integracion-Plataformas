import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, Download, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useAuth } from './auth/MockAuthContext';
import { getUserProjects, deleteProject, Project, createSampleProjects } from '../services/MockProjectService';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string>('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (user) {
          let userProjects = await getUserProjects(user.attributes.sub);
          
          // Si no hay proyectos, crear algunos de ejemplo
          if (userProjects.length === 0) {
            createSampleProjects(user.attributes.sub);
            userProjects = await getUserProjects(user.attributes.sub);
          }
          
          setProjects(userProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('No se pudieron cargar los proyectos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/view-project/${projectId}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('No se pudo eliminar el proyecto. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleDownloadProject = async (project: Project) => {
    try {
      // Crear un archivo ZIP
      const zip = new JSZip();
      
      // Generar HTML básico para el proyecto
      const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.content.title}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="styles/custom.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-primary text-white p-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center">
        <div class="font-bold text-xl">${project.content.title}</div>
        <div class="flex space-x-6">
          <a href="#" class="hover:text-accent">Inicio</a>
          <a href="#" class="hover:text-accent">Nosotros</a>
          <a href="#" class="hover:text-accent">Servicios</a>
          <a href="#" class="hover:text-accent">Contacto</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <div class="relative">
    <img src="${project.content.heroImage}" alt="Hero" class="w-full h-96 object-cover">
    <div class="absolute inset-0 flex items-center bg-black bg-opacity-40 text-white">
      <div class="max-w-6xl mx-auto w-full text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">${project.content.title}</h1>
        <p class="text-xl md:text-2xl">${project.content.subtitle}</p>
      </div>
    </div>
  </div>

  <!-- Content Sections -->
  <div class="py-12">
    <div class="max-w-6xl mx-auto px-4">
      ${project.content.sections.map(section => `
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6 text-secondary">${section.title}</h2>
          ${section.image ? `<img src="${section.image}" alt="${section.title}" class="w-full h-64 object-cover rounded-lg mb-6">` : ''}
          <div class="prose max-w-none">${section.content}</div>
        </section>
      `).join('')}
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-secondary text-white py-8">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <p>${project.content.footerText || '© 2025 Mi Sitio Web. Todos los derechos reservados.'}</p>
    </div>
  </footer>
</body>
</html>`;
      
      // Añadir el archivo HTML principal
      zip.file("index.html", htmlContent);
      
      // Añadir un archivo CSS básico
      const cssContent = `
:root {
  --color-primary: ${project.colors.primary};
  --color-secondary: ${project.colors.secondary};
  --color-accent: ${project.colors.accent};
}
.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }
      `;
      zip.file("styles/custom.css", cssContent);
      
      // Generar el archivo ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Descargar el archivo ZIP
      saveAs(zipBlob, `${project.name.toLowerCase().replace(/\s+/g, '-')}.zip`);
      
      console.log('Descarga ZIP iniciada correctamente');
    } catch (error) {
      console.error('Error al descargar el proyecto:', error);
      alert('Hubo un error al descargar tu proyecto. Por favor, intenta de nuevo.');
    }
  };

  // Filtrar y ordenar proyectos
  const filteredAndSortedProjects = projects
    .filter(project => {
      // Filtrar por término de búsqueda
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por tipo
      const matchesType = filterType === 'all' || project.settings.layout === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      // Ordenar por nombre o fecha
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filters and search */}
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar proyectos..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative inline-block text-left">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">Todos los tipos</option>
              <option value="classic">Clásico</option>
              <option value="modern">Moderno</option>
              <option value="minimal">Minimalista</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter className="h-4 w-4" />
            </div>
          </div>
          
          <button
            onClick={() => {
              setSortBy(sortBy === 'name' ? 'date' : 'name');
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {sortBy === 'name' ? 'Nombre' : 'Fecha'}
          </button>
          
          <button
            onClick={() => {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {filteredAndSortedProjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          {searchTerm || filterType !== 'all' ? (
            <div>
              <p className="text-gray-500 mb-4">No se encontraron proyectos con los filtros actuales.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-4">No tienes proyectos creados todavía.</p>
              <button
                onClick={handleCreateProject}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear mi primer proyecto
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Create new project card */}
          <div 
            onClick={handleCreateProject}
            className="bg-white shadow overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nuevo Proyecto</h3>
            <p className="text-sm text-gray-500">Crear un nuevo sitio web personalizado</p>
          </div>
          
          {/* Project cards */}
          {filteredAndSortedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md"
            >
              {/* Project preview */}
              <div 
                className="h-40 bg-gray-200 relative cursor-pointer"
                onClick={() => handleViewProject(project.id)}
              >
                {project.content.heroImage ? (
                  <img 
                    src={project.content.heroImage} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: project.colors.primary }}
                  >
                    <span className="text-white text-xl font-bold">{project.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 truncate">{project.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: project.colors.primary + '20', color: project.colors.primary }}
                  >
                    {project.settings.layout}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleViewProject(project.id)}
                  className="inline-flex justify-center items-center text-gray-700 hover:text-indigo-600 transition-colors"
                  title="Ver proyecto"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditProject(project.id)}
                  className="inline-flex justify-center items-center text-gray-700 hover:text-indigo-600 transition-colors"
                  title="Editar proyecto"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="inline-flex justify-center items-center text-gray-700 hover:text-red-600 transition-colors"
                  title="Eliminar proyecto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownloadProject(project)}
                  className="inline-flex justify-center items-center text-gray-700 hover:text-green-600 transition-colors"
                  title="Descargar proyecto"
                >
                  <Download className="w-4 h-4" />
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
