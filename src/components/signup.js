import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import ROUTES from "../routes";
import Welcome from "./Welcome";
import { use } from "i18next";
const { register } = require("../utils/requests");

export default function Signup(props){
    const navigate = useNavigate()
    const { logged, setLogged} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const user_id = uuidv4();
        console.log("sign up called")
        register(username, password, user_id, setLogged, setErr);
        // setUserid('')
        setUsername('');
        setPassword('');
    }
    if(logged){
        navigate('/')
    }
    return (<><h1 className="heading">Sign-Up</h1><div className="signup">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">User Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" value={username} aria-describedby="emailHelp" onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {err&&<p style={{color:'red', textAlign:'center'}}>Username already taken</p>}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p className="alert">
            Do you have account? 
        <NavLink to={ROUTES.login()}><small className="text-body-secondary">Login</small></NavLink>
        </p>
        </div></>);
}