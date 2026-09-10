import React from 'react';
import { MessageSquare, Terminal } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header style={{
      height: '56px',
      borderBottom: '1px solid var(--border-glass)',
      background: 'rgba(7, 9, 14, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Simple Brand Title & Online Dot (Logo box removed) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Julee AI</span>
          <div className="status-dot online" style={{ width: '7px', height: '7px' }} />
        </div>
      </div>

      {/* Simple Mobile Tab Switcher */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '3px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-glass)'
      }}>
        <button
          onClick={() => setActiveTab('chat')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'chat' ? 'var(--primary-purple)' : 'transparent',
            color: activeTab === 'chat' ? '#fff' : 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          <MessageSquare size={14} style={{ display: 'block' }} />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'terminal' ? 'var(--primary-purple)' : 'transparent',
            color: activeTab === 'terminal' ? '#fff' : 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          <Terminal size={14} style={{ display: 'block' }} />
          <span>Logs</span>
        </button>
      </div>
    </header>
  );
}
