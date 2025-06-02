# La PiriApp Customizer

Una aplicación web para crear y personalizar sitios web de manera sencilla e intuitiva.

## Características

- Personalización completa de colores, diseño y contenido
- Asistente de IA para ayudar en el diseño
- Sistema de autenticación con AWS Cognito
- Guardado de proyectos en la nube
- Descarga de sitios web personalizados en formato ZIP

## Tecnologías utilizadas

- React con TypeScript
- Vite como bundler
- Tailwind CSS para estilos
- AWS Amplify para autenticación y backend
- Amazon Cognito para gestión de usuarios
- DynamoDB para almacenamiento de proyectos

## Configuración del proyecto

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- Cuenta de AWS
- AWS CLI configurado
- Amplify CLI instalado

### Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd project
```

2. Instalar dependencias:
```bash
npm install
```

3. Inicializar Amplify:
```bash
amplify init
```

4. Añadir autenticación:
```bash
amplify add auth
```

5. Añadir almacenamiento:
```bash
amplify add storage
```

6. Añadir API:
```bash
amplify add api
```

7. Implementar recursos en AWS:
```bash
amplify push
```

8. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del proyecto

- `/src`: Código fuente de la aplicación
  - `/components`: Componentes de React
    - `/auth`: Componentes relacionados con la autenticación
    - `/steps`: Pasos del asistente de personalización
  - `/services`: Servicios para interactuar con APIs
  - `/App.tsx`: Componente principal
  - `/main.tsx`: Punto de entrada

- `/amplify`: Configuración de AWS Amplify
  - `/backend`: Recursos de backend
    - `/auth`: Configuración de Cognito
    - `/storage`: Configuración de DynamoDB
    - `/api`: Configuración de API Gateway
    - `/function`: Funciones Lambda

## Contacto

Para cualquier duda o consulta, contacta al creador:
Fernando Silva T (https://linktr.ee/fernandosilvot)

## Licencia

Este proyecto está bajo la Licencia MIT.
