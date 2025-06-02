import React from 'react';
import type { CustomizationState } from '../../App';

interface ColorSchemeStepProps {
  value: CustomizationState['colorScheme'];
  onChange: (value: CustomizationState['colorScheme']) => void;
}

const ColorSchemeStep: React.FC<ColorSchemeStepProps> = ({
  value,
  onChange,
}) => {
  const handleColorChange = (colorType: keyof CustomizationState['colorScheme'], colorValue: string) => {
    onChange({
      ...value,
      [colorType]: colorValue,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Paleta de Colores</h2>
        <p className="mt-1 text-sm text-gray-500">
          Elija los colores que definirán la identidad visual de su sitio web.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(value).map(([colorType, colorValue]) => (
          <div key={colorType}>
            <label
              htmlFor={colorType}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {colorType} Color
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="color"
                id={colorType}
                value={colorValue}
                onChange={(e) =>
                  handleColorChange(
                    colorType as keyof CustomizationState['colorScheme'],
                    e.target.value
                  )
                }
                className="h-10 w-20 rounded border border-gray-300"
              />
              <input
                type="text"
                value={colorValue}
                onChange={(e) =>
                  handleColorChange(
                    colorType as keyof CustomizationState['colorScheme'],
                    e.target.value
                  )
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Preview</h3>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {Object.entries(value).map(([name, color]) => (
            <div
              key={name}
              className="relative rounded-lg p-4 flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span className="text-white text-sm font-medium capitalize">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSchemeStep;
