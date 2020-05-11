import React from "react";

function SortBy(props) {
  const { handleSortByChange } = props;
  return (
    <div>
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

export default SortBy;
