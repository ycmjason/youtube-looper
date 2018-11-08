import { useState, useEffect } from 'react';

const YTPromise = new Promise(res => {
  const $script = document.createElement('script');
  $script.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild($script);
  window.onYouTubeIframeAPIReady = () => res(window.YT);
});

const createYTPlayer = async ({
  playerId,
  videoId,
}) => {
  const YT = await YTPromise;

  const player = new YT.Player(playerId, {
    videoId,
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  });

  return player;
};

export default ({
  playerId,
  videoId,
}) => {
  const [player, setPlayer] = useState(null);

  useEffect(async () => {
    if (!playerId || !videoId) return;
    if (!player) {
      const newPlayer = await createYTPlayer({ playerId, videoId });
      return setPlayer(newPlayer);
    }

    player.loadVideoById(videoId);
  }, [playerId, videoId]);
  
  return player;
};
