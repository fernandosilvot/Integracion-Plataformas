import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Palette, Layout, Users, FileCode, ChevronRight, Eye, FileEdit, Download, ArrowLeft, Save } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useAuth } from './auth/MockAuthContext';
import { getProject, createProject, updateProject, Project } from '../services/MockProjectService';
import Preview from './Preview';
import ColorSchemeStep from './steps/ColorSchemeStep';
import LayoutStep from './steps/LayoutStep';
import ContentStep from './steps/ContentStep';
import FeaturesStep from './steps/FeaturesStep';
import AudienceStep from './steps/AudienceStep';
import WebsiteContentStep from './steps/WebsiteContentStep';
import AIAssistant from './AIAssistant';
import type { CustomizationState } from '../App';

const initialState: CustomizationState = {
  colorScheme: {
    primary: '#3490dc',
    secondary: '#ffed4a',
    accent: '#f66d9b',
  },
  layout: {
    type: 'modern',
    width: 'contained',
    navigation: 'top',
  },
  content: {
    headerStyle: 'centered',
    spacing: 'comfortable',
    typography: 'modern',
  },
  websiteContent: {
    title: 'Mi Sitio Web',
    subtitle: 'Bienvenido a mi sitio web personalizado',
    heroImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    footerText: '© 2025 Mi Sitio Web. Todos los derechos reservados.',
    sections: [
      {
        id: '1',
        title: 'Acerca de',
        content: '<p>Esta es la sección de información sobre mi sitio web.</p>',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2',
        title: 'Servicios',
        content: '<p>Estos son los servicios que ofrezco.</p>',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  features: ['Responsive', 'Rápido', 'Fácil de usar'],
  audience: {
    type: '',
    purpose: '',
  },
};

const steps = [
  { id: 'colorScheme', icon: Palette, title: 'Colores', component: ColorSchemeStep },
  { id: 'layout', icon: Layout, title: 'Diseño', component: LayoutStep },
  { id: 'content', icon: FileEdit, title: 'Contenido', component: ContentStep },
  { id: 'websiteContent', icon: FileCode, title: 'Contenido Web', component: WebsiteContentStep },
  { id: 'features', icon: Settings, title: 'Características', component: FeaturesStep },
  { id: 'audience', icon: Users, title: 'Audiencia', component: AudienceStep },
];

// Función para generar el contenido HTML basado en la personalización
const generateHTMLContent = (customization: CustomizationState): string => {
  const { colorScheme, layout, content, websiteContent, features, audience } = customization;
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${websiteContent.title}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="styles/custom.css" rel="stylesheet">
  <style>
    :root {
      --color-primary: ${colorScheme.primary};
      --color-secondary: ${colorScheme.secondary};
      --color-accent: ${colorScheme.accent};
    }
  </style>
</head>
<body class="min-h-screen bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-primary text-white p-4">
    <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'}">
      <div class="${layout.navigation === 'top' ? 'flex justify-between items-center' : 'space-y-4'}">
        <div class="font-bold text-xl">${websiteContent.title}</div>
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
    <img src="${websiteContent.heroImage}" alt="Hero" class="w-full h-96 object-cover">
    <div class="absolute inset-0 flex items-center bg-black bg-opacity-40 text-white">
      <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto w-full' : 'w-full px-8'} ${content.headerStyle === 'centered' ? 'text-center' : 'text-left'}">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">${websiteContent.title}</h1>
        <p class="text-xl md:text-2xl">${websiteContent.subtitle}</p>
      </div>
    </div>
  </div>

  <!-- Content Sections -->
  <div class="${content.spacing === 'compact' ? 'py-8' : content.spacing === 'comfortable' ? 'py-12' : 'py-16'}">
    <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'} px-4">
      ${websiteContent.sections.map(section => `
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6 text-secondary">${section.title}</h2>
          ${section.image ? `<img src="${section.image}" alt="${section.title}" class="w-full h-64 object-cover rounded-lg mb-6">` : ''}
          <div class="prose max-w-none">${section.content}</div>
        </section>
      `).join('')}
    </div>
  </div>

  <!-- Features Section -->
  ${features.length > 0 ? `
  <div class="bg-gray-100 py-12">
    <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'} px-4">
      <h2 class="text-3xl font-bold mb-8 text-center text-secondary">Características</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${features.map(feature => `
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3 text-primary">${feature}</h3>
            <p class="text-gray-600">Descripción de la característica ${feature}.</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  ` : ''}

  <!-- Audience Section -->
  ${audience.type ? `
  <div class="py-12 bg-primary bg-opacity-10">
    <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'} px-4 text-center">
      <h2 class="text-3xl font-bold mb-6 text-secondary">Para ${audience.type}</h2>
      <p class="text-xl mb-8">${audience.purpose}</p>
    </div>
  </div>
  ` : ''}

  <!-- Footer -->
  <footer class="bg-secondary text-white py-8">
    <div class="${layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'} px-4 text-center">
      <p>${websiteContent.footerText}</p>
    </div>
  </footer>
</body>
</html>`;
};

interface ProjectEditorProps {
  mode?: 'create' | 'edit';
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ mode = 'create' }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [customization, setCustomization] = useState<CustomizationState>(initialState);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [projectName, setProjectName] = useState('Nuevo Proyecto');
  const [projectDescription, setProjectDescription] = useState('Descripción del proyecto');
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      if (mode === 'edit' && projectId) {
        try {
          const project = await getProject(projectId);
          if (project) {
            setProjectName(project.name);
            setProjectDescription(project.description);
            
            // Convertir el formato del proyecto al formato de customization
            setCustomization({
              colorScheme: {
                primary: project.colors.primary,
                secondary: project.colors.secondary,
                accent: project.colors.accent,
              },
              layout: {
                type: project.settings.layout as any,
                width: 'contained',
                navigation: 'top',
              },
              content: {
                headerStyle: 'centered',
                spacing: 'comfortable',
                typography: 'modern',
              },
              websiteContent: project.content,
              features: project.content.sections.map(s => s.title),
              audience: {
                type: '',
                purpose: '',
              },
            });
          }
        } catch (err) {
          console.error('Error loading project:', err);
          setError('No se pudo cargar el proyecto. Por favor, intenta de nuevo.');
        } finally {
          setLoading(false);
        }
      }
    };

    loadProject();
  }, [mode, projectId]);

  const CurrentStepComponent = steps[currentStep].component;

  // Efecto para manejar la descarga automática
  useEffect(() => {
    if (isComplete && !downloadTriggered) {
      setDownloadTriggered(true);
      const timer = setTimeout(() => {
        downloadWebsite();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, downloadTriggered]);

  const updateCustomization = (field: keyof CustomizationState, value: any) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const saveProject = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const projectData: Partial<Project> = {
        name: projectName,
        description: projectDescription,
        colors: {
          primary: customization.colorScheme.primary,
          secondary: customization.colorScheme.secondary,
          accent: customization.colorScheme.accent,
          background: '#ffffff',
          text: '#333333',
        },
        content: customization.websiteContent,
        settings: {
          font: 'Roboto',
          layout: customization.layout.type,
          showNavbar: true,
          showFooter: true,
        },
      };

      if (mode === 'edit' && projectId) {
        await updateProject(projectId, projectData);
      } else {
        await createProject(user.attributes.sub, projectData);
      }

      // Redirigir al dashboard después de guardar
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving project:', err);
      setError('No se pudo guardar el proyecto. Por favor, intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };
  
  const generateWebsite = () => {
    setIsGenerating(true);
    
    // Simulamos un proceso de generación
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
      
      // Iniciamos la descarga automáticamente después de "generar" el sitio
      setTimeout(() => {
        downloadWebsite();
      }, 500);
    }, 1500);
  };
  
  const downloadWebsite = async () => {
    try {
      // Crear el contenido HTML basado en la personalización
      let htmlContent = generateHTMLContent(customization);
      
      // Crear un archivo ZIP
      const zip = new JSZip();
      
      // Añadir el archivo HTML principal
      zip.file("index.html", htmlContent);
      
      // Añadir un archivo CSS básico
      const cssContent = `
:root {
  --color-primary: ${customization.colorScheme.primary};
  --color-secondary: ${customization.colorScheme.secondary};
  --color-accent: ${customization.colorScheme.accent};
}
.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }
      `;
      zip.file("styles/custom.css", cssContent);
      
      // Añadir un archivo README
      const readmeContent = `
# Tu Sitio Web Personalizado

Este es tu sitio web personalizado creado con La PiriApp Customizer.

## Contenido del paquete

- index.html: El archivo principal de tu sitio web
- styles/custom.css: Estilos personalizados para tu sitio
- images/: Carpeta con todas las imágenes utilizadas en tu sitio (optimizadas en formato WebP)

## Cómo usar

1. Descomprime este archivo ZIP
2. Abre el archivo index.html en tu navegador web
3. ¡Disfruta de tu nuevo sitio web!

## Personalización adicional

Puedes editar los archivos HTML y CSS para personalizar aún más tu sitio web.

## Contacto

Para cualquier duda o consulta, contacta al creador:
Fernando Silva T (https://linktr.ee/fernandosilvot)
      `;
      zip.file("README.md", readmeContent);
      
      // Descargar y añadir las imágenes al ZIP
      const imagesToDownload = [];
      
      // Añadir la imagen del hero
      if (customization.websiteContent.heroImage) {
        const heroImageName = generateImageName(customization.websiteContent.heroImage, 'hero', 'webp');
        imagesToDownload.push({
          url: customization.websiteContent.heroImage,
          filename: heroImageName
        });
      }
      
      // Añadir las imágenes de las secciones
      customization.websiteContent.sections.forEach((section, index) => {
        if (section.image) {
          const sectionImageName = generateImageName(section.image, `section-${index + 1}`, 'webp');
          imagesToDownload.push({
            url: section.image,
            filename: sectionImageName
          });
        }
      });
      
      // Descargar todas las imágenes y añadirlas al ZIP
      try {
        await Promise.all(imagesToDownload.map(async (image) => {
          try {
            const response = await fetch(image.url);
            if (!response.ok) throw new Error(`Failed to fetch image: ${image.url}`);
            
            // Obtener la imagen como blob
            const imageBlob = await response.blob();
            
            // Convertir a WebP si es posible (en un entorno real, aquí usaríamos una biblioteca de conversión)
            // Para esta demo, simplemente usamos el blob original pero con extensión .webp
            const webpBlob = imageBlob; // En producción: convertToWebP(imageBlob)
            
            // Guardar la imagen en el ZIP
            zip.file(`images/${image.filename}`, webpBlob);
            
            // Reemplazar las URLs en el HTML
            const regex = new RegExp(escapeRegExp(image.url), 'g');
            htmlContent = htmlContent.replace(regex, `images/${image.filename}`);
          } catch (error) {
            console.error(`Error downloading image ${image.url}:`, error);
            // Continuar con las otras imágenes si una falla
          }
        }));
        
        // Actualizar el archivo HTML con las rutas de imágenes locales
        zip.file("index.html", htmlContent);
      } catch (error) {
        console.error("Error downloading images:", error);
        // Continuar con la generación del ZIP incluso si hay errores con las imágenes
      }
      
      // Generar el archivo ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Descargar el archivo ZIP
      saveAs(zipBlob, `${projectName.toLowerCase().replace(/\s+/g, '-')}.zip`);
      
      console.log('Descarga ZIP iniciada correctamente');
      
      // Mostrar un mensaje de éxito
      alert('¡Tu sitio web se ha descargado correctamente como un archivo ZIP!');
      
      // Guardar el proyecto después de descargar
      if (mode === 'create') {
        await saveProject();
      }
    } catch (error) {
      console.error('Error al descargar el sitio web:', error);
      alert('Hubo un error al descargar tu sitio web. Por favor, intenta de nuevo.');
    }
  };
  
  // Función auxiliar para escapar caracteres especiales en expresiones regulares
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  
  // Función para generar un nombre de archivo para la imagen
  const generateImageName = (url: string, prefix: string, format = 'webp') => {
    try {
      // Crear un nombre de archivo único
      const timestamp = Date.now();
      return `${prefix}-${timestamp}.${format}`;
    } catch (error) {
      // Si hay algún error, usar un nombre genérico
      return `${prefix}-${Date.now()}.${format}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-600 hover:text-indigo-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Nuevo Proyecto' : 'Editar Proyecto'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={saveProject}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Guardando...
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Proyecto
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                id="project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {steps[currentStep].title}
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {showPreview ? (
                    <>
                      <FileEdit className="w-4 h-4 mr-1" /> Editar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" /> Vista previa
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-2 flex space-x-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center px-3 py-1 rounded-md text-sm ${
                    currentStep === index
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <step.icon className="w-4 h-4 mr-1" />
                  {step.title}
                </button>
              ))}
            </div>
          </div>

          {!showPreview ? (
            <div>
              <CurrentStepComponent
                value={customization[steps[currentStep].id as keyof CustomizationState]}
                onChange={(value: any) =>
                  updateCustomization(
                    steps[currentStep].id as keyof CustomizationState,
                    value
                  )
                }
              />

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() =>
                    currentStep > 0 ? setCurrentStep((prev) => prev - 1) : null
                  }
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    currentStep > 0
                      ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      : 'border-gray-200 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={currentStep === 0}
                >
                  Anterior
                </button>
                <button
                  onClick={() =>
                    currentStep < steps.length - 1
                      ? setCurrentStep((prev) => prev + 1)
                      : generateWebsite()
                  }
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {currentStep < steps.length - 1 ? (
                    <span className="flex items-center">
                      Siguiente <ChevronRight className="ml-1 w-4 h-4" />
                    </span>
                  ) : (
                    'Generar Sitio Web'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden h-[600px]">
              <Preview customization={customization} />
            </div>
          )}
          
          {/* Generation Complete Panel */}
          {isComplete && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">¡Tu sitio web está listo!</h3>
                <p className="text-gray-500 mb-4">
                  {downloadTriggered 
                    ? "La descarga debería haber comenzado automáticamente. Si no es así, haz clic en el botón para descargar tu sitio web personalizado." 
                    : "Preparando tu descarga..."}
                </p>
                <button
                  onClick={downloadWebsite}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Sitio Web
                </button>
              </div>
            </div>
          )}
          
          {/* Loading Indicator */}
          {isGenerating && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                <p className="text-gray-500">Generando tu sitio web...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant customization={customization} updateCustomization={updateCustomization} />
    </div>
  );
};

export default ProjectEditor;
