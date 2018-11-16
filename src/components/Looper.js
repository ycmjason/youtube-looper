import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';
import TimeBar from './TimeBar';

export default ({ videoId }) => {
  const [currentTime, setCurrentTime] = useState();
  const [totalTime, setTotalTime] = useState();

  return (
    <>
      <YoutubePlayer videoId={videoId} onTick={setCurrentTime} onLoaded={({ duration }) => setTotalTime(duration)} />
      <TimeBar currentTime={currentTime} totalTime={totalTime} />
    </>
  );
}
