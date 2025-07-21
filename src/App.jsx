import React, { useState } from 'react';

const COLORS = {
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
      {/* Menú horizontal */}
      <div style={{ background: COLORS.yellow, width: '100%', boxShadow: '0 2px 8px 0 rgba(60,72,88,0.06)' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 36,
          height: 64,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 1,
        }}>
          {navItems.map(item => (
            <span
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                color: selected === item.key ? '#7bb661' : COLORS.menuText,
                borderBottom: selected === item.key ? '3px solid #7bb661' : '3px solid transparent',
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
      {/* Contenido principal según menú */}
      <div style={{ maxWidth: 900, margin: '48px auto 0 auto', padding: '0 16px 48px 16px' }}>
        <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: '0 4px 24px 0 rgba(60,72,88,0.10)', padding: 48, minHeight: 180 }}>
          {selected === 'home' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Bienvenido a la página principal
            </div>
          )}
          {selected === 'menu' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Aquí irá el menú de productos
            </div>
          )}
          {selected === 'about' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Información sobre nosotros
            </div>
          )}
          {selected === 'catering' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Servicios de catering
            </div>
          )}
          {selected === 'contact' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Formulario de contacto
            </div>
          )}
          {selected === 'locations' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Nuestras ubicaciones
            </div>
          )}
          {selected === 'delivery' && (
            <div style={{ fontSize: 22, color: '#333', textAlign: 'center' }}>
              Información de delivery
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 