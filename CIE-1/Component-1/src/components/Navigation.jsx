import React from 'react';
import { useApp } from '../context/AppContext';
import { FiCheckCircle, FiGrid, FiList, FiZap, FiBarChart2, FiSun, FiMoon } from 'react-icons/fi';

export const Navbar = () => {
  const { theme, toggleTheme } = useApp();
  return (
    <header className="navbar glass-card">
      <div className="nav-brand">
        <FiCheckCircle className="brand-icon" />
        <span>Deadline<span className="brand-accent">AI</span></span>
      </div>
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
        {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
      </button>
    </header>
  );
};

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useApp();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
    { id: 'tasks', label: 'Assignments', icon: FiList },
    { id: 'next-actions', label: 'Next Actions', icon: FiZap },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  ];

  return (
    <aside className="sidebar">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};