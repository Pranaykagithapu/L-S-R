import React, { useState } from "react";
import '../App.css';
import Axios from "Axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () =>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3000/auth/signup", {
            username, email, password,}).then(response => {

             console.log(response)
            if(response.data.status){
                navigate('/login')

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
            <h2>Signup</h2>
                <label htmlFor="username">username</label>
                <input type="text" placeholder="username"
                onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="Email">Email</label>
                <input type="text"  autoComplete='off' placeholder="email"
                onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">password</label>
                <input type="text" placeholder="******"
                onChange={(e) => setPassword(e.target.value)}/> <br/>

                <button type="submit">Submit</button>
                <p>have an accoount? <Link to="/login">login</Link></p> 
            </form>
        </div>
    )
}

export default Signup