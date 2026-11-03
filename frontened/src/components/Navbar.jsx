import React from 'react';
import { Link2, Sun, Moon, Database, Activity, RefreshCw } from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  serverStatus, 
  storageInfo, 
  onRefresh, 
  isRefreshing 
}) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="brand">
        <div className="brand-icon">
          <Link2 size={24} strokeWidth={2.5} />
        </div>
        <div className="brand-info">
          <h1>SnapLink</h1>
          <p>Shortener & Analytics</p>
        </div>
      </div>

      <div className="nav-actions">
        {/* Backend Server Status Badge */}
        <div 
          className="status-badge" 
          title={
            serverStatus === 'online' 
              ? (storageInfo?.connected 
                  ? `MongoDB Connected (${storageInfo.dbName || 'urlshortener'})` 
                  : `Storage: In-Memory Fallback (${storageInfo?.error || 'MongoDB disconnected - URLs not saving permanently'})`)
              : 'Server Offline'
          }
        >
          <span className={`status-dot ${
            serverStatus === 'online' 
              ? (storageInfo?.connected ? 'online' : 'warning') 
              : 'offline'
          }`}></span>
          <span>
            {serverStatus === 'online' 
              ? (storageInfo?.connected ? 'MongoDB Atlas' : 'Memory Mode (No DB)') 
              : 'Offline'}
          </span>
          {serverStatus === 'online' && (
            <Database 
              size={13} 
              style={{ 
                color: storageInfo?.connected ? 'var(--success)' : 'var(--warning)', 
                marginLeft: '2px' 
              }} 
            />
          )}
        </div>

        {/* Sync Refresh Button */}
        <button 
          onClick={onRefresh} 
          className="icon-btn" 
          title="Refresh Link Analytics"
          aria-label="Refresh Data"
        >
          <RefreshCw size={17} className={isRefreshing ? 'spinner' : ''} />
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme} 
          className="icon-btn" 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
