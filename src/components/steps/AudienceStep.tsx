import React from 'react';
import type { CustomizationState } from '../../App';

interface AudienceStepProps {
  value: CustomizationState['audience'];
  onChange: (value: CustomizationState['audience']) => void;
}

const AudienceStep: React.FC<AudienceStepProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (field: keyof CustomizationState['audience'], fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const audienceTypes = [
    'Profesionales',
    'Estudiantes',
    'Familias',
    'Empresas',
    'Emprendedores',
    'Artistas',
    'Turistas',
    'Compradores online',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Audiencia Objetivo</h2>
        <p className="mt-1 text-sm text-gray-500">
          Defina para quién está diseñado su sitio web y cuál es su propósito principal.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="audience-type" className="block text-sm font-medium text-gray-700">
            Tipo de Audiencia
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {audienceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('type', type)}
                className={`px-3 py-2 border rounded-md text-sm ${
                  value.type === type
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              id="audience-type-custom"
              value={audienceTypes.includes(value.type) ? '' : value.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="O especifique otro tipo de audiencia"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="audience-purpose" className="block text-sm font-medium text-gray-700">
            Propósito del Sitio
          </label>
          <textarea
            id="audience-purpose"
            rows={4}
            value={value.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            placeholder="Describa el propósito principal de su sitio web y qué quiere lograr con él."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900">Sugerencias de propósito</h3>
        <div className="mt-2 space-y-2">
          <button
            type="button"
            onClick={() =>
              handleChange(
                'purpose',
                'Proporcionar información clara y accesible sobre nuestros productos y servicios.'
              )
            }
            className="text-sm text-indigo-600 hover:text-indigo-800 block"
          >
            Informativo: Proporcionar información clara y accesible sobre nuestros productos y servicios.
          </button>
          <button
            type="button"
            onClick={() =>
              handleChange(
                'purpose',
                'Generar ventas directas a través de una experiencia de compra sencilla y segura.'
              )
            }
            className="text-sm text-indigo-600 hover:text-indigo-800 block"
          >
            Ventas: Generar ventas directas a través de una experiencia de compra sencilla y segura.
          </button>
          <button
            type="button"
            onClick={() =>
              handleChange(
                'purpose',
                'Captar leads y potenciales clientes interesados en nuestras soluciones.'
              )
            }
            className="text-sm text-indigo-600 hover:text-indigo-800 block"
          >
            Generación de leads: Captar leads y potenciales clientes interesados en nuestras soluciones.
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudienceStep;
