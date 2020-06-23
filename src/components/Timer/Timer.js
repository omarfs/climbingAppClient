import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.log(seconds) })
  const [firstTimestamp, setFirstTimestamp] = useState(new Date())
  const [eTime, setETime] = useState(0)

  const elapsedTime = (action) => {
    switch (action) {
      case 'onStar':
        setFirstTimestamp(new Date())
        return start()
      case 'onPause':
        console.log('from  elapsedTime function')
        setETime((oldTime) => {
          const newTime = (new Date().getTime() - firstTimestamp.getTime()) / 1000 + oldTime
          return newTime
        })
        setFirstTimestamp(null)
        return pause()
      case 'onResume':
        // const time = new Date()
        setFirstTimestamp(new Date())
        return resume()
      case 'onRestart':
        return restart()
    }
  }
  useEffect(
    () => {
      pause()
    },
    []
  )
  return (
    <div style={{ textAlign: 'center' }}>
      <p>Timer Demo</p>
      <div style={{ fontSize: "3.5rem" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={() => (elapsedTime('onPause'))}>Pause</button>
      <button onClick={() => (elapsedTime('onResume'))}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button>
    </div>
  );
}

export default MyTimer