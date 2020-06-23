import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth-context'

import './MainNavigation.css'

const MainNavigation = props => {
  const context = useContext(AuthContext)
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>gymClimber</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li> <NavLink to="/routes">Routes</NavLink></li>
          {context.token && (
            <>
              <li>
                <NavLink to="/projects">Projects</NavLink>
              </li>
              <li>
                <button onClick={context.logout}>Logout</button>
              </li>
            </>
          )}
          {!context.token && (<li><NavLink to="/auth">Authenticate</NavLink></li>)}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation