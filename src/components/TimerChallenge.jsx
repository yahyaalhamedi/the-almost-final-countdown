import { useRef, useState } from 'react'
import ResultModal from './ResultModal'
function TimerChallenge({ title, targetTime }) {
  const timerId = useRef()
  const dialog = useRef()

  const [timerStarted, setTimerStarted] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)

  const handleStart = () => {
    timerId.current = setTimeout(() => {
      setTimerExpired(true)
      dialog.current.showModal()
    }, targetTime * 1000)
    setTimerStarted(true)
  }
  const handleStop = () => {
    clearTimeout(timerId.current)
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result="lost"
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Time is inactive'}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge
