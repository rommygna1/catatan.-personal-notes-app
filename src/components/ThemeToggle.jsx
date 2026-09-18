import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useContext(LocaleContext);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="toggle-button"
      onClick={toggleTheme}
      aria-label={t('theme.toggle')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      <span className="toggle-button__icon" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className="toggle-button__text">
        {isDark ? t('theme.light') : t('theme.dark')}
      </span>
    </button>
  );
}

export default ThemeToggle;
