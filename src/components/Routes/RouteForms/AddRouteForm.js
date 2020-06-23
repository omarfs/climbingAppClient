import React, { useState } from 'react'
import './AddRouteForm.css'

const AddRouteForm = props => {
  const initialFormState = {
    routeId: '',
    grade: null,
    location: null,
    color: null,
    project: false,

  }
  const [route, setRoute] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setRoute({ ...route, [name]: value })
  }

  return (
    <div className="wrapper">
      <form className='add-route-form'
        onSubmit={event => {
          event.preventDefault()
          if (!route.routeId || !route.grade || !route.location || !route.color) return
          console.log(route)
          props.addRoute(route)
          setRoute(initialFormState)
        }}
      >
        <label>Route ID</label>
        <input type="text" name="routeId" value={route.routeId} onChange={handleInputChange} />
        <label>Grade</label>
        <select name="grade" onChange={handleInputChange}>
          {props.grades.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <label>Color</label>
        <select name="color" onChange={handleInputChange}>
          {props.colors.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <label>Location</label>
        <select name="location" onChange={handleInputChange}>
          {props.locations.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <button>Add new route</button>
      </form>
    </div >
  )
}

export default AddRouteForm
