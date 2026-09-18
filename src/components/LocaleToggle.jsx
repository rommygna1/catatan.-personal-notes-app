import React, { useContext } from 'react';
import { LocaleContext } from '../contexts/LocaleContext';

function LocaleToggle() {
  const { locale, toggleLocale, t } = useContext(LocaleContext);

  return (
    <button
      type="button"
      className="toggle-button toggle-button--locale"
      onClick={toggleLocale}
      aria-label={t('locale.toggle')}
      title={t('locale.toggle')}
    >
      <span className="locale-badge">{locale.toUpperCase()}</span>
    </button>
  );
}

export default LocaleToggle;
