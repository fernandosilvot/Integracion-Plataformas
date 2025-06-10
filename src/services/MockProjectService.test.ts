import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  getUserProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject,
  createSampleProjects
} from './MockProjectService';
import { v4 as uuidv4 } from 'uuid';

// Mock para localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

// Mock para uuidv4
vi.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('MockProjectService', () => {
  const userId = 'test-user-id';
  const storageKey = 'piriapp_projects';

  beforeEach(() => {
    // Configurar el mock de localStorage
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserProjects', () => {
    it('should return empty array when no projects exist', async () => {
      const projects = await getUserProjects(userId);
      expect(projects).toEqual([]);
    });

    it('should return only projects for the specified user', async () => {
      const testProjects = [
        { id: '1', userId: userId, name: 'Project 1' },
        { id: '2', userId: 'other-user', name: 'Project 2' },
        { id: '3', userId: userId, name: 'Project 3' }
      ];
      localStorageMock.setItem(storageKey, JSON.stringify(testProjects));

      const projects = await getUserProjects(userId);
      expect(projects).toHaveLength(2);
      expect(projects[0].id).toBe('1');
      expect(projects[1].id).toBe('3');
    });
  });

  describe('getProject', () => {
    it('should return null when project does not exist', async () => {
      const project = await getProject('non-existent-id');
      expect(project).toBeNull();
    });

    it('should return the project when it exists', async () => {
      const testProject = { id: 'test-id', name: 'Test Project' };
      localStorageMock.setItem(storageKey, JSON.stringify([testProject]));

      const project = await getProject('test-id');
      expect(project).toEqual(testProject);
    });
  });

  describe('createProject', () => {
    it('should create a new project with default values', async () => {
      const projectData = { name: 'New Project' };
      const newProject = await createProject(userId, projectData);

      expect(newProject.id).toBe('test-uuid');
      expect(newProject.name).toBe('New Project');
      expect(newProject.userId).toBe(userId);

      // Verificar que se guardó en localStorage
      const storedProjects = JSON.parse(localStorageMock.getItem(storageKey) || '[]');
      expect(storedProjects).toHaveLength(1);
      expect(storedProjects[0].id).toBe('test-uuid');
    });

    it('should use provided values when available', async () => {
      const projectData = {
        name: 'Custom Project',
        description: 'Custom description',
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
          accent: '#0000ff',
          background: '#ffffff',
          text: '#000000'
        }
      };

      const newProject = await createProject(userId, projectData);
      expect(newProject.name).toBe('Custom Project');
      expect(newProject.description).toBe('Custom description');
      expect(newProject.colors.primary).toBe('#ff0000');
    });
  });

  describe('updateProject', () => {
    it('should throw error when project does not exist', async () => {
      await expect(updateProject('non-existent-id', { name: 'Updated' }))
        .rejects.toThrow('Failed to update project');
    });

    it('should update an existing project', async () => {
      // Crear un proyecto primero
      const project = await createProject(userId, { name: 'Original Name' });
      
      // Actualizar el proyecto
      const updatedProject = await updateProject(project.id, { 
        name: 'Updated Name',
        description: 'Updated description'
      });

      expect(updatedProject.id).toBe(project.id);
      expect(updatedProject.name).toBe('Updated Name');
      expect(updatedProject.description).toBe('Updated description');
      
      // Verificar que se actualizó en localStorage
      const storedProjects = JSON.parse(localStorageMock.getItem(storageKey) || '[]');
      expect(storedProjects[0].name).toBe('Updated Name');
    });
  });

  describe('deleteProject', () => {
    it('should delete an existing project', async () => {
      // Crear dos proyectos
      await createProject(userId, { name: 'Project 1' });
      await createProject(userId, { name: 'Project 2' });
      
      // Verificar que hay dos proyectos
      let storedProjects = JSON.parse(localStorageMock.getItem(storageKey) || '[]');
      expect(storedProjects).toHaveLength(2);
      
      // Eliminar el primer proyecto
      const result = await deleteProject('test-uuid');
      expect(result).toBe(true);
      
      // Verificar que solo queda un proyecto
      storedProjects = JSON.parse(localStorageMock.getItem(storageKey) || '[]');
      expect(storedProjects).toHaveLength(0);
    });
  });

  describe('createSampleProjects', () => {
    it('should create sample projects for development', () => {
      createSampleProjects(userId);
      
      const storedProjects = JSON.parse(localStorageMock.getItem(storageKey) || '[]');
      expect(storedProjects).toHaveLength(2);
      expect(storedProjects[0].name).toBe('Sitio Web Personal');
      expect(storedProjects[1].name).toBe('Tienda Online');
      expect(storedProjects[0].userId).toBe(userId);
      expect(storedProjects[1].userId).toBe(userId);
    });
  });
});
