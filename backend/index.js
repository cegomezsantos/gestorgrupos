require('dotenv').config({ path: '../.env' });
const path = require('path');
const lti = require('ltijs').Provider;

// Configurar ltijs con los endpoints
lti.setup(
  process.env.LTI_TOOL_KEY,
  { url: process.env.DB_URL || 'memory' }, // Usar memoria si no hay DB
  {
    appRoute: '/',                      // Endpoint principal (launch)
    loginRoute: '/lti/login',           // Endpoint OIDC login initiation
    keysetRoute: '/.well-known/jwks.json' // JWKS endpoint
  }
);

// Launch handler
lti.onConnect(async (token, req, res) => {
  console.log('LTI Launch - Usuario:', token.userInfo.name);
  console.log('LTI Launch - Rol:', token.userInfo.roles);
  console.log('LTI Launch - Contexto:', token.contextInfo.contextId);
  
  // Redirigir al frontend React con datos del usuario
  const redirectUrl = `${process.env.FRONTEND_URL}?lti_user=${encodeURIComponent(token.userInfo.name)}&lti_role=${encodeURIComponent(token.userInfo.roles)}&lti_context=${encodeURIComponent(token.contextInfo.contextId)}`;
  
  return res.redirect(redirectUrl);
});

// Registrar plataforma (debe estar después de setup)
lti.registerPlatform({
  url: process.env.LTI_PLATFORM_URL,                    // URL de tu Moodle
  name: process.env.LTI_PLATFORM_NAME,                  // Nombre (ej: Moodle)
  clientId: process.env.LTI_CLIENT_ID,                  // Client ID de Moodle
  authenticationEndpoint: `${process.env.LTI_PLATFORM_URL}/mod/lti/auth.php`,
  accesstokenEndpoint: `${process.env.LTI_PLATFORM_URL}/mod/lti/token.php`,
  authConfig: {
    method: 'JWK_SET',
    key: `${process.env.LTI_TOOL_URL}/.well-known/jwks.json` // JWKS de tu herramienta
  }
});

// Middleware para CORS y JSON
lti.app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Ruta de prueba
lti.app.get('/api/health', (req, res) => {
  res.json({ 
    message: '¡Backend funcionando correctamente!',
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 3001,
    ltiConfigured: true
  });
});

// Ruta para obtener datos de ejemplo
lti.app.get('/api/data', (req, res) => {
  res.json({
    home: {
      title: 'Bienvenido a la página principal',
      description: 'Esta es la página de inicio de nuestra aplicación'
    },
    menu: {
      title: 'Nuestro Menú',
      items: [
        { id: 1, name: 'Plato 1', price: 15.99 },
        { id: 2, name: 'Plato 2', price: 12.99 },
        { id: 3, name: 'Plato 3', price: 18.99 }
      ]
    },
    about: {
      title: 'Sobre Nosotros',
      description: 'Somos una empresa comprometida con la calidad'
    },
    catering: {
      title: 'Servicios de Catering',
      description: 'Ofrecemos servicios profesionales de catering'
    },
    contact: {
      title: 'Contacto',
      email: 'info@empresa.com',
      phone: '+1 234 567 890'
    },
    locations: {
      title: 'Nuestras Ubicaciones',
      locations: [
        { name: 'Sucursal Centro', address: 'Calle Principal 123' },
        { name: 'Sucursal Norte', address: 'Avenida Norte 456' }
      ]
    },
    delivery: {
      title: 'Información de Delivery',
      description: 'Entregamos en toda la ciudad en menos de 30 minutos'
    }
  });
});

// Ruta para recibir datos del frontend
lti.app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Aquí puedes agregar lógica para guardar en base de datos
  console.log('Nuevo mensaje de contacto:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Mensaje recibido correctamente' 
  });
});

// Ruta para obtener información del usuario LTI
lti.app.get('/api/lti/user', async (req, res) => {
  try {
    const token = await lti.validateRequest(req, res);
    if (token) {
      res.json({
        user: token.userInfo,
        context: token.contextInfo,
        platform: token.platformInfo
      });
    } else {
      res.status(401).json({ error: 'No autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para verificar configuración
lti.app.get('/api/config', (req, res) => {
  res.json({
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV,
    ltiToolUrl: process.env.LTI_TOOL_URL,
    frontendUrl: process.env.FRONTEND_URL,
    platformUrl: process.env.LTI_PLATFORM_URL,
    platformName: process.env.LTI_PLATFORM_NAME,
    clientId: process.env.LTI_CLIENT_ID
  });
});

// Deploy el servidor
const setup = async () => {
  try {
    await lti.deploy({ 
      port: process.env.PORT || 3001,
      serverless: false
    });
    
    console.log(`🚀 Servidor LTI ejecutándose en http://localhost:${process.env.PORT || 3001}`);
    console.log(`📡 API disponible en http://localhost:${process.env.PORT || 3001}/api`);
    console.log(`🔗 LTI Launch: http://localhost:${process.env.PORT || 3001}/`);
    console.log(`🔐 LTI Login: http://localhost:${process.env.PORT || 3001}/lti/login`);
    console.log(`🔑 JWKS: http://localhost:${process.env.PORT || 3001}/.well-known/jwks.json`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

setup(); 