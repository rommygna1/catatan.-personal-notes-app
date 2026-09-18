import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import en from '../locales/en.json';
import id from '../locales/id.json';

const dictionaries = {
  en,
  id,
};

const LocaleContext = createContext();

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en');

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => (prevLocale === 'en' ? 'id' : 'en'));
  }, []);

  const t = useCallback((path, vars = {}) => {
    const dict = dictionaries[locale] || dictionaries.en;
    const keys = path.split('.');
    let value = dict;

    for (let i = 0; i < keys.length; i += 1) {
      if (value && typeof value === 'object') {
        value = value[keys[i]];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined) {
      return path;
    }

    if (typeof value === 'string' && Object.keys(vars).length > 0) {
      return Object.keys(vars).reduce(
        (acc, varKey) => acc.replace(new RegExp(`{{${varKey}}}`, 'g'), vars[varKey]),
        value,
      );
    }

    return value;
  }, [locale]);

  const contextValue = useMemo(() => ({
    locale,
    toggleLocale,
    t,
  }), [locale, toggleLocale, t]);

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocaleContext, LocaleProvider };
