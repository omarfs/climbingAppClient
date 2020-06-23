import React from 'react'
import RouteItem from './RouteItem/RouteItem'
import './RouteList.css'

const RouteList = props => {
  const routes = props.routes.map(route => {
    return (
      <RouteItem
        key={route._id}
        {...route}
        addToProject={props.addProject}

      />
    )
  })
  return <ul className="route__list">{routes}</ul>
}

export default RouteList