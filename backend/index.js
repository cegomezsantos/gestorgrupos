const express = require('express');
const cors = require('cors');
const lti = require('ltijs').Provider;
const ltiConfig = require('./lti-config');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar LTI
const provider = new lti(ltiConfig.tool.key, ltiConfig.tool.secret, {
  url: ltiConfig.tool.url,
  name: ltiConfig.tool.name,
  description: ltiConfig.tool.description,
  privacyLevel: ltiConfig.tool.privacyLevel
});

// Middleware LTI
app.use(provider.app());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '¡Backend funcionando correctamente!' });
});

// Ruta LTI - Página principal de la herramienta
provider.onConnect(async (token, req, res) => {
  return res.send(`
    <html>
      <head><title>${ltiConfig.tool.name}</title></head>
      <body>
        <h1>Bienvenido a ${ltiConfig.tool.name}</h1>
        <p>Usuario: ${token.userInfo.name}</p>
        <p>Rol: ${token.userInfo.roles}</p>
        <script>
          // Redirigir al frontend React
          window.location.href = 'http://localhost:5173';
        </script>
      </body>
    </html>
  `);
});

// Ruta para obtener datos de ejemplo
app.get('/api/data', (req, res) => {
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
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Aquí puedes agregar lógica para guardar en base de datos
  console.log('Nuevo mensaje de contacto:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Mensaje recibido correctamente' 
  });
});

// Ruta para obtener información del usuario LTI
app.get('/api/lti/user', async (req, res) => {
  try {
    const token = await provider.validateRequest(req, res);
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  console.log(`🔗 LTI disponible en http://localhost:${PORT}/lti`);
});

module.exports = app; 