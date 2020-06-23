import React, { useEffect, useRef, useContext, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import AuthContext from '../../context/auth-context'

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false })
  const context = useContext(AuthContext)
  const firstRun = useRef(true)
  const [counter, setCounter] = useState(0)

  const increaseCounter = () => {
    setCounter((i) => i + 1)
  }

  const handleAction = (action) => {
    const project = context.currentProject
    switch (action) {
      case 'START':
        context.projectDispatch({ type: 'START', project: project })
        props.isSending(true)
        return start()
      case 'PAUSE':
        context.projectDispatch({ type: 'PAUSE', project: project, payload: { projectingTime: counter } })
        setCounter(0)
        props.isSending(false)
        return pause()
      case 'RESET':
        setCounter(0)
        props.isSending(false)
        firstRun.current = true
        return reset()
    }
  }

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      reset()
      return
    }
    increaseCounter()
  }, [seconds]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        {days > 0 ? <span>{days}:</span> : ''}
        {hours > 0 ? <span>{hours}:</span> : ''}
        {minutes > 0 ? <span>{minutes}:</span> : ''}
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Sending' : ''}</p>
      <button onClick={() => handleAction('START')} disabled={isRunning}>Start</button>
      <button onClick={() => handleAction('PAUSE')} disabled={!isRunning}>Pause</button>
      <button onClick={() => handleAction('RESET')} disabled={!isRunning}>Stop</button>
    </div >
  );
}

export default MyStopwatch