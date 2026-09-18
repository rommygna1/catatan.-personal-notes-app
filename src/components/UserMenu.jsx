import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { LocaleContext } from '../contexts/LocaleContext';

function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useContext(LocaleContext);

  if (!user) {
    return null;
  }

  return (
    <div className="user-menu">
      <div className="user-badge" title={user.email}>
        <span className="user-badge__avatar" aria-hidden="true">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </span>
        <div className="user-badge__info">
          <span className="user-badge__name">{user.name}</span>
          <span className="user-badge__email">{user.email}</span>
        </div>
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
  );
}

export default UserMenu;
