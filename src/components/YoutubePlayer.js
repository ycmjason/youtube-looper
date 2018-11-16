import React, { useState, useEffect } from 'react';
import useYTPlayer, { PlayerState } from '../hooks/useYTPlayer';

let counter = 0;

export default ({
  videoId,
  onTick = () => {},
  onLoaded = () => {},
  playbackRate = 1,
  start = 0,
  end = Math.Infinity,
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

  const tick = () => {
    if (!player) return;
    if (player.getPlayerState() === PlayerState.PLAYING) {
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
