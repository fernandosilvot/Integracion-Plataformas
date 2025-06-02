import React from 'react';
import type { CustomizationState } from '../../App';

interface LayoutStepProps {
  value: CustomizationState['layout'];
  onChange: (value: CustomizationState['layout']) => void;
}

const LayoutStep: React.FC<LayoutStepProps> = ({
  value,
  onChange,
}) => {
  const handleLayoutChange = (
    property: keyof CustomizationState['layout'],
    propertyValue: string
  ) => {
    onChange({
      ...value,
      [property]: propertyValue,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Preferencias de Layout</h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice la apariencia de su sitio web eligiendo un diseño y una estructura de
          contenido.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Layout Type
          </label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {['classic', 'modern', 'minimal'].map((type) => (
              <button
                key={type}
                onClick={() => handleLayoutChange('type', type)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium capitalize ${
                  value.type === type
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
            Navigation Position
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {['top', 'side'].map((nav) => (
              <button
                key={nav}
                onClick={() => handleLayoutChange('navigation', nav)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium capitalize ${
                  value.navigation === nav
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {nav}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content Width
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {['contained', 'full'].map((width) => (
              <button
                key={width}
                onClick={() => handleLayoutChange('width', width)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium capitalize ${
                  value.width === width
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {width}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutStep;
