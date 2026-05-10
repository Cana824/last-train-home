import { useState } from 'react'
import story from '../data/story'
import endings from '../data/ending'

function Game() {
const [currentScene, setCurrentScene] =
  useState<keyof typeof story>('start')
  const [showChoices, setShowChoices] = useState(false)
  const [hasWires, setHasWires] = useState(false)
  const [hasKeycard, setHasKeycard] = useState(false)
  const [ending, setEnding] = useState('')
  const [textIndex, setTextIndex] = useState(0)

  const scene = story[currentScene]

  if (!scene && !ending) {
  return <p>Scene not found: {currentScene}</p>
}

  function handleChoice(choice) {
  setTextIndex(0)

  if (choice.next === 'pickedWires') {
    setHasWires(true)
  }

  if (choice.next === 'pickedKeycard') {
    setHasKeycard(true)
  }

  if (choice.next === 'homeAsUsual') {
    setEnding(endings.homeAsUsual.text)
    setShowChoices(false)
    return
  }

  if (choice.next === 'thinkingOfRobot') {
    setEnding(endings.thinkingOfRobot.text)
    setShowChoices(false)
    return
  }

  if (choice.next === 'tunnelDoor') {
    if (hasKeycard) {
      setEnding(endings.tunnelDoor.text)
    } else {
      setEnding(endings.noKeycard.text)
    }

    setShowChoices(false)
    return
  }

  if (choice.next === 'helpRobot') {
    if (hasWires) {
      setCurrentScene('robotFixed')
      setHasWires(false)
    } else {
      setEnding(endings.missedOpportunity.text)
    }

    setShowChoices(false)
    return
  }


if (choice.next === 'tunnelDoorWithRobot') {
  if (hasKeycard) {
    setEnding(endings.tunnelEscapeWithRobot.text)
  } else {
    setEnding(endings.noKeycardWithRobot.text)
  }

  setShowChoices(false)
  return
}

if (choice.next === 'platformWithRobot') {
  setEnding(endings.platformWithRobot.text)
  setShowChoices(false)
  return
}
  setCurrentScene(choice.next)
  setShowChoices(false)
}

  

  function handleContinue() {
    if (textIndex < scene.texts.length - 1) {
      setTextIndex(textIndex + 1)
    } else {
      setShowChoices(true)
    }
  }

 function restartGame() {
  setCurrentScene('start')
  setShowChoices(false)
  setHasWires(false)
  setHasKeycard(false)
  setEnding('')
  setTextIndex(0)
}
  return (
    <div>
      <h1>The Last Train Home</h1>

      {ending ? (
        <div>
          <p>{ending}</p>

          <button onClick ={restartGame}>Restart Story</button>
        </div>
      ) : (
        <>
          <p>{scene.texts[textIndex]}</p>
          <p>
  Inventory:
  {!hasWires && !hasKeycard && ' Empty Hands'}

  {hasWires && ' Scrap Wires'}

  {hasWires && hasKeycard && ','}

  {hasKeycard && ' Station Keycard'}
</p>

          {!showChoices ? (
            <button onClick={handleContinue}>Continue</button>
          ) : (
            <div>
              {scene.choices.map((choice) => (
                <button
                  key={choice.text}
                  onClick={() => handleChoice(choice)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )

 
}

export default Game