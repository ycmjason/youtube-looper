import React from 'react';

export default ({ isPlaying, onPause, onPlay }) => {
  if (isPlaying) {
    return (<button onClick={onPause}>Pause</button>);
  } else {
    return (<button onClick={onPlay}>Play</button>);
  }
}
