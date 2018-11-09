import React, { useState } from 'react';
import YoutubePlayer from './YoutubePlayer';

export default ({ videoId }) => {
  return (
    <div>
      <YoutubePlayer videoId={videoId} onTick={console.log} />
    </div>
  );
}
