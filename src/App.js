import React, { useState } from 'react';
import YoutubeUrlInput from './components/YoutubeUrlInput';
import Looper from './components/Looper';
import './App.css';

export default () => {
  const [videoId, setVideoId] = useState('izkqPdVAdL4'); // TODO: replace id with ''

  return (
    <div className="App">
      <h1>Youtube Looper</h1>
      <YoutubeUrlInput onSubmit={setVideoId}/>
      <div className="App_LooperContainer">
        <Looper videoId={videoId} />
      </div>
    </div>
  );
}
