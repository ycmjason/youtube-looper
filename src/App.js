import React, { useState } from 'react';
import YoutubeUrlInput from './components/YoutubeUrlInput';
import useYTPlayer from './hooks/useYTPlayer';
import './App.css';

const App = () => {
  const [videoId, setVideoId] = useState('');

  useYTPlayer({
    playerId: 'yt-player',
    videoId,
  });

  return (
    <div className="App">
      <h1>Youtube Looper</h1>
      <YoutubeUrlInput onSubmit={ setVideoId }/>
      <div id="yt-player"></div>
    </div>
  );
}

export default App;
