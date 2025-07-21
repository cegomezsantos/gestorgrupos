const lti = require('ltijs').Provider;

// Configuración LTI 1.3
const ltiConfig = {
  // Credenciales de la plataforma
  platform: {
    url: 'https://canvas.instructure.com', // Cambia por tu LMS
    name: 'Canvas',
    clientId: 'your_client_id', // Reemplaza con tu Client ID
    authenticationEndpoint: 'https://canvas.instructure.com/login/oauth2/auth',
    accesstokenEndpoint: 'https://canvas.instructure.com/login/oauth2/token',
    authConfig: {
      method: 'JWK_SET',
      key: 'https://canvas.instructure.com/api/lti/security/jwks'
    }
  },
  
  // Configuración de la herramienta
  tool: {
    name: 'Gestión de Grupos',
    description: 'Aplicación para gestión de grupos',
    url: 'http://localhost:3001',
    key: 'your_tool_key', // Reemplaza con tu Tool Key
    secret: 'your_tool_secret', // Reemplaza con tu Tool Secret
    privacyLevel: 'public'
  }
};

module.exports = ltiConfig; 