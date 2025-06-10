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
export const createProject = async (userId: string, project: CreateProjectInput): Promise<Project> => {
  try {
    const newProject = {
      id: uuidv4(),
      userId, // vincula el proyecto con el usuario
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

// Actualizar un proyecto existente, pasando además el identificador del usuario
export const updateProject = async (userId: string, project: UpdateProjectInput): Promise<Project> => {
  try {
    const updatedProject = {
      ...project,
      userId, // incluir el id del usuario para validar propiedad/seguridad
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

// Eliminar un proyecto, enviando el identificador del usuario
export const deleteProject = async (userId: string, projectId: string): Promise<void> => {
  try {
    await API.del('projectsApi', `/projects/${projectId}`, {
      body: { userId } // se envía para validación en el backend si es necesario
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Guardar automáticamente un proyecto (para usar con autosave),
// ahora recibiendo el identificador del usuario
export const autoSaveProject = async (userId: string, project: UpdateProjectInput): Promise<Project> => {
  try {
    if (project.id) {
      return await updateProject(userId, project);
    } else {
      return await createProject(userId, project as CreateProjectInput);
    }
  } catch (error) {
    console.error('Error auto-saving project:', error);
    throw error;
  }
};
