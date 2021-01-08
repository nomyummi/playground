import React from 'react';

function Card(props){
  const {handleGame,shuffle,cardId,imageSrc} = props;

  function onClick(){
    handleGame(cardId);
    shuffle(cardId);
  }
  return (
    <div className="Card" onClick={onClick}>
      <img src={imageSrc} alt={cardId}/>
    </div>
  )
}

export default Card;