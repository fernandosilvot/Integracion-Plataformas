import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Configuración de AWS Amplify para autenticación con Cognito
Amplify.configure(awsconfig);

// Nota: La configuración ahora viene del archivo aws-exports.js generado automáticamente por Amplify CLI
// Este archivo contiene toda la información necesaria para conectarse a tu User Pool de Cognito
