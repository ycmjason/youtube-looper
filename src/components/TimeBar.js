import React, { useRef } from 'react';
import './TimeBar.css';

export default ({
  currentTime,
  totalTime,
  onSeek = () => {},
  onSeeking = () => {},
}) => {
  const timeBarRef = useRef(null);

  const left = `${(currentTime / totalTime) * 100}%`;

  const seek = ({ clientX }) => {
    const { x, width } = timeBarRef.current.getBoundingClientRect();
    const relativeX = clientX - x;
    const position = relativeX / width;
    const seekToTime = totalTime * position;
    onSeek(seekToTime);
  };

  return (
    <div className="timeBar"
        ref={timeBarRef}
        onMouseDown={onSeeking}
        onMouseUp={seek}>
      <div className="timeBar_pointer" style={{ left }}></div>
    </div>
  );
}
