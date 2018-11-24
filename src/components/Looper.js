import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';
import TimeBar from './TimeBar';

export default ({ videoId }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [start, setStart] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <>
      <YoutubePlayer
          onTick={setCurrentTime}
          onLoaded={({ duration }) => setTotalTime(duration)}
          {...{
            videoId,
            start,
            isPlaying,
          }} />

      <TimeBar currentTime={currentTime}
          totalTime={totalTime}
          onSeeking={pause}
          onSeek={(toTime) => {setStart(toTime); play();}} />
    </>
  );
}
