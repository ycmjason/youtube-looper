import React, { useMemo, useEffect } from 'react';
import useYTPlayer, { PlayerState } from '../hooks/useYTPlayer';

let counter = 0;

export default ({
  videoId,
  onTick = () => {},
  playbackRate = 1,
  start = 0,
  end = Math.Infinity,
}) => {
  const playerId = useMemo(() => `yt-player-${counter++}`);
  const player = useYTPlayer({
    playerId,
    videoId,
  });

  useEffect(() => {
    if (!player) return;
    player.seekTo(start, true);
  }, [player, start, end]);

  useEffect(() => {
    if (!player) return;
    player.setPlaybackRate(playbackRate);
  }, [player, playbackRate]);

  const tick = () => {
    if (!player) return;
    if (player.getPlayerState() === PlayerState.PLAYING) {
      requestAnimationFrame(() => {
        onTick(player.getCurrentTime());
        setTimeout(tick, 500);
      });
    }
    setTimeout(tick, 500);
  };

  useEffect(tick, [player]);

  return (
    <div id={playerId}></div>
  );
}
