import React, { useState, useRef, useContext } from 'react'
import AuthContext from '../context/auth-context'
import './Auth.css'

const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(true)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const context = useContext(AuthContext)

  const switchModehandler = () => {
    setIsLogin(!isLogin)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (email.trim().length === 0 || password.trim().length === 0) return

    const requestBody = (!isLogin) ? {
      query: `
          mutation {
            createUser(data: {email: "${email}", password: "${password}"}){
              userId
              token
              tokenExpiration
            }
          }
        `
    } : {
        query: `
        query{
          login(data: {email: "${email}", password: "${password}"})
          {
            userId
            token
            tokenExpiration
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
        console.log(res)
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then(resData => {
        const login = (!isLogin ? resData.data.createUser : resData.data.login)
        if (login.token) {
          context.login(
            login.token,
            login.userId,
            login.tokenExpiration
          )
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModehandler}>Switch to {isLogin ? 'Singup' : 'Login'}</button>
      </div>
    </form>
  )
}

export default AuthPage