import React from 'react';
import { MessageSquare, Terminal } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '56px',
      background: 'rgba(9, 13, 22, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-glass)',
      display: 'none', // Mobile media query turns this to flex
      alignItems: 'center',
      justify: 'space-around',
      zIndex: 40,
      padding: '0 12px'
    }}>
      <button
        onClick={() => setActiveTab('chat')}
        style={{
          flex: 1,
          height: '100%',
          border: 'none',
          background: 'transparent',
          color: activeTab === 'chat' ? 'var(--primary-purple)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: activeTab === 'chat' ? 600 : 400,
          cursor: 'pointer'
        }}
      >
        <MessageSquare size={18} style={{ display: 'block' }} />
        <span>Chat</span>
      </button>

      <button
        onClick={() => setActiveTab('terminal')}
        style={{
          flex: 1,
          height: '100%',
          border: 'none',
          background: 'transparent',
          color: activeTab === 'terminal' ? 'var(--primary-purple)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: activeTab === 'terminal' ? 600 : 400,
          cursor: 'pointer'
        }}
      >
        <Terminal size={18} style={{ display: 'block' }} />
        <span>Logs</span>
      </button>
    </div>
  );
}
