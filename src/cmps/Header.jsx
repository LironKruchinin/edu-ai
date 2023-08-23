import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getLocalStorage } from '../services/localStorage'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedInState()
  }, [])

  const setLoggedInState = () => {
    const access_token = getLocalStorage('accessToken')
    if (access_token) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }

  const signOut = () => {
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false)
  }

  return (
    <>
      {!isLoggedIn && <nav>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/register'}>Register</NavLink></li>
          <li><NavLink to={'/login'}>Login</NavLink></li>
        </ul>
      </nav>}
      {isLoggedIn && <nav>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li onClick={signOut}>Sign Out</li>
        </ul>
      </nav>}
    </>
  )
}

export default Header