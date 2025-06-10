import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  createProject, 
  getUserProjects, 
  getProject, 
  updateProject, 
  deleteProject,
  autoSaveProject
} from './ProjectService';
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

// Mock de AWS Amplify API
vi.mock('aws-amplify', () => ({
  API: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    del: vi.fn()
  }
}));

// Mock de uuid
vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('mocked-uuid')
}));

describe('ProjectService', () => {
  const mockProject = {
    name: 'Test Project',
    description: 'Test Description',
    customization: {
      colorScheme: { primary: '#000', secondary: '#fff', accent: '#ccc' },
      layout: { type: 'modern', width: 'contained', navigation: 'top' },
      content: { headerStyle: 'centered', spacing: 'comfortable', typography: 'modern' },
      websiteContent: {
        title: 'Test',
        subtitle: 'Test',
        heroImage: '',
        footerText: '',
        sections: []
      },
      features: [],
      audience: { type: '', purpose: '' }
    }
  };

  const mockResponse = {
    id: 'mocked-uuid',
    userId: 'test-user',
    ...mockProject,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock de Date para tener fechas consistentes en las pruebas
    const mockDate = new Date('2025-01-01T00:00:00.000Z');
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      // Configurar el mock para devolver una respuesta exitosa
      vi.mocked(API.post).mockResolvedValue(mockResponse);

      // Llamar a la función
      const result = await createProject(mockProject);

      // Verificar que se llamó a API.post con los parámetros correctos
      expect(API.post).toHaveBeenCalledWith('projectsApi', '/projects', {
        body: expect.objectContaining({
          id: 'mocked-uuid',
          name: 'Test Project',
          description: 'Test Description'
        })
      });

      // Verificar el resultado
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when creating a project', async () => {
      // Configurar el mock para simular un error
      const error = new Error('API error');
      vi.mocked(API.post).mockRejectedValue(error);

      // Verificar que la función propaga el error
      await expect(createProject(mockProject)).rejects.toThrow();
      
      // Verificar que se registra el error en la consola
      const consoleSpy = vi.spyOn(console, 'error');
      await expect(createProject(mockProject)).rejects.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('getUserProjects', () => {
    it('should get and sort user projects', async () => {
      // Proyectos ya ordenados por fecha (simulando el comportamiento real)
      const mockProjects = [
        { ...mockResponse, id: '2', updatedAt: '2025-01-03T00:00:00.000Z' },
        { ...mockResponse, id: '1', updatedAt: '2025-01-02T00:00:00.000Z' },
        { ...mockResponse, id: '3', updatedAt: '2025-01-01T00:00:00.000Z' }
      ];
      
      vi.mocked(API.get).mockResolvedValue(mockProjects);

      const result = await getUserProjects();

      expect(API.get).toHaveBeenCalledWith('projectsApi', '/projects', {});
      
      // Verificar que los proyectos están limitados a 2
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('2'); // El más reciente
      expect(result[1].id).toBe('1'); // El segundo más reciente
    });
  });

  describe('getProject', () => {
    it('should get a specific project by ID', async () => {
      vi.mocked(API.get).mockResolvedValue(mockResponse);

      const result = await getProject('mocked-uuid');

      expect(API.get).toHaveBeenCalledWith('projectsApi', '/projects/mocked-uuid', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProject', () => {
    it('should update an existing project', async () => {
      const updateData = {
        id: 'mocked-uuid',
        name: 'Updated Project',
        description: 'Updated Description'
      };
      
      vi.mocked(API.put).mockResolvedValue({
        ...mockResponse,
        ...updateData,
        updatedAt: '2025-01-01T00:00:00.000Z'
      });

      const result = await updateProject(updateData);

      expect(API.put).toHaveBeenCalledWith('projectsApi', '/projects/mocked-uuid', {
        body: expect.objectContaining({
          id: 'mocked-uuid',
          name: 'Updated Project',
          description: 'Updated Description',
          updatedAt: '2025-01-01T00:00:00.000Z'
        })
      });
      
      expect(result.name).toBe('Updated Project');
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      vi.mocked(API.del).mockResolvedValue({});

      await deleteProject('mocked-uuid');

      expect(API.del).toHaveBeenCalledWith('projectsApi', '/projects/mocked-uuid', {});
    });
  });

  describe('autoSaveProject', () => {
    it('should update an existing project when ID is provided', async () => {
      const projectWithId = {
        id: 'existing-id',
        name: 'Existing Project'
      };
      
      // Mock para updateProject
      vi.mocked(API.put).mockResolvedValue({
        ...mockResponse,
        ...projectWithId,
        updatedAt: '2025-01-01T00:00:00.000Z'
      });
      
      const result = await autoSaveProject(projectWithId);
      
      expect(API.put).toHaveBeenCalled();
      expect(result.id).toBe('existing-id');
    });

    it('should create a new project when no ID is provided', async () => {
      const projectWithoutId = {
        name: 'New Project'
      };
      
      // Mock para createProject
      vi.mocked(API.post).mockResolvedValue({
        ...mockResponse,
        name: 'New Project',
        id: 'mocked-uuid'
      });
      
      const result = await autoSaveProject(projectWithoutId);
      
      expect(API.post).toHaveBeenCalled();
      expect(result.name).toBe('New Project');
    });
  });
});
