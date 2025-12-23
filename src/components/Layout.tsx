import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header>
        <div className="header-content">
          <img src="/images/mini_logo.png" alt="PZM Logo" className="logo" />
          <div className="header-text">
            <h1>PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build</h1>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <div className="services-dropdown">
          <a href="#">Services</a>
          <div className="dropdown-content">
            <Link to="/services/brand-new">New Devices</Link>
            <Link to="/services/secondhand">Used Devices</Link>
            <Link to="/services/repair">Repair Services</Link>
            <Link to="/services/gaming-pc">Gaming PC</Link>
            <Link to="/services/sell-gadgets">Sell Devices</Link>
            <Link to="/services/accessories">Accessories</Link>
          </div>
        </div>
        <Link to="/blog">Blog</Link>
        <a href="#contact">Contact</a>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <p>PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build<br /> &copy; {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}