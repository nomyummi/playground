import './App.css';
import React,{useState} from 'react';
import Game from './Game.js';
import Gallery from './Gallery.js';

function App() {
  const [mode,setMode] = useState('Normal Mode');
  const [gameModeDifficulty,setGameModeDifficulty] = useState('normal');

  // Search value in the search bar is passed down to sub-components 
  // so that the search value persists when different modes are rendered
  const [searchValue,setSearchValue] = useState(""); 

  const changeMode = (option)=>{
    setMode(option);
    if (mode === 'Gallery Mode' && option === 'Hard Mode'){
      setGameModeDifficulty('hard');
    }
    else if (mode === 'Gallery Mode' && option === 'Normal Mode'){
      setGameModeDifficulty('normal');
    }
  }

  let modeDisplayed = 
    mode === 'Gallery Mode' 
    ? <Gallery searchValue={searchValue} setSearchValue={setSearchValue} 
      mode={mode} changeMode={changeMode}/> 
    : <Game searchValue={searchValue} setSearchValue={setSearchValue}
      mode={mode} changeMode={changeMode} startingDifficulty={gameModeDifficulty}/>

  return (
    <div className="App">
      {modeDisplayed}
    </div>  
  );
}

export default App;
