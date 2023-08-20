import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return(
    <form className="searchForm" onSubmit={(e)=> e.preventDefault()}>
      <label htmlFor="searchForm"> Serach Item</label>
      <input type="text"
        role="search"
        autoFocus
        placeholder="Search Item"
        id="searchForm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  )
};

export default SearchItem;
