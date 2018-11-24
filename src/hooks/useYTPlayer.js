import { useState, useEffect } from 'react';

const YTPromise = new Promise(res => {
  const $script = document.createElement('script');
  $script.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild($script);
  window.onYouTubeIframeAPIReady = () => res(window.YT);
});

export const PlayerStates = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

const createYTPlayer = ({
  playerId,
  videoId,
  events = {},
}) => new Promise(async (res, rej) => {
  const YT = await YTPromise;

  const player = new YT.Player(playerId, {
    videoId,
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
    },
    events: {
      ...events,
      onReady () {
        res(player);
        events.onReady && events.onReady();
      },
      onError (err) {
        rej(err);
        events.onError && events.onError();
      },
    },
  });
});

export default ({
  playerId,
  videoId,
}) => {
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(PlayerStates.UNSTARTED);

  useEffect(async () => {
    if (!playerId || !videoId) return;
    if (!player) {
      const newPlayer = await createYTPlayer({
        playerId,
        videoId,
        events: {
          onStateChange () {
            setPlayerState(newPlayer.getPlayerState());
          },
        },
      });
      return setPlayer(newPlayer);
    }

    return player.loadVideoById(videoId);
  }, [playerId, videoId]);
  
  return [player, playerState];
};
