import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) => (
  isActive ? 'nav-pill nav-pill--active' : 'nav-pill'
);

function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="wordmark" aria-label="Catatan Pribadi - Beranda">
        <span className="wordmark__text">CATATAN<span className="wordmark__accent">.</span></span>
      </NavLink>
      <nav className="site-nav" aria-label="Navigasi utama">
        <NavLink to="/" end className={navLinkClass}>Beranda</NavLink>
        <NavLink to="/archives" className={navLinkClass}>Arsip</NavLink>
        <NavLink to="/notes/new" className={navLinkClass}>Tambah</NavLink>
      </nav>
    </header>
  );
}

export default Header;
