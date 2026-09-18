import React, { useContext, useState, useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { LocaleContext } from '../contexts/LocaleContext';

function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useContext(LocaleContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-badge__avatar"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        title={user.email}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          <div className="user-menu__info">
            <span className="user-badge__name">{user.name}</span>
            <span className="user-badge__email">{user.email}</span>
          </div>
          <button
            type="button"
            className="button button--secondary button--logout"
            onClick={logout}
            aria-label={t('nav.logout')}
          >
            {t('nav.logout')}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
