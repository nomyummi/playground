import './App.css';
import React, {useState} from 'react';
import Scoreboard from './Scoreboard.js';
import CardsGrid from './CardsGrid.js';

function App() {
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [cardsFound,setCardsFound] = useState([]);

  const handleGame = (cardID)=>{
    if (!cardsFound.includes(cardID) || !cardsFound.length){
      setCardsFound([...cardsFound,cardID]);
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

  return (
    <div className="App">
      <Scoreboard score={score} highScore={highScore} maxScore="9"/>
      <CardsGrid score={score} handleGame={handleGame}/>
    </div>
  );
}

export default App;
