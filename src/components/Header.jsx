import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import LocaleToggle from './LocaleToggle';
import UserMenu from './UserMenu';
import { LocaleContext } from '../contexts/LocaleContext';

const navLinkClass = ({ isActive }) => (
  isActive ? 'nav-pill nav-pill--active' : 'nav-pill'
);

function Header() {
  const { isAuthenticated } = useAuth();
  const { t } = useContext(LocaleContext);

  return (
    <header className="site-header">
      <div className="site-header__left">
        <NavLink to="/" className="wordmark" aria-label="Notufy - Personal Notes">
          <span className="wordmark__text">
            NOTUFY<span className="wordmark__accent">.</span>
          </span>
        </NavLink>

        {isAuthenticated && (
          <nav className="site-nav" aria-label="Main Navigation">
            <NavLink to="/" end className={navLinkClass}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/archives" className={navLinkClass}>
              {t('nav.archives')}
            </NavLink>
            <NavLink to="/notes/new" className={navLinkClass}>
              {t('nav.addNote')}
            </NavLink>
          </nav>
        )}
      </div>

      <div className="site-header__right">
        <div className="site-controls">
          <ThemeToggle />
          <LocaleToggle />
        </div>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <nav className="site-nav site-nav--guest" aria-label="Authentication Navigation">
            <NavLink to="/login" className={navLinkClass}>
              {t('nav.login')}
            </NavLink>
            <NavLink to="/register" className={navLinkClass}>
              {t('nav.register')}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
