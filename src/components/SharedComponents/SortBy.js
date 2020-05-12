import React from "react";
import PropTypes from "prop-types";

function SortBy(props) {
  const { handleSortByChange } = props;
  return (
    <div>
      <label htmlFor="filter">Sort by:</label>
      <select onChange={handleSortByChange} id="filter">
        <option key="rating" value="rating">
          Top rated
        </option>
        <option key="time" value="time">
          Less time
        </option>
      </select>
    </div>
  );
}

SortBy.propTypes = {
  handleSortByChange: PropTypes.func.isRequired,
};
export default SortBy;
