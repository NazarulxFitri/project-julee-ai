import React from 'react';

export default function Header() {
  return (
    <header style={{
      height: '50px',
      borderBottom: '1px solid var(--border-glass)',
      background: 'rgba(7, 9, 14, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Clean Brand Title & Online Dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Julee AI</span>
          <div className="status-dot online" style={{ width: '7px', height: '7px' }} />
        </div>
      </div>
    </header>
  );
}


