import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Palette, Coin, PuzzlePiece } from '@phosphor-icons/react';

export default function DashboardLayout() {
  const navItems = [
    { name: 'Foundations', path: '/studio/foundations', icon: <Palette size={20} /> },
    { name: 'Tokens', path: '/studio/tokens', icon: <Coin size={20} /> },
    { name: 'Components', path: '/studio/components', icon: <PuzzlePiece size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight">Atria Studio</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
