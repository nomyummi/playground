import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './SearchBar.css';

function SearchBar(props){
  const {searchValue,handleSearch,onSearchValueChange,changeDifficulty,changeMode,mode} = props;
  const options = [
    'Normal Mode', 'Hard Mode', 'Gallery Mode'
  ];
  // const defaultOption=mode;

  const onChange = (option)=>{
    if (mode !== option.value){
      changeMode(option.value);
      if (mode !== 'Gallery Mode'){
        changeDifficulty();
      }
    }
  }

  return (
    <div className="SearchContainer">
      <div id="searchBarAndButton">
        <input id="searchBar" type="text" value={searchValue} onChange={onSearchValueChange} placeholder="Enter a Pokemon..."/>
        <button id="searchButton" onClick={()=>{handleSearch(searchValue)}}>
          <i className="fas fa-search fa-lg" aria-hidden="true"></i>
        </button>
      </div>
      <Dropdown onChange={onChange} options={options} value={mode} 
        arrowClassName='arrowModeSelect' controlClassName='controlModeSelect' className='modeSelect'/>
    </div>
  );
}

export default SearchBar;