import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-xs tracking-widest uppercase px-4 py-1 transition-colors duration-200 ${
      isActive ? 'text-gold-light' : 'text-white/70 hover:text-gold-light'
    }`;

  return (
    <nav className="bg-ink sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <NavLink to="/" className="font-serif text-white text-xl tracking-wide">
          📚 Books <span className="text-gold-light italic">Galore</span>
        </NavLink>
        <ul className="flex items-center">
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/books" className={linkClass}>Books</NavLink></li>
          <li><NavLink to="/books/new" className={linkClass}>Add Book</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
