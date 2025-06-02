import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import type { CustomizationState } from '../App';

interface AIAssistantProps {
  customization: CustomizationState;
  updateCustomization: (field: keyof CustomizationState, value: any) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ customization, updateCustomization }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([
    {
      type: 'assistant',
      content: '¡Hola! Soy tu asistente de diseño web con IA. Puedes pedirme ayuda para diseñar tu sitio web. Por ejemplo, puedes decirme "Quiero un sitio web para una cafetería" o "Necesito un sitio web profesional para mi negocio de consultoría".'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Añadir el mensaje del usuario
    const newUserMessage = { type: 'user' as const, content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    
    try {
      // Aquí iría la llamada a Amazon Bedrock Nova Lite
      // Por ahora, simulamos una respuesta
      await simulateAIResponse(userInput, customization);
    } catch (error) {
      console.error('Error al procesar la solicitud con IA:', error);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para simular la respuesta de la IA
  const simulateAIResponse = async (input: string, currentCustomization: CustomizationState) => {
    // Simulamos un tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const inputLower = input.toLowerCase();
    let response = '';
    let updates: Partial<CustomizationState> = {};
    
    // Analizar la entrada del usuario y generar recomendaciones
    if (inputLower.includes('cafetería') || inputLower.includes('cafe') || inputLower.includes('restaurante')) {
      response = 'Basado en tu solicitud para una cafetería, te recomiendo un diseño acogedor con tonos cálidos. He actualizado tu esquema de colores y contenido para reflejar esto.';
      
      updates = {
        colorScheme: {
          primary: '#8B4513', // Marrón
          secondary: '#3E2723', // Marrón oscuro
          accent: '#FFA726', // Naranja cálido
        },
        layout: {
          ...currentCustomization.layout,
          type: 'classic',
        },
        websiteContent: {
          ...currentCustomization.websiteContent,
          title: 'Mi Cafetería',
          subtitle: 'Sabores que despiertan tus sentidos',
          sections: [
            {
              id: '1',
              title: 'Nuestra Historia',
              content: '<p>Desde 2010, hemos estado sirviendo el mejor café de la ciudad con ingredientes de la más alta calidad y un ambiente acogedor.</p>',
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
            },
            {
              id: '2',
              title: 'Nuestro Menú',
              content: '<p>Ofrecemos una variedad de cafés especiales, pasteles artesanales y desayunos gourmet para satisfacer todos los gustos.</p>',
              image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&w=800&q=80'
            }
          ],
        },
        features: ['Wifi Gratis', 'Ambiente Acogedor', 'Café de Especialidad'],
        audience: {
          type: 'Amantes del café',
          purpose: 'Ofrecer un espacio acogedor para disfrutar del mejor café'
        }
      };
    } 
    else if (inputLower.includes('consultoría') || inputLower.includes('profesional') || inputLower.includes('negocio')) {
      response = 'He creado un diseño profesional para tu negocio de consultoría con un aspecto moderno y confiable. He actualizado los colores y el contenido para transmitir profesionalismo.';
      
      updates = {
        colorScheme: {
          primary: '#1E88E5', // Azul profesional
          secondary: '#0D47A1', // Azul oscuro
          accent: '#26A69A', // Verde azulado
        },
        layout: {
          ...currentCustomization.layout,
          type: 'modern',
          width: 'contained',
        },
        websiteContent: {
          ...currentCustomization.websiteContent,
          title: 'Consultores Estratégicos',
          subtitle: 'Soluciones empresariales a medida',
          sections: [
            {
              id: '1',
              title: 'Nuestros Servicios',
              content: '<p>Ofrecemos consultoría estratégica, análisis de mercado y soluciones personalizadas para ayudar a su empresa a alcanzar su máximo potencial.</p>',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
            },
            {
              id: '2',
              title: 'Nuestro Enfoque',
              content: '<p>Combinamos experiencia en la industria con metodologías probadas para ofrecer resultados medibles y un retorno de inversión significativo.</p>',
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
            }
          ],
        },
        features: ['Consultoría Estratégica', 'Análisis de Datos', 'Soluciones Personalizadas'],
        audience: {
          type: 'Empresas en crecimiento',
          purpose: 'Proporcionar soluciones estratégicas para el éxito empresarial'
        }
      };
    }
    else if (inputLower.includes('tienda') || inputLower.includes('ecommerce') || inputLower.includes('venta')) {
      response = 'He diseñado un sitio web para tu tienda online con un aspecto atractivo y orientado a las ventas. He actualizado los colores y el contenido para destacar tus productos.';
      
      updates = {
        colorScheme: {
          primary: '#6200EA', // Púrpura
          secondary: '#3700B3', // Púrpura oscuro
          accent: '#FF6D00', // Naranja brillante
        },
        layout: {
          ...currentCustomization.layout,
          type: 'modern',
          width: 'full',
        },
        websiteContent: {
          ...currentCustomization.websiteContent,
          title: 'Mi Tienda Online',
          subtitle: 'Productos exclusivos a un clic de distancia',
          sections: [
            {
              id: '1',
              title: 'Productos Destacados',
              content: '<p>Descubre nuestra selección de productos más vendidos, cuidadosamente elegidos para satisfacer tus necesidades.</p>',
              image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'
            },
            {
              id: '2',
              title: 'Ofertas Especiales',
              content: '<p>No te pierdas nuestras promociones exclusivas y descuentos por tiempo limitado en productos seleccionados.</p>',
              image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80'
            }
          ],
        },
        features: ['Catálogo de Productos', 'Carrito de Compra', 'Pago Seguro'],
        audience: {
          type: 'Compradores online',
          purpose: 'Ofrecer una experiencia de compra fácil y segura'
        }
      };
    }
    else {
      response = 'Entiendo tu solicitud. Para ayudarte mejor, ¿podrías darme más detalles sobre el tipo de sitio web que necesitas? Por ejemplo, ¿es para un negocio, blog personal, tienda online, etc.?';
    }
    
    // Añadir la respuesta del asistente
    setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    
    // Actualizar la personalización si hay cambios
    if (Object.keys(updates).length > 0) {
      Object.entries(updates).forEach(([key, value]) => {
        updateCustomization(key as keyof CustomizationState, value);
      });
    }
  };

  return (
    <>
      {/* Botón flotante para abrir el asistente */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors z-50"
        aria-label="Abrir asistente de IA"
      >
        <Bot className="w-6 h-6" />
      </button>
      
      {/* Modal del asistente */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[600px] max-h-[80vh]">
            {/* Encabezado */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium">Asistente de Diseño Web</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span className="text-gray-600">Pensando...</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Describe qué tipo de sitio web necesitas..."
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
