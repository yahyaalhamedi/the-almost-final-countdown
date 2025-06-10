import { useState, useRef } from 'react'

export default function Player() {
  const refName = useRef()
  const [playerName, setPlayerName] = useState(null)

  const handleSetName = () => {
    setPlayerName(refName.current.value)
    refName.current.value = null
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input
          type="text"
          ref={refName}
        />
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  )
}
