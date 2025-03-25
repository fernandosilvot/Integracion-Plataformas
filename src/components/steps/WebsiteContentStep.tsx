import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { CustomizationState } from '../../App';

interface WebsiteContentStepProps {
  customization: CustomizationState;
  updateCustomization: (field: keyof CustomizationState, value: any) => void;
}

const WebsiteContentStep: React.FC<WebsiteContentStepProps> = ({
  customization,
  updateCustomization,
}) => {
  const handleContentChange = useCallback(
    (field: keyof CustomizationState['websiteContent'], value: any) => {
      updateCustomization('websiteContent', {
        ...customization.websiteContent,
        [field]: value,
      });
    },
    [customization.websiteContent, updateCustomization]
  );

  const handleSectionChange = useCallback(
    (sectionId: string, field: string, value: string) => {
      const updatedSections = customization.websiteContent.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      );
      updateCustomization('websiteContent', {
        ...customization.websiteContent,
        sections: updatedSections,
      });
    },
    [customization.websiteContent, updateCustomization]
  );

  const addNewSection = useCallback(() => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: 'Add your content here...',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    };
    updateCustomization('websiteContent', {
      ...customization.websiteContent,
      sections: [...customization.websiteContent.sections, newSection],
    });
  }, [customization.websiteContent, updateCustomization]);

  const removeSection = useCallback(
    (sectionId: string) => {
      const updatedSections = customization.websiteContent.sections.filter(
        (section) => section.id !== sectionId
      );
      updateCustomization('websiteContent', {
        ...customization.websiteContent,
        sections: updatedSections,
      });
    },
    [customization.websiteContent, updateCustomization]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Contenido de la Web</h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice el contenido de su sitio web agregando secciones y configurando el pie de
          página.
        </p>
      </div>

      {/* Header Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titulo de la Web
          </label>
          <input
            type="text"
            value={customization.websiteContent.title}
            onChange={(e) => handleContentChange('title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subtitulo de la Web
          </label>
          <input
            type="text"
            value={customization.websiteContent.subtitle}
            onChange={(e) => handleContentChange('subtitle', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen de Hero
          </label>
          <input
            type="text"
            value={customization.websiteContent.heroImage}
            onChange={(e) => handleContentChange('heroImage', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Contenido de la web</h3>
          <button
            onClick={addNewSection}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Section
          </button>
        </div>

        {customization.websiteContent.sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-900">Section</h4>
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titulo de la Seccion
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(section.id, 'title', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen de la Seccion
              </label>
              <input
                type="text"
                value={section.image}
                onChange={(e) =>
                  handleSectionChange(section.id, 'image', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido de la Seccion
              </label>
              <ReactQuill
                theme="snow"
                value={section.content}
                onChange={(content) =>
                  handleSectionChange(section.id, 'content', content)
                }
                className="bg-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Texto del Pie de Pagina
        </label>
        <input
          type="text"
          value={customization.websiteContent.footerText}
          onChange={(e) => handleContentChange('footerText', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default WebsiteContentStep;