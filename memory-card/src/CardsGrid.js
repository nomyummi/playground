import React from 'react';
import Card from './Card.js';

function CardsGrid(props){
  const {cards,handleGame,shuffle} = props;
  
  return (
    <div className="CardsGrid">
      {cards.map((card)=>(
        <Card imageSrc={card.imageUrl} key={card.cardId} cardId={card.cardId} shuffle={shuffle} handleGame={handleGame}/>
      ))}
    </div>
    
  );
}

export default CardsGrid;