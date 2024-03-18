// import React from 'react'
import React, { useState } from "react";
import '../App.css';
import Axios from "Axios";
import { Link, useNavigate } from "react-router-dom";

const Otp = () =>{
    // const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
       const [otp, setotp] = useState('')
    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3000/auth/otp", {
            email, password}).then(response => {

            //  console.log(response)
            if(response.data.status){
                navigate('/')

            }
            // navigate('/login')
        }).catch(err => {
            console.log(err)
        })
    
    }

  return (
    <div className="sign-up-container"> 
            {/* <h2>Signup</h2> */}
            <form className="sign-up-form"onSubmit={handleSubmit}>
            <h2>OTP</h2>
                {/* <label htmlFor="username">username</label>
                <input type="text" placeholder="username"
                onChange={(e) => setUsername(e.target.value)}/> */}

                {/* <label htmlFor="Email">Email</label>
                <input type="text"  autoComplete='off' placeholder="email"
                onChange={(e) => setEmail(e.target.value)}/> */}

                <label htmlFor="otp">Otp</label>
                <input type="text" placeholder="******"
                onChange={(e) => setotp(e.target.value)}/> <br/>

                <button type="submit">Login</button>
                {/* <Link to="/forgotpassword">Forgot Password</Link> */}
                <p>Dont have an accoount? <Link to="/signup">Signup</Link></p> 
            </form>
        </div>
  )
}

export default Otp