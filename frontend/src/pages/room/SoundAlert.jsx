import React, {useState, useEffect} from "react";

const SoundAlert = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = () => {
    setIsPlaying(true)
    const sound = new Audio("/assets/audios/karinaCall.mp3")
    sound.play()

    setTimeout(() => {
      setIsPlaying(false)
      sound.pause()
      sound.currentTime = 0
    }, 3000)
  }

  return (
    <div>
       <button onClick={playSound}>소리 재생</button>
    </div>
  )
}

export default SoundAlert;