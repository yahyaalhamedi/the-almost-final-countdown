import { useRef, useState } from 'react'
import ResultModal from './ResultModal'

function TimerChallenge({ title, targetTime }) {
  const timerId = useRef()
  const dialog = useRef()

  const [timeRemainimg, setTimeRemainimg] = useState(targetTime * 1000)

  const timeIsActive = timeRemainimg > 0 && timeRemainimg < targetTime * 1000

  if (timeRemainimg <= 0) {
    clearInterval(timerId.current)
    dialog.current.open()
  }
  // setInterval is used to repeatedly execute a function at specified intervals.
  // In this case, it updates the remaining time every 10 milliseconds.
  // setTimeout is used to execute a function once after a specified delay.
  // In this case, it would not be suitable for a countdown timer that needs to update
  // continuously until the target time is reached.
  const handleStart = () => {
    timerId.current = setInterval(() => {
      setTimeRemainimg((prevTime) => prevTime - 10)
    }, 10)
  }
  const handleStop = () => {
    dialog.current.open()
    clearInterval(timerId.current)
  }

  const handleReset = () => setTimeRemainimg(targetTime * 1000)

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemainimg={timeRemainimg}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timeIsActive ? 'active' : undefined}>
          {timeIsActive ? 'Time is running...' : 'Time is inactive'}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge
