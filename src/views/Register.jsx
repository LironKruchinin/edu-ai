import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiPostRequest } from '../services/api';

function Register() {
    const [isVisible, setIsVisible] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: ''
    })

    const handleInput = ({ target }) => {
        const { value, name } = target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const handleRegister = (ev) => {
        ev.preventDefault()
        setCredentials({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: ''
        })
        apiPostRequest(`${process.env.REACT_APP_LOCAL_API_KEY}/auth/register`, credentials)
    }

    return (
        <form onSubmit={handleRegister}>
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
            <div className="container">
                <label htmlFor="first_name">First Name </label>
                <input type="text"
                    name="first_name"
                    id="first_name"
                    value={credentials.first_name}
                    onChange={handleInput} />
            </div>
            <div className="container">
                <label htmlFor="last_name">Last Name </label>
                <input type="text"
                    name="last_name"
                    id="last_name"
                    value={credentials.last_name}
                    onChange={handleInput} />
            </div>
            <div className="container">
                <label htmlFor="phone_number">Phone Number </label>
                <input type="text"
                    name="phone_number"
                    id="phone_number"
                    value={credentials.phone_number}
                    onChange={handleInput} />
            </div>
            <button>Register</button>
        </form>
    )
}

export default Register