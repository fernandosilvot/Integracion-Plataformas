import React, { useState } from 'react';
import type { CustomizationState } from '../../App';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WebsiteContentStepProps {
  value: CustomizationState['websiteContent'];
  onChange: (value: CustomizationState['websiteContent']) => void;
}

const WebsiteContentStep: React.FC<WebsiteContentStepProps> = ({
  value,
  onChange,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleBasicInfoChange = (field: keyof Omit<CustomizationState['websiteContent'], 'sections'>, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const handleSectionChange = (sectionId: string, field: keyof CustomizationState['websiteContent']['sections'][0], fieldValue: string) => {
    const updatedSections = value.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          [field]: fieldValue,
        };
      }
      return section;
    });

    onChange({
      ...value,
      sections: updatedSections,
    });
  };

  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: 'Nueva Sección',
      content: '<p>Contenido de la nueva sección.</p>',
    };

    onChange({
      ...value,
      sections: [...value.sections, newSection],
    });

    // Activar la nueva sección automáticamente
    setActiveSection(newSection.id);
  };

  const removeSection = (sectionId: string) => {
    const updatedSections = value.sections.filter(
      (section) => section.id !== sectionId
    );

    onChange({
      ...value,
      sections: updatedSections,
    });

    // Si se elimina la sección activa, desactivar
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Contenido del Sitio Web</h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice el contenido principal de su sitio web, incluyendo títulos, imágenes y
          secciones.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título del Sitio
          </label>
          <input
            type="text"
            id="title"
            value={value.title}
            onChange={(e) => handleBasicInfoChange('title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtítulo
          </label>
          <input
            type="text"
            id="subtitle"
            value={value.subtitle}
            onChange={(e) => handleBasicInfoChange('subtitle', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">
            Imagen Principal (URL)
          </label>
          <input
            type="text"
            id="heroImage"
            value={value.heroImage}
            onChange={(e) => handleBasicInfoChange('heroImage', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {value.heroImage && (
            <div className="mt-2">
              <img
                src={value.heroImage}
                alt="Hero Preview"
                className="h-32 w-full object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="footerText" className="block text-sm font-medium text-gray-700">
            Texto del Pie de Página
          </label>
          <input
            type="text"
            id="footerText"
            value={value.footerText}
            onChange={(e) => handleBasicInfoChange('footerText', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Secciones de Contenido</h3>
        <p className="mt-1 text-sm text-gray-500">
          Añada y edite las secciones de contenido de su sitio web.
        </p>

        <div className="mt-4 space-y-4">
          {value.sections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setActiveSection(activeSection === section.id ? null : section.id)
                }
              >
                <h4 className="text-sm font-medium text-gray-900">{section.title}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSection(section.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                  <span className="text-gray-500">
                    {activeSection === section.id ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {activeSection === section.id && (
                <div className="p-4 space-y-4">
                  <div>
                    <label
                      htmlFor={`section-title-${section.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Título de la Sección
                    </label>
                    <input
                      type="text"
                      id={`section-title-${section.id}`}
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(section.id, 'title', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`section-content-${section.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contenido
                    </label>
                    <div className="mt-1">
                      <ReactQuill
                        value={section.content}
                        onChange={(content) =>
                          handleSectionChange(section.id, 'content', content)
                        }
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`section-image-${section.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Imagen de la Sección (URL)
                    </label>
                    <input
                      type="text"
                      id={`section-image-${section.id}`}
                      value={section.image || ''}
                      onChange={(e) =>
                        handleSectionChange(section.id, 'image', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {section.image && (
                      <div className="mt-2">
                        <img
                          src={section.image}
                          alt={`Section ${section.title} Preview`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + Añadir Sección
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteContentStep;
