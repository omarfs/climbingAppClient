import React from 'react'

import './ProjectItem.css'

const ProjectItem = (props) => {
  return (
    < li key={props._id} className="projects__list-item" style={{ color: props.route.color }} >
      <div>
        <h1>{props.route.routeId} {props.route.grade} {props.route.location}</h1>
        <h2>
          {new Date(props.createdAt).toISOString().split('T')[0]}
        </h2>
      </div>
      <div>
      </div>
      <div className="button">
        {/* {props.isActive && (<button className="btn" onClick={props.onSelect(props._id)}>Send</button>)} */}
        <button className="btn" onClick={() => props.onSelect(props.index)}>Send</button>
      </div>
    </li >
  )
}

export default ProjectItem