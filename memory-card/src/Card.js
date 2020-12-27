import React from 'react';

function Card(props){
  const {handleGame,shuffle} = props;

  function onClick(){
    handleGame(props.value);
    shuffle();
  }
  return (
    <div className="Card" onClick={onClick}>
      {/* <img src={props.src} alt=""/> */}
      {props.value}
    </div>
  )
}

export default Card;