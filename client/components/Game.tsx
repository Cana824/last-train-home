import { useState } from 'react'
import story from '../data/story'
import endings from '../data/ending'
import './Game.css'


function Game() {
const [currentScene, setCurrentScene] =
  useState<keyof typeof story>('start')
  const [showChoices, setShowChoices] = useState(false)
  const [hasWires, setHasWires] = useState(false)
  const [hasKeycard, setHasKeycard] = useState(false)
  const [ending, setEnding] = useState<keyof typeof endings | null>(null)
  const [textIndex, setTextIndex] = useState(0)
  const [foundEndings, setFoundEndings] = useState<string[]>([])
  

  const scene = story[currentScene]

  if (!scene && !ending) {
  return <p>Scene not found: {currentScene}</p>
}

function unlockEnding(endingKey: keyof typeof endings) {
  setEnding(endingKey)

  setFoundEndings((prev) => {
    if (prev.includes(endingKey)) {
      return prev
    }

    return [...prev, endingKey]
  })

  setShowChoices(false)
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
    unlockEnding('homeAsUsual')
    setShowChoices(false)
    return
  }

  if (choice.next === 'thinkingOfRobot') {
    unlockEnding('thinkingOfRobot')
    setShowChoices(false)
    return
  }

  if (choice.next === 'tunnelDoor') {
    if (hasKeycard) {
      unlockEnding('tunnelDoor')
    } else {
      unlockEnding('noKeycard')
    }

    setShowChoices(false)
    return
  }

  if (choice.next === 'helpRobot') {
    if (hasWires) {
      setCurrentScene('robotFixed')
      setHasWires(false)
    } else {
      unlockEnding('missedOpportunity')
    }

    setShowChoices(false)
    return
  }


if (choice.next === 'tunnelDoorWithRobot') {
  if (hasKeycard) {
    unlockEnding('tunnelEscapeWithRobot')
  } else {
    unlockEnding('noKeycardWithRobot')
  }

  setShowChoices(false)
  return
}

if (choice.next === 'platformWithRobot') {
  unlockEnding('platformWithRobot')
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
  setEnding(null)
  setTextIndex(0)


}

  return (

  <div
    className="game-container"
    style={{
      backgroundImage: `url(${ending ? '/images/traintracks.png' : scene.image})`,
    }}
  >
    <div className="title-box">
      <h1>The Last Train Home</h1>
    </div>
    <div className="ending-counter">
  Endings Found: {foundEndings.length} / {Object.keys(endings).length}
</div>

    <div className="story-box">
      <div className="scene-text">
        {ending ? (
          <>
            <h2>{endings[ending].title}</h2>
            <p>{endings[ending].text}</p>
          </>
        ) : (
          <p>{scene.texts[textIndex]}</p>
        )}
      </div>

      <div className="train-lights">
        <div className="light"></div>
        <div className="light"></div>
      </div>


      {ending ? (
  <>
    <button
      onClick={restartGame}
      className="choice-button"
    >
      Restart Story
    </button>

    <button
      onClick={() => setFoundEndings([])}
      className="reset-button"
    >
      Reset Ending Count
    </button>
  </>
) : !showChoices ? (
        <button onClick={handleContinue} className="choice-button">
          Continue
        </button>
        
      ) : (
        <div className="choices-container">
          {scene.choices.map((choice) => (
            <button
              key={choice.text}
              onClick={() => handleChoice(choice)}
              className="choice-button"
            >
              {choice.text}
            </button>
            
          ))}
        </div>
        
      )}

      {!ending && (
        <div className="inventory-container">
          {!hasWires && !hasKeycard && (
            <div className="inventory-pill">Empty Hands</div>
          )}

          {hasWires && (
            <div className="inventory-pill">
              <img
                src="/images/scrapwires.png"
                alt="Scrap wires"
                className="inventory-image"
              />
              <p>Scrap Wires</p>
            </div>
          )}

          {hasKeycard && (
            <div className="inventory-pill">
              <img
                src="/images/keycardinventory.png"
                alt="Station Keycard"
                className="inventory-image"
              />
              <p>Station Keycard</p>
            </div>
          )}
        </div>
      )}
    </div>

   
  </div>
)}

export default Game