import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';
import TimeBar from './TimeBar';

export default ({ videoId }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [start, setStart] = useState(0);

  return (
    <>
      <YoutubePlayer videoId={videoId} onTick={setCurrentTime} start={start} onLoaded={({ duration }) => setTotalTime(duration)} />
      <TimeBar currentTime={currentTime} totalTime={totalTime} onSeek={setStart} />
    </>
  );
}
