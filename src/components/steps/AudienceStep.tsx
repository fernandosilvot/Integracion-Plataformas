import React from 'react';
import type { CustomizationState } from '../../App';

interface AudienceStepProps {
  customization: CustomizationState;
  updateCustomization: (field: keyof CustomizationState, value: any) => void;
}

const audienceTypes = [
  'Business Professionals',
  'Creative Artists',
  'Tech Enthusiasts',
  'Educators',
  'Students',
  'General Public',
];

const purposes = [
  'Business Website',
  'Portfolio',
  'Educational Platform',
  'Personal Blog',
  'E-commerce Store',
  'Community Forum',
];

const AudienceStep: React.FC<AudienceStepProps> = ({
  customization,
  updateCustomization,
}) => {
  const handleAudienceChange = (
    property: keyof CustomizationState['audience'],
    value: string
  ) => {
    updateCustomization('audience', {
      ...customization.audience,
      [property]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Audiencia y Propósito
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice su sitio web eligiendo el público objetivo y el propósito del sitio
          web.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Audience
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {audienceTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleAudienceChange('type', type)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium ${
                  customization.audience.type === type
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website Purpose
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {purposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => handleAudienceChange('purpose', purpose)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium ${
                  customization.audience.purpose === purpose
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(customization.audience.type || customization.audience.purpose) && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-900">Summary</h3>
          <div className="mt-2 space-y-2">
            {customization.audience.type && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Target Audience:</span>{' '}
                {customization.audience.type}
              </p>
            )}
            {customization.audience.purpose && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Website Purpose:</span>{' '}
                {customization.audience.purpose}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceStep;