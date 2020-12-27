import React, {useState,useEffect} from 'react';
import Card from './Card.js';

function CardsGrid(props){
  const {handleGame} = props;
  const [cards,setCards] = useState([1,2,3,4,5,6,7,8,9]);
  const [image,setImage] = useState("");

  const shuffle = ()=> {
    const tempCards = [...cards];
    for (let i = tempCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempCards[i], tempCards[j]] = [tempCards[j], tempCards[i]];
    }
    setCards(tempCards);
  };

  useEffect(()=>{
    async function loadImage() {
      const pokemonCard = await (await fetch("https://api.pokemontcg.io/v1/cards?id=pl2-114")).json().then(queriedCards=>{return queriedCards.cards[0]});
      setImage(pokemonCard.imageUrl);
    }
    loadImage();
  },[]);
  
  return (
    <div className="CardsGrid">
      {cards.map((card)=>(
        <Card src={image} key={card} value={card} shuffle={shuffle} handleGame={handleGame}/>
      ))}
    </div>
    
  );
}

export default CardsGrid;