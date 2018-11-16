import React from 'react';
import './TimeBar.css';

export default ({ currentTime, totalTime }) => {
  const left = `${(currentTime / totalTime) * 100}%`;

  return (
    <div className="timeBar">
      <div className="timeBar_pointer" style={{ left }}></div>
    </div>
  );
}
