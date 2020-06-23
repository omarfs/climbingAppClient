import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import RoutesPage from './pages/Routes'
import ProjectsPage from './pages/Projects'
import AuthPage from './pages/Auth'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'
import './App.css';


const reducer = (state, action) => {
  console.log(state)
  console.log(action.project)
  switch (action.type) {
    case 'START':
      return {
        // ...state,
        ...action.project,
        attempts: action.project.attempts + 1
      }
    case 'PAUSE':
      console.log(action.payload.projectingTime)
      return {
        ...action.project,
        projectingTime: action.project.projectingTime + action.payload.projectingTime
      }
    case 'SUCCESS':
      return {
        ...action.project,
        sended: true,
        sendedAt: action.project.sendedAt.concat(action.payload.sendedAt)
      }
    default:
      return state
  }
}

function App() {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState("")
  const [currentProject, projectDispatch] = useReducer(reducer)

  const login = (token, user) => {
    setToken(token)
    setUserId(user)
  }

  const logout = () => {
    setToken(null)
    setUserId("")
  }

  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider value={{
          token: token,
          userId: userId,
          currentProject,
          projectIndex: 0,
          projectsLength: 0,
          login: login,
          logout: logout,
          projectDispatch
        }}>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {token && <Redirect from="/" to="/routes" exact />}
              {token && <Redirect from="/auth" to="/routes" exact />}
              {token && <Route path="/projects" component={ProjectsPage} />}
              {!token && <Route path="/auth" component={AuthPage} />}
              <Route path="/routes" component={RoutesPage} />
              <Redirect from="/" to="/auth" exact />
              {!token && <Redirect from="/projects" to="/routes" />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  )
}

export default App;
