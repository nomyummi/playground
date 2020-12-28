import React, {useState,useEffect} from 'react';
import Card from './Card.js';

function CardsGrid(props){
  const {cardIds,handleGame} = props;
  const [cards,setCards] = useState([]);

  const shuffle = ()=> {
    const tempCards = [...cards];
    for (let i = tempCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempCards[i], tempCards[j]] = [tempCards[j], tempCards[i]];
    }
    setCards(tempCards);
  };

  async function loadImageFromId(id) {
    const pokemonCard = await (await fetch(`https://api.pokemontcg.io/v1/cards?id=${id}`)).json().then(queriedCards=>{return queriedCards.cards[0]});
    setCards(cards=>[...cards,
      {imageUrl: pokemonCard.imageUrl,
        cardId: id}
      ]);
  }

  useEffect(()=>{
    try {
      setCards([]);
      cardIds.forEach((cardId)=>{
        loadImageFromId(cardId);
      });
    }
    catch (error) {
      console.log('Failed to load image: ' + error);
    }
  // eslint-disable-next-line
  },[cardIds]);
  
  return (
    <div className="CardsGrid">
      {cards.map((card)=>(
        <Card src={card.imageUrl} key={card.cardId} cardId={card.cardId} shuffle={shuffle} handleGame={handleGame}/>
      ))}
    </div>
    
  );
}

export default CardsGrid;