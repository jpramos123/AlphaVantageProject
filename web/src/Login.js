import React, { useState } from 'react';
import './global.css';
import './Login.css';
import api from './services/api'
import { withRouter, Redirect} from 'react-router-dom';



function Login(props){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)

    async function handleLogin(e){
        e.preventDefault()
        
        try{
            const response = await api.post('/auth/login', {
                "userName":username,
                "password":password
            })
            
            console.log(response.headers)
            setLoggedIn(true)
        } catch (error){
            if(error.response){
                console.log(error.response.data)
            }
        }
    }

    return(
        <>
            {isLoggedIn ? <Redirect to="/main" /> : null }
            <div id="login">
                <form onSubmit={handleLogin}>
                    <div className="input-block">
                    <label htmlFor="username">Username</label>
                    <input 
                        value={username}
                        name="username" 
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        required />
                    </div>
                    <div className="input-block">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        id="password" 
                        required/>  
                    </div>   

                    <button className="login" type="submit">
                    Login
                    </button>

                    <button className="register" type="submit">
                    Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default withRouter(Login);