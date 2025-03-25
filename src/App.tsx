import React, { useState } from 'react';
import { Settings, Palette, Layout, Users, FileCode, ChevronRight, Eye, FileEdit } from 'lucide-react';
import Preview from './components/Preview';
import ColorSchemeStep from './components/steps/ColorSchemeStep';
import LayoutStep from './components/steps/LayoutStep';
import ContentStep from './components/steps/ContentStep';
import FeaturesStep from './components/steps/FeaturesStep';
import AudienceStep from './components/steps/AudienceStep';
import WebsiteContentStep from './components/steps/WebsiteContentStep';

export type CustomizationState = {
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  layout: {
    type: 'classic' | 'modern' | 'minimal';
    navigation: 'top' | 'side';
    width: 'full' | 'contained';
  };
  content: {
    headerStyle: 'centered' | 'left-aligned';
    spacing: 'compact' | 'comfortable' | 'spacious';
  };
  features: string[];
  audience: {
    type: string;
    purpose: string;
  };
  websiteContent: {
    title: string;
    subtitle: string;
    heroImage: string;
    sections: Array<{
      id: string;
      title: string;
      content: string;
      image?: string;
    }>;
    footerText: string;
  };
};

const initialState: CustomizationState = {
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#1E293B',
    accent: '#F59E0B',
  },
  layout: {
    type: 'modern',
    navigation: 'top',
    width: 'contained',
  },
  content: {
    headerStyle: 'centered',
    spacing: 'comfortable',
  },
  features: [],
  audience: {
    type: '',
    purpose: '',
  },
  websiteContent: {
    title: 'Welcome to Your Website',
    subtitle: 'Create something amazing',
    heroImage: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        id: '1',
        title: 'About Us',
        content: 'Share your story here...',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        title: 'Our Services',
        content: 'Describe your services...',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    footerText: '© 2025 Your Company. All rights reserved.'
  }
};

const steps = [
  { id: 'colors', icon: Palette, title: 'Colores', component: ColorSchemeStep },
  { id: 'layout', icon: Layout, title: 'Layout', component: LayoutStep },
  { id: 'content', icon: FileCode, title: 'Contenido', component: ContentStep },
  { id: 'website-content', icon: FileEdit, title: 'Web', component: WebsiteContentStep },
  { id: 'features', icon: Settings, title: 'Agregado', component: FeaturesStep },
  { id: 'audience', icon: Users, title: 'Audiencia', component: AudienceStep },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [customization, setCustomization] = useState<CustomizationState>(initialState);

  const CurrentStepComponent = steps[currentStep].component;

  const updateCustomization = (field: keyof CustomizationState, value: any) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">La PiriApp customizer</h1>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Progress Steps */}
            <nav className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center space-x-2 ${
                      index === currentStep
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Current Step */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CurrentStepComponent
                customization={customization}
                updateCustomization={updateCustomization}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                Anterior
              </button>
              <button
                onClick={() =>
                  currentStep < steps.length - 1
                    ? setCurrentStep((prev) => prev + 1)
                    : null
                }
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Preview customization={customization} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;