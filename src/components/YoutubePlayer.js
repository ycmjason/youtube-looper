import React, { useState, useEffect } from 'react';
import useYTPlayer, { PlayerStates } from '../hooks/useYTPlayer';

let counter = 0;

const onAnimationFrame = (fn) => {
  let stopped = false;
  const wfn = () => {
    if (stopped) return;
    requestAnimationFrame(() => {
      fn();
      wfn();
    });
  };

  wfn();
  return () => stopped = true;
};

export default ({
  videoId,
  startTime = 0,
  end = Math.Infinity,
  playbackRate = 1,
  isPlaying = true,
  onTick = () => {},
  onLoaded = () => {},
}) => {
  const [playerId] = useState(`yt-player-${counter++}`);
  const [player, playerState] = useYTPlayer({
    playerId,
    videoId,
  });

  useEffect(() => {
    if (!player) return;
    onLoaded({
      duration: player.getDuration(), 
    });
  }, [player]);

  useEffect(() => {
    if (!player) return;
    player.seekTo(startTime, true);
  }, [player, startTime]);

  useEffect(() => {
    if (!player) return;
    player.setPlaybackRate(playbackRate);
  }, [player, playbackRate]);

  useEffect(() => {
    if (!player) return;
    if (isPlaying) {
      return onAnimationFrame(() => onTick(player.getCurrentTime()));
    }
  }, [player, isPlaying]);

  useEffect(() => {
    if (!player) return;
    const isAlreadyPlaying = playerState === PlayerStates.PLAYING;

    if (!isAlreadyPlaying && isPlaying) {
      player.playVideo();
    }

    if (isAlreadyPlaying && !isPlaying) {
      player.pauseVideo();
    }
  }, [player, playerState, isPlaying]);

  return (
    <div id={playerId}></div>
  );
}
