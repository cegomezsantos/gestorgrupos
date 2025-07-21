# Configuración LTI 1.3 con LTIJS

## Instalación
```bash
npm install ltijs
```

## Configuración

### 1. Editar lti-config.js
Reemplaza los valores en `lti-config.js`:

```javascript
// Para Canvas LMS
platform: {
  url: 'https://tu-institucion.instructure.com',
  name: 'Canvas',
  clientId: 'TU_CLIENT_ID',
  authenticationEndpoint: 'https://tu-institucion.instructure.com/login/oauth2/auth',
  accesstokenEndpoint: 'https://tu-institucion.instructure.com/login/oauth2/token',
  authConfig: {
    method: 'JWK_SET',
    key: 'https://tu-institucion.instructure.com/api/lti/security/jwks'
  }
}

// Para Moodle
platform: {
  url: 'https://tu-moodle.com',
  name: 'Moodle',
  clientId: 'TU_CLIENT_ID',
  authenticationEndpoint: 'https://tu-moodle.com/mod/lti/auth.php',
  accesstokenEndpoint: 'https://tu-moodle.com/mod/lti/token.php',
  authConfig: {
    method: 'JWK_SET',
    key: 'https://tu-moodle.com/mod/lti/certs.php'
  }
}
```

### 2. Configurar en el LMS

#### Canvas:
1. Ir a Configuración del curso > Apps externas
2. Agregar nueva app
3. Configurar URL: `http://localhost:3001/lti`
4. Configurar Consumer Key y Shared Secret

#### Moodle:
1. Ir a Administración > Plugins > Actividad externa > Herramientas
2. Agregar nueva herramienta
3. Configurar URL: `http://localhost:3001/lti`
4. Configurar Consumer Key y Shared Secret

## Uso

### Iniciar el servidor:
```bash
npm start
```

### Rutas disponibles:
- `GET /lti` - Endpoint LTI principal
- `GET /api/lti/user` - Información del usuario LTI
- `GET /api/data` - Datos de la aplicación

### Integración con Frontend:
El backend redirige automáticamente al frontend React en `http://localhost:5173`

## Variables de entorno recomendadas:
```bash
LTI_KEY=tu_tool_key
LTI_SECRET=tu_tool_secret
LTI_URL=http://localhost:3001
``` 