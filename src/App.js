import './App.css';
import { useState } from "react"


function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60)
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    )
  }
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      
      <h2 id="break-label">Breack Session Length</h2>
      <button id="break-decrement">-</button>
      <span id="break-length">5</span>
      <button id="break-increment">+</button>

      <h2 id="session-label">Session Length</h2>
      <button id="session-decrement">-</button>
      <span id="time-left">25</span>
      <button id="session-increment">+</button>

      <h2 id="timer-label">Session</h2>
      <h2 id="session-length">{formatTime(displayTime)}</h2>

      <button id="start_stop">play / pause</button>
      <button id="reset">Reset</button>
    </div>
  );
}

export default App;
