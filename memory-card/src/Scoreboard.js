import React from 'react';

function Scoreboard(props){
  const {score,highScore,maxScore} = props;

  return (
    <div className="Scoreboard">
      <p>Score: {score}</p>
      <p>High Score:{highScore}</p>
      <p>Max Score: {maxScore}</p>
    </div>
  );
}

export default Scoreboard;