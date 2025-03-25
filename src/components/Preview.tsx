import React from 'react';
import type { CustomizationState } from '../App';

interface PreviewProps {
  customization: CustomizationState;
}

const Preview: React.FC<PreviewProps> = ({ customization }) => {
  const { colorScheme, layout, content, websiteContent } = customization;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Vista en vivo</h2>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Navigation */}
        <div
          className="p-4"
          style={{ backgroundColor: colorScheme.primary, color: '#ffffff' }}
        >
          <div className={`${layout.navigation === 'top' ? 'flex justify-between items-center' : 'space-y-4'}`}>
            <div className="font-bold">{websiteContent.title}</div>
            <div className="flex space-x-4">
              <span>Home</span>
              <span>About</span>
              <span>Services</span>
              <span>Contact</span>
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
          <div
            className={`absolute inset-0 flex items-center justify-center text-white ${
              content.headerStyle === 'centered' ? 'text-center' : 'text-left px-8'
            }`}
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">{websiteContent.title}</h1>
              <p className="text-xl">{websiteContent.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div
          className={`p-6 ${
            content.spacing === 'compact'
              ? 'space-y-4'
              : content.spacing === 'comfortable'
              ? 'space-y-8'
              : 'space-y-12'
          }`}
        >
          <div
            className={`w-full ${
              layout.width === 'contained' ? 'max-w-4xl mx-auto' : ''
            }`}
          >
            {websiteContent.sections.map((section) => (
              <div key={section.id} className="mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: colorScheme.secondary }}>
                  {section.title}
                </h2>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="prose" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 text-center text-white"
          style={{ backgroundColor: colorScheme.secondary }}
        >
          {websiteContent.footerText}
        </div>
      </div>
    </div>
  );
};

export default Preview;