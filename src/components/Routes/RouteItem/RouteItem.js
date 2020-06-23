import React, { useContext } from 'react'
import './RouteItem.css'
import AuthContext from '../../../context/auth-context'

const RouteItem = props => {
  const context = useContext(AuthContext)

  const handleChange = (e) => {
    // e.target.disabled = !e.target.disabled
    // console.log(e.target.checked)
    // console.log(e.target.disabled)
    props.addToProject(props._id)
    return
  }

  return (
    <li key={props._id} className="routes__list-item" style={{ color: props.color }}>
      <>
        <h1>
          {props.routeId} {props.grade} {props.location}
        </h1>
        {/* {context.token && (<div className="checkbox">
          <input type="checkbox" className="css-checkbox" id={'checkbox_' + props._id} onChange={handleChange} name="project" value="active" checked={props.project} />
          <label className="css-label" htmlFor={'checkbox_' + props._id}></label>
        </div>)} */}
        <button className="btn" onClick={handleChange}>Start!</button>
      </>
    </li>
  )
}

export default RouteItem