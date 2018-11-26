import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';
import TimeBar from './TimeBar';
import PlaybackButton from './PlaybackButton';

export default ({ videoId }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <>
      <YoutubePlayer
          onTick={setCurrentTime}
          onLoaded={({ duration }) => setTotalTime(duration)}
          {...{
            videoId,
            startTime,
            isPlaying,
          }} />

      <PlaybackButton isPlaying={isPlaying} onPlay={play} onPause={pause} />

      <TimeBar currentTime={currentTime}
          totalTime={totalTime}
          onStartSeek={pause}
          onSeek={seekTime => {
            setStartTime(seekTime);
            play();
          }} />
    </>
  );
}
