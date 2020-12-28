import './App.css';
import React, {useState} from 'react';
import Scoreboard from './Scoreboard.js';
import CardsGrid from './CardsGrid.js';

function App() {
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [cardsFound,setCardsFound] = useState([]);
  const [cardIds,setCardIds] = useState(['pl2-114','swshp-SWSH074','basep-24','basep-25','bw11-RC7','base4-87','basep-27','basep-4','smp-SM86','xy1-42']);
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
  const charizardIds = ['swsh35-74','xyp-XY121','xy2-69','smp-SM158','sm10-20','sm12-22','sm9-14','ecard1-6','ex3-100','base6-3']; 

  return (
    <div className="App">
      <button onClick={()=>setCardIds(charizardIds)} >Change to the 2nd set</button>
      <Scoreboard score={score} highScore={highScore} maxScore={cardIds.length}/>
      <CardsGrid cardIds={cardIds} handleGame={handleGame}/>
    </div>
  );
}

export default App;
