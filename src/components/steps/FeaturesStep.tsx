import React from 'react';
import type { CustomizationState } from '../../App';

interface FeaturesStepProps {
  customization: CustomizationState;
  updateCustomization: (field: keyof CustomizationState, value: any) => void;
}

const availableFeatures = [
  {
    id: 'blog',
    name: 'Blog',
    description: 'Add a blog section to share updates and articles',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with a beautiful portfolio gallery',
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Add a contact form for visitors to reach out',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Include a newsletter subscription form',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Display customer testimonials and reviews',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Add social media integration and sharing buttons',
  },
];

const FeaturesStep: React.FC<FeaturesStepProps> = ({
  customization,
  updateCustomization,
}) => {
  const toggleFeature = (featureId: string) => {
    const newFeatures = customization.features.includes(featureId)
      ? customization.features.filter((id) => id !== featureId)
      : [...customization.features, featureId];
    updateCustomization('features', newFeatures);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Añadidos y Funcionalidades
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice su sitio web eligiendo las funcionalidades que desea incluir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {availableFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`relative rounded-lg border p-4 flex items-start space-x-4 cursor-pointer ${
              customization.features.includes(feature.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => toggleFeature(feature.id)}
          >
            <div
              className={`h-5 w-5 rounded border flex items-center justify-center ${
                customization.features.includes(feature.id)
                  ? 'bg-indigo-600 border-transparent'
                  : 'border-gray-300'
              }`}
            >
              {customization.features.includes(feature.id) && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-sm font-medium ${
                  customization.features.includes(feature.id)
                    ? 'text-indigo-900'
                    : 'text-gray-900'
                }`}
              >
                {feature.name}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  customization.features.includes(feature.id)
                    ? 'text-indigo-700'
                    : 'text-gray-500'
                }`}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {customization.features.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-900">Selected Features</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {customization.features.map((featureId) => (
              <span
                key={featureId}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {
                  availableFeatures.find((f) => f.id === featureId)
                    ?.name
                }
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesStep;