import React from 'react';
import type { CustomizationState } from '../../App';

interface ContentStepProps {
  value: CustomizationState['content'];
  onChange: (value: CustomizationState['content']) => void;
}

const ContentStep: React.FC<ContentStepProps> = ({
  value,
  onChange,
}) => {
  const handleContentChange = (
    property: keyof CustomizationState['content'],
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
        <h2 className="text-lg font-medium text-gray-900">Organización de Contenido</h2>
        <p className="mt-1 text-sm text-gray-500">
          Personalice la apariencia de su contenido eligiendo un estilo de encabezado y un espaciado
          entre elementos.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Header Style
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {['centered', 'left-aligned'].map((style) => (
              <button
                key={style}
                onClick={() => handleContentChange('headerStyle', style)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium capitalize ${
                  value.headerStyle === style
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {style.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content Spacing
          </label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {['compact', 'comfortable', 'spacious'].map((spacing) => (
              <button
                key={spacing}
                onClick={() => handleContentChange('spacing', spacing)}
                className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium capitalize ${
                  value.spacing === spacing
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900">Preview</h3>
        <div
          className={`mt-3 bg-white rounded-md p-4 ${
            value.headerStyle === 'centered'
              ? 'text-center'
              : 'text-left'
          }`}
        >
          <h4 className="text-lg font-semibold">Sample Header</h4>
          <div
            className={`mt-2 space-y-2 ${
              value.spacing === 'compact'
                ? 'space-y-2'
                : value.spacing === 'comfortable'
                ? 'space-y-4'
                : 'space-y-6'
            }`}
          >
            <p className="text-gray-600">
              This is a preview of how your content will be spaced and aligned.
            </p>
            <p className="text-gray-600">
              The spacing between elements adjusts based on your selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStep;
