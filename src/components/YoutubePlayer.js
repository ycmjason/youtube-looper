import React, { useState, useEffect } from 'react';
import useYTPlayer, { PlayerStates } from '../hooks/useYTPlayer';

let counter = 0;

export default ({
  videoId,
  start = 0,
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
    player.seekTo(start, true);
  }, [player, start]);

  useEffect(() => {
    if (!player) return;
    player.setPlaybackRate(playbackRate);
  }, [player, playbackRate]);

  useEffect(() => {
    if (!player) return;
    const isAlreadyPlaying = player.getPlayerState() === PlayerStates.PLAYING;

    if (!isAlreadyPlaying && isPlaying) {
      player.playVideo();
    }

    if (isAlreadyPlaying && !isPlaying) {
      player.pauseVideo();
    }
  }, [player, isPlaying]);

  const tick = () => {
    if (!player) return;
    if (player.getPlayerState() === PlayerStates.PLAYING) {
      requestAnimationFrame(() => {
        onTick(player.getCurrentTime());
        tick();
      });
    }
  };

  useEffect(tick, [playerState]);

  return (
    <div id={playerId}></div>
  );
}
