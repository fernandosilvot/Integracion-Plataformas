import React, { useState } from 'react';
import type { CustomizationState } from '../../App';

interface FeaturesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({
  value,
  onChange,
}) => {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim() === '') return;
    onChange([...value, newFeature.trim()]);
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...value];
    updatedFeatures.splice(index, 1);
    onChange(updatedFeatures);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Características del Sitio</h2>
        <p className="mt-1 text-sm text-gray-500">
          Añada las características principales que desea destacar en su sitio web.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Añadir nueva característica"
            className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Añadir
          </button>
        </div>

        {value.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No hay características añadidas. Añada algunas para destacar en su sitio web.
          </div>
        ) : (
          <ul className="space-y-2">
            {value.map((feature, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
              >
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900">Sugerencias de características</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            'Responsive',
            'Rápido',
            'Fácil de usar',
            'Accesible',
            'SEO optimizado',
            'Moderno',
            'Personalizable',
            'Seguro',
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                if (!value.includes(suggestion)) {
                  onChange([...value, suggestion]);
                }
              }}
              disabled={value.includes(suggestion)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                value.includes(suggestion)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesStep;
