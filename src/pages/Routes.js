import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/auth-context'
import Backdrop from '../components/Backdrop/Backdrop'
import Spinner from '../components/Spinner/Spinner'
import RouteList from '../components/Routes/RouteList'
import AddRouteForm from '../components/Routes/RouteForms/AddRouteForm'
import './Routes.css'

const RoutesPage = () => {
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [routes, setRoutes] = useState([])

  const [locations, setLocations] = useState([])
  const [colors, setColors] = useState([])
  const [grades, setGrades] = useState([])
  const context = useContext(AuthContext)

  const fetchRoutes = () => {
    setLoading(true)
    const userId = context.userId ? `"${context.userId}"` : null
    const requestBody = {
      query: `
      query {
        routes(userid:${userId}){
          routes{
            _id
            routeId
            grade
            color
            location
            project
          }
        }
        locations: __type(name: "locationEnumType"){
          enumValues {
          name
          }
        }  
        grades: __type(name: "gradeEnumType"){
          enumValues {
          name
          }
        }  
        colors: __type(name: "colorEnumType"){
          enumValues {
          name
          }
        }  
      }
    `
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed')
        }
        return res.json()
      })
      .then(resData => {
        console.log(resData)
        const locationsEnum = resData.data.locations.enumValues.map(a => a.name)
        const colorsEnum = resData.data.colors.enumValues.map(a => a.name)
        const gradesEnum = resData.data.grades.enumValues.map(a => a.name)
        setRoutes(resData.data.routes.routes)
        setLocations(locationsEnum)
        setColors(colorsEnum)
        setGrades(gradesEnum)
        setLoading(false)
      })
      .catch(error => console.log(error))

  }

  const addProjectHandler = (routeId) => {
    const user = context.userId
    const route = routeId
    const requestBody = {
      query: `
        mutation {
          addProject(data: {user: "${user}", route: "${route}"}) {
            project{
              _id
              }
            }
        }
      `
    }
    const token = context.token

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed')
        }
        return res.json()
      })
      .then(resData => {
        const newRoutes = routes.map(p =>
          p._id === routeId ? { ...p, project: true } : p)
        setRoutes(newRoutes)

      })
      .catch(err => {
        console.log(err)
      })
  }

  const cancelHandler = () => {
  }

  const addRouteHandler = (route) => {
    setCreating(false)
    const user = context.userId
    const token = context.token
    console.log(route)
    const requestBody = {
      query: `
        mutation {
          addRoute(data: {routeId: "${route.routeId}", user: "${user}" , grade: ${route.grade}, color: ${route.color}, location: ${route.location} }){
            route{
              _id
              routeId
              grade
              location
              color
            }
          }
        }
        `
    }
    //
    console.log(requestBody)
    //
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed')
        }
        return res.json()
      })
      .then(resData => {
        const updatedRoutes = [...routes]
        console.log(resData.data.addRoute.route)
        updatedRoutes.push({
          _id: resData.data.addRoute.route._id,
          routeId: resData.data.addRoute.route.routeId,
          grade: resData.data.addRoute.route.grade,
          color: resData.data.addRoute.route.color,
          location: resData.data.addRoute.route.location,
          user: {
            _id: context.userId
          }
        })
        setRoutes(updatedRoutes)
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    fetchRoutes()
  }, [context.userId])

  return (
    <>
      {creating && <Backdrop />}
      {creating && <AddRouteForm addRoute={addRouteHandler} locations={locations} grades={grades} colors={colors} />}
      <div className="content-title">
        {context.token && (
          <div className="routes-control">
            <button className="btn" onClick={() => (setCreating(true))}>Add Route!
            </button>
          </div>
        )}

      </div>
      {loading ? (<Backdrop /> && <Spinner />) :
        <RouteList
          routes={routes}
          addProject={addProjectHandler}
        />
      }
    </>
  )
}

export default RoutesPage

