import React, { useState } from 'react';

const COLORS = {
  green: '#8dc26f',
  yellow: '#f9e79f',
  menuText: '#2d4739',
  white: '#fff',
};

const navItems = [
  { key: 'home', label: 'HOME' },
  { key: 'menu', label: 'MENU' },
  { key: 'about', label: 'ABOUT' },
  { key: 'catering', label: 'CATERING' },
  { key: 'contact', label: 'CONTACT' },
  { key: 'locations', label: 'LOCATIONS' },
  { key: 'delivery', label: 'DELIVERY' },
];

function App() {
  const [selected, setSelected] = useState('home');

  return (
    <div style={{ minHeight: '100vh', background: COLORS.white, fontFamily: 'Inter, sans-serif' }}>
      {/* Barra superior */}
      <div style={{ background: COLORS.green, padding: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 32px',
          height: 56,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'cursive', fontWeight: 700, fontSize: 36, color: '#2d4739', lineHeight: 1 }}>bl</span>
            <span style={{ fontFamily: 'cursive', fontSize: 18, color: '#2d4739', marginLeft: 2, marginTop: 12, position: 'relative', top: 8 }}>market</span>
          </div>
          {/* Botón derecho */}
          <div style={{ color: COLORS.white, fontWeight: 400, fontSize: 16 }}>ORDER ONLINE</div>
        </div>
      </div>
      {/* Menú horizontal */}
      <div style={{ background: COLORS.yellow, width: '100%' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 36,
          height: 48,
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 1,
        }}>
          {navItems.map(item => (
            <span
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                color: selected === item.key ? COLORS.green : COLORS.menuText,
                borderBottom: selected === item.key ? `3px solid ${COLORS.green}` : '3px solid transparent',
                padding: '0 4px 4px 4px',
                cursor: 'pointer',
                transition: 'color 0.2s, border-bottom 0.2s',
              }}
            >
              {item.label}
            </span>
          ))}
        </nav>
      </div>
      {/* Imagen amplia de fondo */}
      <div style={{
        width: '100%',
        minHeight: 340,
        background: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
      }}>
        {/* Espacio para overlay si se desea */}
      </div>
      {/* Contenido principal según menú */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 48px 16px' }}>
        <div style={{ background: COLORS.white, borderRadius: 12, boxShadow: '0 4px 24px 0 rgba(60,72,88,0.10)', padding: 32, minHeight: 180, marginTop: 8 }}>
          {selected === 'home' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Bienvenido a la página principal
            </div>
          )}
          {selected === 'menu' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Aquí irá el menú de productos
            </div>
          )}
          {selected === 'about' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Información sobre nosotros
            </div>
          )}
          {selected === 'catering' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Servicios de catering
            </div>
          )}
          {selected === 'contact' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Formulario de contacto
            </div>
          )}
          {selected === 'locations' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Nuestras ubicaciones
            </div>
          )}
          {selected === 'delivery' && (
            <div style={{ fontSize: 20, color: '#333', textAlign: 'center' }}>
              Información de delivery
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 