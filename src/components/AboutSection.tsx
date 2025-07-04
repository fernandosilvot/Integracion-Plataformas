import React from 'react';
import { Code, Zap, Users, Globe, Heart, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="p-6">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          <span className="block">Bienvenido a</span>
          <span className="block text-indigo-600">La PiriApp Customizer</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Creamos herramientas que hacen que el diseño web sea accesible para todos.
        </p>
      </div>

      {/* Mission section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 mb-12">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-lg text-gray-700">
              En La PiriApp Customizer, creemos que todos deberían poder crear sitios web profesionales sin necesidad de conocimientos técnicos avanzados. Nuestra misión es democratizar el diseño web, proporcionando herramientas intuitivas que permitan a cualquier persona expresar su creatividad y establecer su presencia en línea.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Heart className="w-20 h-20 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Por qué elegir La PiriApp Customizer?</h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Rápido y Sencillo</h4>
            <p className="text-gray-600">
              Crea sitios web profesionales en minutos, no en días. Nuestra interfaz intuitiva te guía en cada paso del proceso.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Sin Código</h4>
            <p className="text-gray-600">
              No necesitas saber programar. Nuestro editor visual te permite diseñar tu sitio web arrastrando y soltando elementos.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">100% Personalizable</h4>
            <p className="text-gray-600">
              Adapta cada aspecto de tu sitio web a tu marca. Colores, fuentes, diseños y más, todo bajo tu control.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Asistencia IA</h4>
            <p className="text-gray-600">
              Nuestro asistente de IA te ayuda a tomar decisiones de diseño y te sugiere mejoras para optimizar tu sitio web.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600 mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Resultados Profesionales</h4>
            <p className="text-gray-600">
              Obtén un sitio web de aspecto profesional que impresionará a tus visitantes y reflejará la calidad de tu marca.
            </p>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">         
          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src="/assets/victoria.jpeg" 
                alt="Victoria Roa" 
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Victoria Roa</h4>
            <p className="text-indigo-600">Fundador & CEO</p>
            <p className="mt-2 text-gray-500">
              Creando experiencias de usuario intuitivas y atractivas.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src="/assets/fer.jpeg" 
                alt="Fernando Silva T" 
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Fernando Silva T</h4>
            <p className="text-indigo-600">Desarrollador Senior</p>
            <p className="mt-2 text-gray-500">
              Apasionado por hacer que la tecnología sea accesible para todos.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src="/assets/edu.jpeg" 
                alt="Eduardo Guzman" 
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Eduardo Guzman</h4>
            <p className="text-indigo-600">Desarrollador Full Stack</p>
            <p className="mt-2 text-gray-500">
              Construyendo la tecnología que impulsa nuestras herramientas.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src="/assets/carlos.jpeg"
                alt="Carlos Peña" 
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Carlos Peña</h4>
            <p className="text-indigo-600">Desarrollador Full Stack</p>
            <p className="mt-2 text-gray-500">
              Construyendo la tecnología que impulsa nuestras herramientas.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <img 
                src="/assets/rodrigo.jpeg" 
                alt="Rodrigo Mujica" 
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Rodrigo Mujica</h4>
            <p className="text-indigo-600">Documentador</p>
            <p className="mt-2 text-gray-500">
              Construyendo la tecnología que impulsa nuestras herramientas.
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contáctanos</h3>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Información de Contacto</h4>
              <p className="text-gray-600 mb-4">
                ¿Tienes preguntas o comentarios? Nos encantaría saber de ti.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">info@piriapp.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">Santiago, Chile</span>
                </li>
              </ul>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-indigo-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Envíanos un Mensaje</h4>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
