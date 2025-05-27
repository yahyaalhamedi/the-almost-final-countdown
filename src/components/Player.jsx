import { useState } from 'react'

export default function Player() {
  const [playerName, setPlayerName] = useState('')
  const [isNamed, setIsNamed] = useState(false)

  const handleNameChange = (event) => {
    setIsNamed(false)
    setPlayerName(event.target.value)
  }

  const handleSetName = () => {
    setIsNamed(true)
  }

  return (
    <section id="player">
      <h2>Welcome {isNamed ? playerName : 'unknown entity'}</h2>
      <p>
        <input
          type="text"
          onChange={handleNameChange}
          value={playerName}
        />
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  )
}
