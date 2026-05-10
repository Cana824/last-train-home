const story = {
  start: {
    image: '/images/traintracks.png',
    texts: [
      "It's nearly midnight, you're trying to catch the last train. You arrive at a nearly empty train station. Your phone battery is on 3%, and you sigh, it was a long day. You walk over to a bin to throw some receipts away and notice the overfilled bin. Sitting right on top of the trash is a bundle of loose, slightly grimy wires.",
    ],
    choices: [
      {
        text: 'Pick up scrap wires?',
        next: 'pickedWires',
      },
      {
        text: 'Leave the gross wires alone',
        next: 'ignoredWires',
      },
    ],
  },

  pickedWires: {
    image: '/images/scrapwires.png',
    texts: [
      'Ew.. why did you do that?',
      "A breeze picks up — it's cold.",
    ],
    choices: [
      {
        text: 'Look for shelter from the wind in the hallway',
        next: 'hallway',
      },
      {
        text: 'Stay on the platform',
        next: 'homeAsUsual',
      },
    ],
  },

  ignoredWires: {
    image: '/images/scrapwires.png',
    texts: [
      'You ignore the wires and shove your old receipts in the bin.',
      "A breeze picks up — it's cold.",
    ],
    choices: [
      {
        text: 'Look for shelter from the wind in the hallway',
        next: 'hallway',
      },
      {
        
        text: 'Brace the wind on the platform',
        next: 'homeAsUsual',
      },
    ],
  },

  hallway: {
     image: '/images/hallway.png',
  texts: [
    'You step into the dimly lit hallway away from the wind. Beside a fallen cleaning cart sits a station keycard.',
  ],
  choices: [
    {
      text: 'Pick up the keycard?',
      next: 'pickedKeycard',
    },
    {
      text: 'Leave the keycard',
      next: 'leftKeycard',
    },
  ],

},

leftKeycard: {
   image: '/images/keycard.png',
  texts: [
    'You decide to leave the keycard where it is - someone will come back for it.',
    'Further down the corridor, you see two faint lights. To your right, you also notice a heavy metal door marked TUNNEL ACCESS.',
  ],
  choices: [
    {
      text: 'Approach the faint lights',
      next: 'faintLights',
    },
     {
      text: 'Head to the heavy metal door marked TUNNEL ACCESS',
      next: 'tunnelDoor',
    },
    {
      text: 'Return to the platform',
      next: 'homeAsUsual',
    },
  ],
},

faintLights: {
  image: '/images/faintlights.png',
  
  texts: [
    'You see a damaged robot covered in dust. Its eyes give off the faint glow as if asking for help.',
  ],
  choices: [
    {
      text: 'Help the robot',
      next: 'helpRobot',
    },
    {
      text: 'Back away slowly',
      next: 'homeAsUsual',
    },
  ],
},

pickedKeycard: {
  image: '/images/keycard.png',
  texts: [
    'You pick up the station keycard and slip it into your pocket.',
    'Further down the corridor, you see two faint lights. To your right, you also notice a heavy metal door marked TUNNEL ACCESS.',
  ],
  choices: [
    {
      text: 'Approach the faint lights',
      next: 'faintLights',
    },
    {
      text: 'Head to the door marked TUNNEL ACCESS',
      next: 'tunnelDoor',
    },
    {
      text: 'Return to the platform',
      next: 'homeAsUsual',
    },
  ],
},

robotFixed: {
  image: '/images/aliverobot.png',
  texts: [
    'You reconnect the loose wires into the robot panel.',
    'The robot whirs to life, dust shaking from its metal frame.',
    'Its glowing eyes focus on you.',
    '"THANK YOU," it says.',
    'The robot motions for you to follow it.',
  ],
  choices: [
    {
      text: 'Follow the robot',
      next: 'tunnelDoorWithRobot',
    },
    {
      text: 'Ask if the robot can follow you instead',
      next: 'robotFriend',
    },
    {
      text: 'Uhh.. No thank you...',
      next: 'thinkingOfRobot',
    },
  ],
},

robotFriend: {
  image: '/images/aliverobot.png',
  texts: [
    'You point back toward the platform.',
    'The robot pauses, then gives a small cheerful beep.',
    'Instead of leading the way, it rolls beside you like a new friend.',
  ],
  choices: [
    {
      text: 'Go to Tunnel Access door together',
      next: 'tunnelDoorWithRobot',
    },
    {
      text: 'Return to the platform with the robot',
      next: 'platformWithRobot',
    },
  ],
},
}

export default story