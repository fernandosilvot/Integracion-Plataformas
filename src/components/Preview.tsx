import React from 'react';
import type { CustomizationState } from '../App';

interface PreviewProps {
  customization: CustomizationState;
}

const Preview: React.FC<PreviewProps> = ({ customization }) => {
  const { colorScheme, layout, content, websiteContent } = customization;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-2 border-b border-gray-200 flex justify-between items-center">
        <div className="text-sm font-medium">Vista previa</div>
        <div className="text-xs text-gray-500">
          {layout.width === 'contained' ? 'Ancho contenido' : 'Ancho completo'}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-gray-100">
        <div
          className="min-h-full"
          style={{
            '--color-primary': colorScheme.primary,
            '--color-secondary': colorScheme.secondary,
            '--color-accent': colorScheme.accent,
          } as React.CSSProperties}
        >
          {/* Navigation */}
          <div
            className="text-white p-4"
            style={{ backgroundColor: colorScheme.primary }}
          >
            <div
              className={`${
                layout.width === 'contained' ? 'max-w-6xl mx-auto' : 'w-full'
              }`}
            >
              <div
                className={`${
                  layout.navigation === 'top'
                    ? 'flex justify-between items-center'
                    : 'space-y-4'
                }`}
              >
                <div className="font-bold text-xl">{websiteContent.title}</div>
                <div className="flex space-x-6">
                  <a href="#" className="hover:text-accent">
                    Inicio
                  </a>
                  <a href="#" className="hover:text-accent">
                    Nosotros
                  </a>
                  <a href="#" className="hover:text-accent">
                    Servicios
                  </a>
                  <a href="#" className="hover:text-accent">
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative">
            <img
              src={websiteContent.heroImage}
              alt="Hero"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center bg-black bg-opacity-40 text-white">
              <div
                className={`${
                  layout.width === 'contained'
                    ? 'max-w-6xl mx-auto w-full'
                    : 'w-full px-8'
                } ${
                  content.headerStyle === 'centered'
                    ? 'text-center'
                    : 'text-left'
                }`}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {websiteContent.title}
                </h1>
                <p className="text-lg md:text-xl">
                  {websiteContent.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div
            className={`${
              content.spacing === 'compact'
                ? 'py-4'
                : content.spacing === 'comfortable'
                ? 'py-8'
                : 'py-12'
            }`}
          >
            <div
              className={`${
                layout.width === 'contained'
                  ? 'max-w-6xl mx-auto'
                  : 'w-full'
              } px-4`}
            >
              {websiteContent.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: colorScheme.secondary }}
                  >
                    {section.title}
                  </h2>
                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="text-white py-6"
            style={{ backgroundColor: colorScheme.secondary }}
          >
            <div
              className={`${
                layout.width === 'contained'
                  ? 'max-w-6xl mx-auto'
                  : 'w-full'
              } px-4 text-center`}
            >
              <p>{websiteContent.footerText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
