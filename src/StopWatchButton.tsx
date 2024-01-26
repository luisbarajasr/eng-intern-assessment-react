import React from 'react';
import './styles/StopWatchButton.css';

interface StopwatchButtonProps {
  isRunning: boolean;
  toggleStartStop: () => void;
  onLap: () => void;
  onReset: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  isRunning,
  toggleStartStop,
  onLap,
  onReset,
}) => {
  return (
    <div className="stopwatch-buttons">
      <button onClick={toggleStartStop} >
        { isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={onLap}>Lap</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default StopwatchButton;
