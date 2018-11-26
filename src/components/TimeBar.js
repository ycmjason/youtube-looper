import React, { useState, useCallback, useRef } from 'react';
import { throttle } from '../utils';
import './TimeBar.css';

export default ({
  currentTime,
  totalTime,
  onStartSeek = () => {},
  onSeek = () => {},
}) => {
  const [seekingTime, setSeekingTime] = useState(undefined);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const timeBarRef = useRef(null);

  const left = `${((seekingTime || currentTime) / totalTime) * 100}%`;

  const getSeekToTime = (clientX) => {
    const { x, width } = timeBarRef.current.getBoundingClientRect();
    const relativeX = clientX - x;
    const position = relativeX / width;
    const seekToTime = totalTime * position;
    return seekToTime;
  };

  const onMouseMove = useCallback(throttle(({ clientX }) => {
    if (!isMouseDown) return;
    setSeekingTime(getSeekToTime(clientX));
  }, 100), [isMouseDown]);

  return (
    <div className="timeBar"
        ref={timeBarRef}
        onMouseDown={({ clientX }) => {
          onStartSeek();
          setIsMouseDown(true);
          setSeekingTime(getSeekToTime(clientX));
        }}
        onMouseMove={onMouseMove}
        onMouseUp={({ clientX }) => {
          setIsMouseDown(false);
          onSeek(getSeekToTime(clientX))
          setTimeout(() => {
            setSeekingTime(undefined);
          }, 100);
        }}>
      <div className="timeBar_pointer" style={{ left }}></div>
    </div>
  );
}
