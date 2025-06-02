// MockProjectService.ts
// Este servicio simula el almacenamiento de proyectos en localStorage en lugar de DynamoDB

import { v4 as uuidv4 } from 'uuid';

// Definir la interfaz para un proyecto
export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  content: {
    title: string;
    subtitle: string;
    sections: Array<{
      id: string;
      type: string;
      content: string;
      imageUrl?: string;
    }>;
  };
  settings: {
    font: string;
    layout: string;
    showNavbar: boolean;
    showFooter: boolean;
  };
}

// Clave para almacenar proyectos en localStorage
const STORAGE_KEY = 'piriapp_projects';

// Obtener todos los proyectos del usuario
export const getUserProjects = async (userId: string): Promise<Project[]> => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    
    // Filtrar proyectos por userId
    return allProjects.filter(project => project.userId === userId);
  } catch (error) {
    console.error('Error getting user projects:', error);
    return [];
  }
};

// Obtener un proyecto específico
export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    
    // Buscar el proyecto por ID
    const project = allProjects.find(p => p.id === projectId);
    return project || null;
  } catch (error) {
    console.error('Error getting project:', error);
    return null;
  }
};

// Crear un nuevo proyecto
export const createProject = async (userId: string, projectData: Partial<Project>): Promise<Project> => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    
    // Crear nuevo proyecto con valores por defecto
    const now = new Date().toISOString();
    const newProject: Project = {
      id: uuidv4(),
      userId,
      name: projectData.name || 'Nuevo Proyecto',
      description: projectData.description || 'Descripción del proyecto',
      createdAt: now,
      updatedAt: now,
      colors: projectData.colors || {
        primary: '#3490dc',
        secondary: '#ffed4a',
        accent: '#f66d9b',
        background: '#ffffff',
        text: '#333333'
      },
      content: projectData.content || {
        title: 'Mi Sitio Web',
        subtitle: 'Bienvenido a mi sitio web personalizado',
        sections: [
          {
            id: uuidv4(),
            type: 'text',
            content: 'Este es un ejemplo de contenido para tu sitio web.'
          }
        ]
      },
      settings: projectData.settings || {
        font: 'Roboto',
        layout: 'standard',
        showNavbar: true,
        showFooter: true
      }
    };
    
    // Añadir el nuevo proyecto a la lista
    allProjects.push(newProject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
    
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

// Actualizar un proyecto existente
export const updateProject = async (projectId: string, updates: Partial<Project>): Promise<Project> => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    
    // Encontrar el índice del proyecto a actualizar
    const projectIndex = allProjects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    // Actualizar el proyecto
    const updatedProject = {
      ...allProjects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    allProjects[projectIndex] = updatedProject;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
    
    return updatedProject;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

// Eliminar un proyecto
export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    
    // Filtrar el proyecto a eliminar
    const updatedProjects = allProjects.filter(p => p.id !== projectId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// Exportar proyectos de ejemplo para desarrollo
export const createSampleProjects = (userId: string): void => {
  const sampleProjects: Project[] = [
    {
      id: uuidv4(),
      userId,
      name: 'Sitio Web Personal',
      description: 'Mi sitio web personal con portfolio',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        accent: '#f66d9b',
        background: '#ffffff',
        text: '#333333'
      },
      content: {
        title: 'Mi Sitio Personal',
        subtitle: 'Desarrollador Web & Diseñador',
        sections: [
          {
            id: uuidv4(),
            type: 'text',
            content: '# Sobre mí\n\nSoy un desarrollador web apasionado por crear experiencias digitales increíbles.'
          },
          {
            id: uuidv4(),
            type: 'image',
            content: 'Mi foto de perfil',
            imageUrl: 'https://via.placeholder.com/400x300'
          }
        ]
      },
      settings: {
        font: 'Roboto',
        layout: 'standard',
        showNavbar: true,
        showFooter: true
      }
    },
    {
      id: uuidv4(),
      userId,
      name: 'Tienda Online',
      description: 'Diseño para una tienda online de productos artesanales',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      colors: {
        primary: '#38a169',
        secondary: '#ed8936',
        accent: '#667eea',
        background: '#f7fafc',
        text: '#2d3748'
      },
      content: {
        title: 'Artesanías Únicas',
        subtitle: 'Productos hechos a mano con amor',
        sections: [
          {
            id: uuidv4(),
            type: 'text',
            content: '# Nuestros Productos\n\nDescubre nuestra colección de artesanías únicas hechas a mano por artesanos locales.'
          },
          {
            id: uuidv4(),
            type: 'image',
            content: 'Galería de productos',
            imageUrl: 'https://via.placeholder.com/800x400'
          }
        ]
      },
      settings: {
        font: 'Montserrat',
        layout: 'ecommerce',
        showNavbar: true,
        showFooter: true
      }
    }
  ];
  
  // Guardar proyectos de ejemplo en localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProjects));
};
