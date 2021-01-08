import React, {useEffect, useState} from 'react';
import Scoreboard from './Scoreboard.js';
import CardsGrid from './CardsGrid.js';
import SearchBar from './SearchBar.js';
import Logo from './Pokemon.png';

const defaultStartingCards =  [
  {cardId:'pl2-114',imageUrl:'https://images.pokemontcg.io/pl2/114.png'},
  {cardId:'swshp-SWSH074',imageUrl:"https://images.pokemontcg.io/swshp/SWSH074.png"},
  {cardId:'basep-24',imageUrl:"https://images.pokemontcg.io/basep/24.png"},
  {cardId:'basep-25',imageUrl:"https://images.pokemontcg.io/basep/25.png"},
  {cardId:'bw11-RC7',imageUrl:"https://images.pokemontcg.io/bw11/RC7.png"},
  {cardId:'base4-87',imageUrl:"https://images.pokemontcg.io/base4/87.png"},
  {cardId:'basep-27',imageUrl:"https://images.pokemontcg.io/basep/27.png"},
  {cardId:'basep-4',imageUrl:"https://images.pokemontcg.io/basep/4.png"},
  {cardId:'smp-SM86',imageUrl:"https://images.pokemontcg.io/smp/SM86.png"},
  {cardId:'xy1-42',imageUrl:"https://images.pokemontcg.io/xy1/42.png"}
];

function Game(props) {
  const {startingDifficulty,searchValue,setSearchValue} = props;
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [cardsFound,setCardsFound] = useState([]); //Keep track of which cards have been clicked already
  const [cards,setCards] = useState([]); // Keep track of which cards are being displayed
  const [allCards,setAllCards] = useState([]); // Keep track of all cards that were queried
  const [difficulty,setDifficulty] = useState(startingDifficulty);

  const maxCardsToDisplay = 10;

  // When the game is first rendered (as the default mode or when switching from gallery mode to normal/hard mode)
  useEffect(()=>{
    if (startingDifficulty === 'hard'){
      if (searchValue.length === 0){ // Search bar is empty
        handleSearch('articuno');
      }
      else {
        handleSearch(searchValue);
      }
    }
    else {
      if (searchValue.length === 0){ // Search bar is empty
        setCards([...defaultStartingCards]);
        setAllCards([...defaultStartingCards]);
      }
      else {
        handleSearch(searchValue);
      }
    }
  }
  //eslint-disable-next-line
  ,[]);

  // Game logic
  const handleGame = (cardId)=>{
    if (!cardsFound.includes(cardId) || !cardsFound.length){
      setCardsFound([...cardsFound,cardId]);
      setScore(score+1);
      if (score >= highScore){
        setHighScore(score+1);
      }
    }
    else {
      setScore(0);
      setCardsFound([]);
    }
  }

  function getRandom(arr, n) {
    //Copy the array and shuffle all elements in the copied array
    let shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    //Pick n elements from the shuffled array
    return shuffled.slice(0,n);
  }

  const handleSearch = async (search)=>{
    const newCards = await (await fetch(`https://api.pokemontcg.io/v1/cards?name=${search}`)).json().then((response)=>{return response.cards});

    // Reset the game with the newly queried cards if the search is valid
    if (newCards.length !== 0){
      const allQueriedCards = [];
      newCards.forEach((newCard)=>{allQueriedCards.push({cardId:newCard.id,imageUrl:newCard.imageUrl})});
      setAllCards(allQueriedCards);
      const numCardsInGrid= (newCards.length >= maxCardsToDisplay) ? maxCardsToDisplay : newCards.length;
      const randomCards = getRandom(newCards,numCardsInGrid); //Select ten cards
      const cardsInGrid = [];
      randomCards.forEach((randomCard)=>{cardsInGrid.push({cardId:randomCard.id,imageUrl:randomCard.imageUrl})});
      setCards(cardsInGrid);
      setCardsFound([]);
      setScore(0);
      setHighScore(0);
    }
  }

  const hardModeShuffle = (cardId)=> {
    // Shuffle is valid if there is at least one to-be-displayed card that hasn't been found yet
    function isShuffledValid(shuffled){
      if (cardsFoundCopy.length === allCards.length){
        return true;
      }
      for (let i = 0; i < shuffled.length; i++){
        if (!cardsFoundCopy.includes(shuffled[i].cardId)){
          return true;
        }
      }
      return false;
    }
    // Edge case handling
    // Due to async, setCards is not updated with the newly clicked card when handleGame is called
    // which can lead to to all of the displayed cards having already been found 
    // even when there are cards that havent been found yet (i.e. it's not possible to reach the max score)
    // Tried setTimeout(shuffle,0) but it didnt work. Dont know if there is a better hack around this issue.
    let cardsFoundCopy = [...cardsFound]; 
    if (!cardsFoundCopy.includes(cardId)){
      cardsFoundCopy = [...cardsFound,cardId];
    }

    // Shuffle the cards until a valid shuffle is found
    let shuffledCards = getRandom(allCards,cards.length);
    while (!isShuffledValid(shuffledCards)){
      shuffledCards = getRandom(allCards,cards.length);
    }
    setCards(shuffledCards);
  };

  const normalModeShuffle = ()=> {
    const tempCards = getRandom(cards,cards.length);
    setCards(tempCards);
  };

  // Switch between normal and hard mode
  const changeDifficulty = ()=>{
    if (difficulty === 'normal'){
      setDifficulty('hard');
      if (searchValue.length === 0){
        handleSearch('articuno');
      }
      else {
        handleSearch(searchValue);
      }
    }
    else {
      setDifficulty('normal');
      if (searchValue.length === 0){
        const shuffledDefault = getRandom([...defaultStartingCards],defaultStartingCards.length);
        setCards(shuffledDefault);
        setAllCards(shuffledDefault);
        setCardsFound([]);
        setScore(0);
        setHighScore(0);
      }
      else {
        handleSearch(searchValue);
      }
    } 

  }

  let maxScore = difficulty === 'normal' ? cards.length : allCards.length;
  return (
    <div className="Game">
      <div className = 'Header'>
        <img id="logo" src={Logo} alt="logo"/>
        <Scoreboard score={score} highScore={highScore} maxScore={maxScore}/>
        <SearchBar mode={props.mode} changeMode={props.changeMode} 
          handleSearch={handleSearch} changeDifficulty={changeDifficulty} searchValue={searchValue} onSearchValueChange={(e)=>{setSearchValue(e.target.value)}} />
      </div>
      <CardsGrid cards={cards} handleGame={handleGame} shuffle={difficulty === 'normal' ? normalModeShuffle : hardModeShuffle}/>
    </div>
  );
}

export default Game;
