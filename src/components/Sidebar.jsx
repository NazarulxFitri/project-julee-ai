import React from 'react';
import { MessageSquare, Terminal, ShieldCheck } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'chat', label: 'Julee Chat', icon: MessageSquare },
    { id: 'terminal', label: 'Terminal Logs', icon: Terminal }
  ];

  return (
    <aside className="app-sidebar" style={{
      width: '240px',
      background: 'rgba(9, 13, 22, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      padding: '20px 16px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }}>
      <div>
        {/* Brand Header (Logo box removed) */}
        <div style={{
          padding: '0 8px 16px 8px',
          borderBottom: '1px solid var(--border-glass)',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Julee AI</span>
            <div className="status-dot online" style={{ width: '7px', height: '7px' }} />
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--primary-cyan)', fontWeight: 500, marginTop: '2px' }}>
            24/7 AI Partner
          </div>
        </div>

        {/* Navigation items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                  background: isActive ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.03) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', flexShrink: 0 }}>
                  <Icon size={18} color={isActive ? 'var(--primary-cyan)' : 'var(--text-muted)'} style={{ display: 'block' }} />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="glass-panel" style={{ padding: '12px', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={16} color="var(--primary-emerald)" style={{ display: 'block' }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>24/7 Cloud Active</span>
        </div>
      </div>
    </aside>
  );
}
