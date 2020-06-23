import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/auth-context'
import Stopwatch from '../../Timer/Stopwatch'
import './SendProject.css'

function sec2time(timeInSeconds) {
  var pad = function (num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)
  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
}
const Prev = (props) => {
  return <button onClick={props.toggle} disabled={props.active}>Previous</button>
}

const Next = (props) => {
  return <button onClick={props.toggle} disabled={props.active}>Next</button>
}

const SendProject = props => {

  const context = useContext(AuthContext)
  const [project, setProject] = useState(context.currentProject)
  const [sending, setSending] = useState(false)
  const [disabledNext, setDisabledNext] = useState(false)
  const [disabledPrev, setDisabledPrev] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    const newSendDate = new Date()
    context.projectDispatch({ type: 'SUCCESS', project: project, payload: { sendedAt: [newSendDate] } })
  }

  const handleIsSending = (sending) => {
    setSending(sending)
    setDisabledNext(sending)
    setDisabledPrev(sending)
  }

  const togglePrev = () => {
    let index = context.projectIndex - 1
    let disabledPrev = (index === 0)
    setDisabledPrev(disabledPrev)
    setDisabledNext(false)
    props.updateProject(index)
  }

  const toggleNext = () => {
    let index = context.projectIndex + 1
    let disabledNext = index === (context.projectsLength - 1)
    setDisabledPrev(false)
    setDisabledNext(disabledNext)
    props.updateProject(index)
  }

  useEffect(() => {
    setProject(context.currentProject)
  }, [context.currentProject])

  return (
    <div className="send-project-container">
      <div className="send-project-header" style={{ color: project.route.color }}>
        <h1>{project.route.routeId} {project.route.grade} {project.route.location}</h1>
      </div>
      <div className="send-project-details">
        <div>
          <label>Sends</label>
          <div>{project.sendedAt.map(date => <li key={date}>{date.toDateString()}</li>)}</div>
        </div>
        <div>
          <label>Attempts</label>
          <span>{project.attempts}</span>
        </div>
        <div>
          <label>Time</label>
          <span>{sec2time(project.projectingTime)}</span>

        </div>
      </div>
      <div className="send-project-timer">
        <Stopwatch key={project._id} isSending={handleIsSending} />
      </div>
      <div className="sended">
        <input type="checkbox" className="send-success" name="sended" onChange={handleInputChange} checked={project.sended} />
      </div>
      <div className="container">
      </div>
      <div className="send-project-actions" style={{ background: project.route.color }}>
        <div className="container">
          <Prev toggle={togglePrev} active={disabledPrev} />
          <Next toggle={toggleNext} active={disabledNext} />
        </div>
        <div className="container">
          <button>Save</button>
          <button onClick={() => props.setEditing(false)}>Cancel</button>

        </div>

      </div>
    </div>
  )
}

export default SendProject