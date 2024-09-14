import React, { useState, useEffect } from 'react';
import './App.css';

// Stopwatch Component
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1); // Update every millisecond
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const startStopwatch = () => {
    setStartTime(Date.now() - time);
    setIsActive(true);
  };

  const stopStopwatch = () => {
    setIsActive(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className="stopwatch">
      <h1>
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        {("0" + (time % 1000)).slice(-3)} {/* Minutes:Seconds:Milliseconds */}
      </h1>
      <div className="buttons">
        {isActive ? (
          <button onClick={stopStopwatch}>Pause</button>
        ) : (
          <button onClick={startStopwatch}>Start</button>
        )}
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

// Timer Component
const Timer = () => {
  const [time, setTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5); // Default to 5 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10); // Decrement by 10 milliseconds
      }, 10);
    } else if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setTime(inputMinutes * 60 * 1000); // Convert minutes to milliseconds
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="timer">
      <h1>
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        {("0" + Math.floor((time % 1000) / 10)).slice(-2)} {/* Minutes:Seconds:Hundredths */}
      </h1>
      <input
        type="number"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(e.target.value)}
        placeholder="Set minutes"
      />
      <div className="buttons">
        {isActive ? (
          <button onClick={stopTimer}>Pause</button>
        ) : (
          <button onClick={startTimer}>Start</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [showComponent, setShowComponent] = useState(null); // To manage which component to show

  const handleButtonClick = (component) => {
    setShowComponent(component); // Set which component to show
  };

  return (
    <div className="App">
      <header>
        <h2>Stopwatch & Timer by Sandesh</h2>
      </header>
      <div className="container">
        {/* Initial View */}
        {!showComponent && (
          <div className="button-container">
            <button onClick={() => handleButtonClick('stopwatch')}>Stopwatch</button>
            <button onClick={() => handleButtonClick('timer')}>Timer</button>
          </div>
        )}

        {/* Stopwatch Component */}
        {showComponent === 'stopwatch' && (
          <>
            <Stopwatch />
            <button className="back-button" onClick={() => setShowComponent(null)}>Back</button>
          </>
        )}

        {/* Timer Component */}
        {showComponent === 'timer' && (
          <>
            <Timer />
            <button className="back-button" onClick={() => setShowComponent(null)}>Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
