import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Sobre Nosotros</h1>
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Volver al Dashboard
              </Link>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="prose max-w-none">
                    <h2>La PiriApp Customizer</h2>
                    
                    <p className="lead text-lg">
                      Una aplicación web innovadora para crear y personalizar sitios web de manera sencilla e intuitiva.
                    </p>
                    
                    <h3 className="mt-8">Nuestra Misión</h3>
                    <p>
                      En La PiriApp Customizer, creemos que todos deberían tener la capacidad de crear una presencia web profesional, 
                      independientemente de sus conocimientos técnicos. Nuestra misión es democratizar la creación de sitios web, 
                      proporcionando herramientas intuitivas y potentes que permitan a cualquier persona diseñar y publicar 
                      sitios web personalizados que reflejen su visión y objetivos.
                    </p>
                    
                    <h3 className="mt-6">Características Principales</h3>
                    <ul>
                      <li>Personalización completa de colores, diseño y contenido</li>
                      <li>Asistente de IA para ayudar en el diseño</li>
                      <li>Sistema de autenticación seguro</li>
                      <li>Guardado de proyectos en la nube</li>
                      <li>Descarga de sitios web personalizados en formato ZIP</li>
                      <li>Interfaz intuitiva y fácil de usar</li>
                      <li>Plantillas prediseñadas para diferentes tipos de sitios</li>
                    </ul>
                    
                    <h3 className="mt-6">Tecnología</h3>
                    <p>
                      Utilizamos tecnologías modernas y robustas para garantizar una experiencia de usuario fluida y eficiente:
                    </p>
                    <ul>
                      <li>React con TypeScript para una interfaz de usuario dinámica y tipada</li>
                      <li>Vite como bundler para un desarrollo rápido</li>
                      <li>Tailwind CSS para estilos flexibles y responsivos</li>
                      <li>AWS Amplify para autenticación y backend</li>
                      <li>Amazon Cognito para gestión segura de usuarios</li>
                      <li>DynamoDB para almacenamiento escalable de proyectos</li>
                    </ul>
                    
                    <h3 className="mt-6">Nuestro Equipo</h3>
                    <p>
                      La PiriApp Customizer es desarrollada y mantenida por un equipo apasionado por la tecnología y el diseño web.
                    </p>
                    
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex flex-col sm:flex-row items-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                          {/* Aquí iría la imagen del desarrollador */}
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">Fernando Silva T</h4>
                          <p className="text-gray-600">Desarrollador Principal</p>
                          <p className="mt-2">
                            Desarrollador web full-stack con experiencia en React, TypeScript y AWS. 
                            Apasionado por crear herramientas que faciliten la vida digital de las personas.
                          </p>
                          <div className="mt-4">
                            <a 
                              href="https://linktr.ee/fernandosilvot" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-500 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                              </svg>
                              linktr.ee/fernandosilvot
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="mt-8">Contacto</h3>
                    <p>
                      ¿Tienes preguntas, sugerencias o comentarios? Nos encantaría saber de ti.
                      Puedes contactarnos a través de los siguientes medios:
                    </p>
                    <ul>
                      <li>Email: info@piriapp.com</li>
                      <li>Twitter: @PiriAppDev</li>
                      <li>LinkedIn: <a href="https://linkedin.com/in/fernandosilvot" className="text-blue-600 hover:underline">Fernando Silva T</a></li>
                    </ul>
                    
                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} La PiriApp Customizer. Todos los derechos reservados.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Este proyecto está bajo la Licencia MIT.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
