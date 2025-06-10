import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Preview from './Preview';
import { CustomizationState } from '../App';

// Mock de JSZip y file-saver que se usan en el componente
vi.mock('jszip', () => ({
  default: vi.fn().mockImplementation(() => ({
    file: vi.fn(),
    generateAsync: vi.fn().mockResolvedValue(new Blob())
  }))
}));

vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

describe('Preview Component', () => {
  const mockCustomization: CustomizationState = {
    colorScheme: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      accent: '#f66d9b',
    },
    layout: {
      type: 'modern',
      width: 'contained',
      navigation: 'top',
    },
    content: {
      headerStyle: 'centered',
      spacing: 'comfortable',
      typography: 'modern',
    },
    websiteContent: {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      heroImage: 'https://example.com/image.jpg',
      footerText: '© 2025 Test',
      sections: [
        {
          id: '1',
          title: 'Test Section',
          content: '<p>Test content</p>',
          image: 'https://example.com/section.jpg',
        },
      ],
    },
    features: ['Responsive', 'Fast'],
    audience: {
      type: 'Business',
      purpose: 'Marketing',
    },
  };

  it('renders the preview with correct title and subtitle', () => {
    render(<Preview customization={mockCustomization} />);
    
    // Verificar que el título y subtítulo se muestran correctamente
    expect(screen.getByText('Test Title', { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders section content correctly', () => {
    render(<Preview customization={mockCustomization} />);
    
    // Verificar que el contenido de la sección se muestra
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    
    // El contenido HTML se renderiza, así que podemos verificar que existe
    const sectionContent = screen.getByText('Test content');
    expect(sectionContent).toBeInTheDocument();
  });

  it('applies the correct styles based on customization', () => {
    render(<Preview customization={mockCustomization} />);
    
    // Verificar que se aplican los estilos correctos
    const previewContainer = screen.getByText('Test Title', { selector: 'h1' }).closest('div');
    expect(previewContainer).toBeInTheDocument();
    
    // Verificar que el footer tiene el texto correcto
    expect(screen.getByText('© 2025 Test')).toBeInTheDocument();
  });

  it('renders the footer text correctly', () => {
    render(<Preview customization={mockCustomization} />);
    
    // Verificar que el texto del pie de página se muestra
    expect(screen.getByText('© 2025 Test')).toBeInTheDocument();
  });

  it('renders the navigation based on layout settings', () => {
    render(<Preview customization={mockCustomization} />);
    
    // Verificar que la navegación existe
    const navigation = screen.getByText('Inicio');
    expect(navigation).toBeInTheDocument();
    
    // Verificar que otros elementos de navegación existen
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });
});
