import React, {useState,useEffect} from 'react';
import CardsGrid from './CardsGrid.js';
import SearchBar from './SearchBar.js';
import Logo from './Pokemon.png';

function Gallery(props) {
  const {searchValue,setSearchValue} = props;
  const [allCards,setAllCards] = useState([]); //Stores the id and image url of all cards in the gallery

  // On the initial render (when the mode switches from game to gallery), display the default pokemon cards unless there is already text in the search bar
  useEffect(()=>{
    if (searchValue.length === 0){
      handleSearch('umbreon'); //default pokemon to search for
    }
    else {
      handleSearch(searchValue);
    }
  //eslint-disable-next-line
  },[]);

  const handleSearch = async (search)=>{
    const maxCardsToQuery = 500;
    const newCards = await (await fetch(`https://api.pokemontcg.io/v1/cards?name=${search}&pageSize=${maxCardsToQuery}`)).json().then((response)=>{return response.cards});
    
    // Display new cards in the gallery if the search is valid
    if (newCards.length !== 0){ 
      const allQueriedCards = [];
      newCards.forEach((newCard)=>{allQueriedCards.push({cardId:newCard.id,imageUrl:newCard.imageUrl})});
      setAllCards(allQueriedCards);
    }
  }

  return (
    <div className="Game">
      <div className = 'Header'>
        <img id="logo" src={Logo} alt="logo"/>
        <div id="emptyPlaceholder"></div> {/* An empty div as a placeholder in the css grid so that the logo and search bar are positioned correctly  */}
        <SearchBar mode={props.mode} changeMode={props.changeMode} 
          handleSearch={handleSearch} searchValue={searchValue} onSearchValueChange={(e)=>{setSearchValue(e.target.value)}} />
      </div>
      
      <CardsGrid cards={allCards} handleGame={()=>{}} shuffle={()=>{}}/>
    </div>
  );
}

export default Gallery;
