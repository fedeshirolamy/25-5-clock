import './App.css';
import { useState } from "react"
import { Length } from './length'; 


function App() {

  const [displayTime, setDisplayTime] = useState(5)
  const [breakTime, setBreakTime] = useState(3)
  const [sessionTime, setSessionTime] = useState(5)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [breakAudio, setBreakAudio] = useState(new Audio("./breakTime.mp3"))

  const playBreakSound = () => {
    breakAudio.currentTime = 0
    breakAudio.play()
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    )
  }

  const changeTime = (amount, type) => {
    if (type == 'break') {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount)
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount)
      if (!timerOn) {
        setDisplayTime(sessionTime + amount)
      }
    }
  }

  const controlTime = () => {
    let second = 1000
    let date = new Date().getTime()
    let nextDate = new Date().getTime() + second
    let onBreakVariable = onBreak
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime()
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound()
              onBreakVariable = true              
              setOnBreak(true)
              return breakTime
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound()
              onBreakVariable = false              
              setOnBreak(false)
              return sessionTime
            }
            return prev - 1            
          })
          nextDate += second          
        }
      }, 30)
      localStorage.clear()
      localStorage.setItem("interval-id", interval)
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"))
    }
    setTimerOn(!timerOn)
  }

  const resetTime = () => {
    setDisplayTime(25 * 60)
    setBreakTime(5 * 60)
    setSessionTime(25 * 60)
  }
  
  return (
    <div className="App">
      <div className='center-align'>
        <h1>Pomodoro Clock</h1>
        <div className='dual-container'>
          <Length
            id="break-label"
            title={"break length"}
            changeTime={changeTime}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />   
          <Length
            id="session-label"
            title={"session length"}
            changeTime={changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>
        <h3>{ onBreak ? "Break" : "Session"}</h3>
        <h2>{formatTime(displayTime)}</h2>
        <button className='btn-large deep-purple lighten-2'
          onClick={controlTime}
        >
          {
            timerOn ? (
              <i className='material-icons'>pause_circle_filled</i>
            ) : (
                <i className='material-icons'>play_circle_filled</i>
            )
              
          }
        </button>
        <button
          className='btn-large deep-purple lighten-2'
          onClick={resetTime}
        >
          <i className='material-icons'>autorenew</i>
        </button>
      </div>
    </div>
  );
}

export default App;
