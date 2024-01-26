import './styles/Stopwatch.css';
import React, { useState, useEffect, useRef } from 'react';
import StopwatchButton from './StopWatchButton';
import { clear } from 'console';

const formatTime = (time: number): string => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
};

interface LapProps {
    laps: number[];
}

const Lap : React.FC<LapProps> = ({laps}) => {
    let id = 1;
    return (
        <div className='lap-container'>
            {laps.map(lap => {
                let current_id = id.toString();
                id++;
                return (<p key={current_id}> Lap {current_id}: {formatTime(lap)} </p>)
            })}
        </div>
    );
}

interface StopwatchProps {
  // Add props if needed
}

const Stopwatch: React.FC<StopwatchProps> = () => {
    
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { 

    if(isRunning){
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
    }else if (intervalRef.current){
        clearInterval(intervalRef.current);
    }

    return () => {
        if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
      setIsRunning(false);    
      setTime(0);
      setLaps([]);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleStartStop = () => {
    setIsRunning( !isRunning );
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <div className='stopwatch-container'>
        <div className='format-time'>
            <h1>{formatTime(time)}</h1>
        </div>
        <StopwatchButton
            isRunning={isRunning}
            toggleStartStop={handleStartStop}
            onLap={handleLap}
            onReset={handleReset}
        />
        <Lap laps={laps} />
    </div>
  );
};

export default Stopwatch;
