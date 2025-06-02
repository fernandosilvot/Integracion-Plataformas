import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { CustomizationState } from '../App';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  customization: CustomizationState;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  customization: CustomizationState;
}

export interface UpdateProjectInput {
  id: string;
  name?: string;
  description?: string;
  customization?: CustomizationState;
}

// Crear un nuevo proyecto
export const createProject = async (project: CreateProjectInput): Promise<Project> => {
  try {
    const newProject = {
      id: uuidv4(),
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const response = await API.post('projectsApi', '/projects', {
      body: newProject
    });
    
    return response;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Obtener todos los proyectos del usuario actual (limitado a 2)
export const getUserProjects = async (): Promise<Project[]> => {
  try {
    const response = await API.get('projectsApi', '/projects', {});
    
    // Ordenar por fecha de actualización (más reciente primero)
    const sortedProjects = response.sort((a: Project, b: Project) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    
    // Limitar a 2 proyectos por usuario
    return sortedProjects.slice(0, 2);
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw error;
  }
};

// Obtener un proyecto específico por ID
export const getProject = async (projectId: string): Promise<Project> => {
  try {
    const response = await API.get('projectsApi', `/projects/${projectId}`, {});
    return response;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

// Actualizar un proyecto existente
export const updateProject = async (project: UpdateProjectInput): Promise<Project> => {
  try {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    
    const response = await API.put('projectsApi', `/projects/${project.id}`, {
      body: updatedProject
    });
    
    return response;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await API.del('projectsApi', `/projects/${projectId}`, {});
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Guardar automáticamente un proyecto (para usar con autosave)
export const autoSaveProject = async (project: UpdateProjectInput): Promise<Project> => {
  try {
    // Si el proyecto ya tiene un ID, actualizarlo
    if (project.id) {
      return await updateProject(project);
    } 
    // Si no tiene ID, crear uno nuevo
    else {
      return await createProject(project as CreateProjectInput);
    }
  } catch (error) {
    console.error('Error auto-saving project:', error);
    throw error;
  }
};
