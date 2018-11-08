import React from 'react';
import { parseIdFromUrl } from '../utils/youtube';
import './YoutubeUrlInput.css';

const App = ({ onSubmit }) => {
  const onKeyPress = ({ key, target }) => {
    if (key !== 'Enter') return;
    const id = parseIdFromUrl(target.value);
    if (!id) return; // TODO: show some error to user
    onSubmit(id);
  };

  return (
    <input 
      className="YoutubeUrlInput"
      placeholder="https://www.youtube.com/watch?v=kHLHSlExFis"
      onKeyPress={onKeyPress}/>
  );
}

export default App;
