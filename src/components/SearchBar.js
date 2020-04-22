import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

function SearchBar(props) {
  const { input, handleChange } = props;
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search ingredient"
        value={input}
        onChange={handleChange}
      />
      <MdSearch className="search" />
    </div>
  );
}

SearchBar.propTypes = {
  input: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
