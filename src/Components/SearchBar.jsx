import React from "react";

import "./SearchBar.css";

const SearchBar = () => {
  return (
    <section className='search_section'>
      <div className='search_input_div'>
        <input
          type='text'
          className='search_input'
          placeholder='Chercher un service'
          autoComplete='off'
        />
        <div className='search_icon'>
          { /*<SearchIcon />*/}
        </div>
      </div>
      <div className='search_result'>

      </div>
    </section>
  );
};

export default SearchBar;
