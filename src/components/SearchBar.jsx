import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../contexts/LocaleContext';

function SearchBar({ keyword = '', onKeywordChange, placeholder }) {
  const { t } = useContext(LocaleContext);
  const defaultPlaceholder = placeholder || t('search.activePlaceholder');

  const handleChange = (event) => {
    onKeywordChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="note-search">
        {t('search.label')}
      </label>
      <input
        id="note-search"
        type="text"
        className="search-bar__input"
        value={keyword}
        placeholder={defaultPlaceholder}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  onKeywordChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
