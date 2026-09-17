import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword = '', onKeywordChange, placeholder = 'Cari berdasarkan judul...' }) {
  const handleChange = (event) => {
    onKeywordChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="note-search">Cari catatan</label>
      <input
        id="note-search"
        type="text"
        className="search-bar__input"
        value={keyword}
        placeholder={placeholder}
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
