import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/MockAuthContext';
import { getProject, createProject, updateProject, Project } from '../services/MockProjectService';

interface ProjectEditorProps {
  isNew: boolean;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ isNew }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Estado del proyecto
  const [project, setProject] = useState<Project>({
    id: '',
    userId: user?.attributes?.sub || '',
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    colors: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      accent: '#f66d9b',
      background: '#ffffff',
      text: '#333333'
    },
    content: {
      title: '',
      subtitle: '',
      sections: []
    },
    settings: {
      font: 'Roboto',
      layout: 'standard',
      showNavbar: true,
      showFooter: true
    }
  });

  // Cargar proyecto existente si no es nuevo
  useEffect(() => {
    const loadProject = async () => {
      if (!isNew && id) {
        try {
          const loadedProject = await getProject(id);
          if (loadedProject) {
            setProject(loadedProject);
          } else {
            alert('No se encontró el proyecto');
            navigate('/');
          }
        } catch (error) {
          console.error('Error al cargar el proyecto:', error);
          alert('Error al cargar el proyecto');
        }
      }
      setLoading(false);
    };

    loadProject();
  }, [isNew, id, navigate]);

  // Manejar cambios en los campos básicos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en los colores
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [name]: value
      }
    }));
  };

  // Manejar cambios en el contenido
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value
      }
    }));
  };

  // Guardar el proyecto
  const handleSave = async () => {
    if (!project.name.trim()) {
      alert('Por favor, ingresa un nombre para el proyecto');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        // Crear nuevo proyecto
        await createProject(user?.attributes?.sub || '', project);
        alert('Proyecto creado con éxito');
      } else {
        // Actualizar proyecto existente
        await updateProject(project.id, project);
        alert('Proyecto actualizado con éxito');
      }
      navigate('/');
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setSaving(false);
    }
  };

  // Cancelar y volver al dashboard
  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {isNew ? 'Crear Nuevo Proyecto' : 'Editar Proyecto'}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Información básica */}
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Información básica</h3>
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre del proyecto
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={project.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={project.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Colores */}
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Colores</h3>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="primary" className="block text-sm font-medium text-gray-700">
                            Color primario
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="color"
                              name="primary"
                              id="primary"
                              value={project.colors.primary}
                              onChange={handleColorChange}
                              className="h-8 w-8 rounded-md border border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-500">{project.colors.primary}</span>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="secondary" className="block text-sm font-medium text-gray-700">
                            Color secundario
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="color"
                              name="secondary"
                              id="secondary"
                              value={project.colors.secondary}
                              onChange={handleColorChange}
                              className="h-8 w-8 rounded-md border border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-500">{project.colors.secondary}</span>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="accent" className="block text-sm font-medium text-gray-700">
                            Color de acento
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="color"
                              name="accent"
                              id="accent"
                              value={project.colors.accent}
                              onChange={handleColorChange}
                              className="h-8 w-8 rounded-md border border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-500">{project.colors.accent}</span>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="background" className="block text-sm font-medium text-gray-700">
                            Color de fondo
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="color"
                              name="background"
                              id="background"
                              value={project.colors.background}
                              onChange={handleColorChange}
                              className="h-8 w-8 rounded-md border border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-500">{project.colors.background}</span>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                            Color de texto
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="color"
                              name="text"
                              id="text"
                              value={project.colors.text}
                              onChange={handleColorChange}
                              className="h-8 w-8 rounded-md border border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-500">{project.colors.text}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Contenido</h3>
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={project.content.title}
                            onChange={handleContentChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                            Subtítulo
                          </label>
                          <input
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            value={project.content.subtitle}
                            onChange={handleContentChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vista previa */}
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Vista previa</h3>
                      <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                        <div className="h-64" style={{ backgroundColor: project.colors.background }}>
                          <div className="p-4" style={{ backgroundColor: project.colors.primary, color: '#fff' }}>
                            <h2 className="text-xl font-bold">{project.content.title || 'Título del sitio'}</h2>
                          </div>
                          <div className="p-4">
                            <p style={{ color: project.colors.text }}>{project.content.subtitle || 'Subtítulo del sitio'}</p>
                            <div className="mt-4">
                              <button
                                style={{ backgroundColor: project.colors.secondary, color: '#fff' }}
                                className="px-4 py-2 rounded-md"
                              >
                                Botón de ejemplo
                              </button>
                            </div>
                          </div>
                          <div className="mt-auto p-4" style={{ backgroundColor: project.colors.secondary, color: '#fff' }}>
                            Footer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {saving ? 'Guardando...' : isNew ? 'Crear proyecto' : 'Guardar cambios'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectEditor;
