import React from "react";
import PropTypes from "prop-types";
import "./SortBy.scss";

function SortBy(props) {
  const { handleSortByChange } = props;
  return (
    <div className="sort-by">
      <label for="filter">Sort by:</label>
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
