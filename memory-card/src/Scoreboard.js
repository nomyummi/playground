import React from 'react';

function Scoreboard(props){
  const {score,highScore,maxScore} = props;

  return (
    <div className="Scoreboard">
      <h3>Score: {score}</h3>
      <h3>High Score:{highScore}</h3>
      <h3>Max Score: {maxScore}</h3>
    </div>
  );
}

export default Scoreboard;