import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  // Safely parse local storage user
  const getUserInitials = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return 'U';
      
      const user = JSON.parse(storedUser);
      const name = user?.username || user?.email || user?.name || 'User';
      return name.charAt(0).toUpperCase();
    } catch (e) {
      return 'U';
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <span className="logo-emoji">🌾</span>
        <span className="logo-text">Krishi-Dhan</span>
      </div>
      <div className="nav-links">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''} 
          onClick={() => setActiveTab('add')}
        >
          Add Investment
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      <div className="nav-profile">
        <div className="weather-widget">☀️ 31°C</div>
        <div className="user-avatar">{getUserInitials()}</div>
      </div>
    </nav>
  );
};

export default Navbar;