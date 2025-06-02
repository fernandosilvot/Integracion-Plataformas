import { Amplify } from 'aws-amplify';

// Nota: En un entorno real, estos valores vendrían del archivo aws-exports.js generado por Amplify CLI
// Este es un ejemplo de configuración manual para desarrollo
Amplify.configure({
  Auth: {
    // Región de AWS donde se encuentra tu User Pool de Cognito
    region: 'us-east-1',
    
    // ID del User Pool de Cognito (reemplazar con tu ID real después de ejecutar 'amplify add auth')
    userPoolId: 'us-east-1_XXXXXXXXX',
    
    // ID del App Client (reemplazar con tu ID real después de ejecutar 'amplify add auth')
    userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    
    // Configuración adicional
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

// Comentario: Para configurar correctamente, ejecuta los siguientes comandos:
// 1. amplify init
// 2. amplify add auth
// 3. amplify push
// 4. Importa el archivo generado aws-exports.js en lugar de esta configuración manual
