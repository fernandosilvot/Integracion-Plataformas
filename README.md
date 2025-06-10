# Integracion-Plataformas-Deploy

Esta es una versión del proyecto Integracion-Plataformas configurada específicamente para usar AWS Cognito para autenticación.

## Configuración de AWS Cognito

La aplicación ya está configurada para usar AWS Cognito con los siguientes detalles:

- **Region**: us-east-1
- **User Pool ID**: us-east-1_BsrxeudsL
- **App Client ID**: 7gl4t9niavlu0p9ekigqm8bb00

La configuración se carga automáticamente desde el archivo `src/aws-exports.js` generado por Amplify CLI.

## Ejecución del proyecto

1. Instala las dependencias:
   ```
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Funcionalidades implementadas

- Registro de usuarios con AWS Cognito
- Inicio de sesión con AWS Cognito
- Confirmación de registro por código (enviado por email)
- Recuperación de contraseña
- Rutas protegidas que requieren autenticación
- Perfil de usuario

## Estructura del proyecto

- `src/components/auth/`: Componentes relacionados con la autenticación
- `src/aws-config.ts`: Configuración de AWS Amplify y Cognito
- `src/aws-exports.js`: Archivo generado por Amplify con la configuración de AWS

## Notas importantes

- Los usuarios deben confirmar su registro mediante un código enviado por email
- Las contraseñas deben tener al menos 8 caracteres
- La autenticación se realiza mediante email (no username)
- La verificación de usuarios se realiza por email
