import React from 'react';

function Card(props){
  const {handleGame,shuffle} = props;

  function onClick(){
    handleGame(props.cardId);
    shuffle();
  }
  return (
    <div className="Card" onClick={onClick}>
      <img src={props.src} alt=""/>
    </div>
  )
}

export default Card;