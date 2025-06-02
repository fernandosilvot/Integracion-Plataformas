import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Download } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getProject } from '../services/MockProjectService';
import type { CustomizationState } from '../App';

const ProjectViewer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customization, setCustomization] = useState<CustomizationState | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      
      try {
        const loadedProject = await getProject(projectId);
        if (loadedProject) {
          setProject(loadedProject);
          
          // Convertir el formato del proyecto al formato de customization
          setCustomization({
            colorScheme: {
              primary: loadedProject.colors.primary,
              secondary: loadedProject.colors.secondary,
              accent: loadedProject.colors.accent,
            },
            layout: {
              type: loadedProject.settings.layout as any,
              width: 'contained',
              navigation: 'top',
            },
            content: {
              headerStyle: 'centered',
              spacing: 'comfortable',
              typography: 'modern',
            },
            websiteContent: loadedProject.content,
            features: loadedProject.content.sections.map(s => s.title),
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
    };

    loadProject();
  }, [projectId]);

  const handleEditProject = () => {
    navigate(`/edit-project/${projectId}`);
  };

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

  const downloadWebsite = async () => {
    if (!customization) return;
    
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
            
            // Guardar la imagen en el ZIP
            zip.file(`images/${image.filename}`, imageBlob);
            
            // Reemplazar las URLs en el HTML
            const regex = new RegExp(escapeRegExp(image.url), 'g');
            htmlContent = htmlContent.replace(regex, `images/${image.filename}`);
          } catch (error) {
            console.error(`Error downloading image ${image.url}:`, error);
          }
        }));
        
        // Actualizar el archivo HTML con las rutas de imágenes locales
        zip.file("index.html", htmlContent);
      } catch (error) {
        console.error("Error downloading images:", error);
      }
      
      // Generar el archivo ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Descargar el archivo ZIP
      saveAs(zipBlob, `${project.name.toLowerCase().replace(/\s+/g, '-')}.zip`);
      
      alert('¡Tu sitio web se ha descargado correctamente como un archivo ZIP!');
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
      const timestamp = Date.now();
      return `${prefix}-${timestamp}.${format}`;
    } catch (error) {
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

  if (error || !project || !customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No se pudo cargar el proyecto.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </button>
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
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEditProject}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </button>
            <button
              onClick={downloadWebsite}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Detalles del Proyecto</h2>
              <p className="text-gray-500 mb-4">{project.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Creado</h3>
                  <p className="text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Última actualización</h3>
                  <p className="text-gray-900">{new Date(project.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Diseño</h3>
                  <p className="text-gray-900 capitalize">{project.settings.layout}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Fuente</h3>
                  <p className="text-gray-900">{project.settings.font}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Colores</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div 
                    className="h-12 w-full rounded-md mb-1" 
                    style={{ backgroundColor: project.colors.primary }}
                  ></div>
                  <p className="text-xs text-gray-500">Primario</p>
                  <p className="text-sm font-mono">{project.colors.primary}</p>
                </div>
                <div>
                  <div 
                    className="h-12 w-full rounded-md mb-1" 
                    style={{ backgroundColor: project.colors.secondary }}
                  ></div>
                  <p className="text-xs text-gray-500">Secundario</p>
                  <p className="text-sm font-mono">{project.colors.secondary}</p>
                </div>
                <div>
                  <div 
                    className="h-12 w-full rounded-md mb-1" 
                    style={{ backgroundColor: project.colors.accent }}
                  ></div>
                  <p className="text-xs text-gray-500">Acento</p>
                  <p className="text-sm font-mono">{project.colors.accent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Vista previa</h2>
          </div>
          <div className="h-[600px] overflow-auto">
            <iframe
              srcDoc={generateHTMLContent(customization)}
              title="Website Preview"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectViewer;
