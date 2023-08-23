import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiPostRequest } from '../services/api';
import { setLocalStorage } from '../services/localStorage';
import { useNavigate } from 'react-router';

function Login() {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleInput = ({ target }) => {
        const { value, name } = target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const handleLogin = async (ev) => {
        ev.preventDefault()
        setCredentials({ email: '', password: '' })
        const { access_token } = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_KEY}/auth/login`, credentials)
        if (access_token) {
            setLocalStorage('accessToken', JSON.stringify(access_token))
            navigate('/')
        }

    }

    return (
        <form onSubmit={handleLogin}>
            <div className="container">
                <label htmlFor="email">Email </label>
                <input type="text"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleInput} />
            </div>

            <div className='password-container container'>
                <label htmlFor="password">Password </label>
                <input type={isVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleInput} />
                {!isVisible && <FaEye onMouseDown={() => { setIsVisible(true) }} onMouseUp={() => { setIsVisible(false) }} />}
                {isVisible && <FaEyeSlash onMouseUp={() => { setIsVisible(false) }} />}
            </div>

            <button>Login</button>
        </form>
    )
}

export default Login