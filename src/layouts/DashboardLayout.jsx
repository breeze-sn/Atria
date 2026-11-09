import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Palette, Coin, PuzzlePiece } from '@phosphor-icons/react';

export default function DashboardLayout() {
  const navItems = [
    { name: 'Foundations', path: '/explore/foundations', icon: <Palette size={20} /> },
    { name: 'Tokens', path: '/explore/tokens', icon: <Coin size={20} /> },
    { name: 'Components', path: '/explore/components', icon: <PuzzlePiece size={20} /> },
  ];

  return (
    <div className="studio-shell">
      {/* Sidebar */}
      <aside className="studio-sidebar">
        <div className="studio-brand">
          <h1 >Atria Studio</h1>
        </div>
        <nav className="studio-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `studio-nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="studio-main">
        <Outlet />
      </main>
    </div>
  );
}
