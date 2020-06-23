import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/auth-context'
import Backdrop from '../components/Backdrop/Backdrop'
import Spinner from '../components/Spinner/Spinner'
import ProjectsList from '../components/Projects/ProjectsList'
import SendProjectForm from '../components/Projects/SendProject/SendProject'
import './Projects.css'

const ProjectsPage = () => {

  const [sending, setSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [projectIndex, setProjectIndex] = useState(null)
  const [projects, setProjects] = useState([])
  const context = useContext(AuthContext)

  const cancelHandler = () => {
    setSending(false)
    setCurrentProject(null)
  }

  const confirmHandler = () => {

  }

  const updateProject = () => {

  }

  const setCurrentItem = (itemId) => {
    context.currentProject = projects[itemId]
    context.projectsLength = projects.length
    context.projectIndex = itemId
    setCurrentProject(projects[itemId])
    setProjectIndex(itemId)
    return
  }

  const fetchProjects = () => {
    setIsLoading(true)
    const requestBody = {
      query: `      
        query{
          projects{
            _id
            route{
              _id
              routeId
              grade
              location
              color
            }
            active
            createdAt
            sended
            sendedAt
            attempts
            projectingTime
          }
        }
      `
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token
      }
    })
      .then(res => {
        // console.log(res.status)
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then(resData => {
        const aordenar = [...resData.data.projects]
        aordenar.sort((a, b) => (a.route.location > b.route.location) ? 1 : -1)
        console.log(aordenar)
        console.log(resData.data.projects)
        setProjects(resData.data.projects)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchProjects()

  }, [])

  return (
    <>
      {currentProject && <Backdrop />}
      {currentProject && (
        <>
          <SendProjectForm updateProject={setCurrentItem} />
        </>
      )}
      {isLoading ? (<Backdrop /> && <Spinner />) :
        <ProjectsList
          projects={projects}
          onSelectRoute={setCurrentItem}
        />
      }
    </>
  )
}

export default ProjectsPage