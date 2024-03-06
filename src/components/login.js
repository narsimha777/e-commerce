import React, { useState } from "react";
import { login } from "../utils/requests";
import Welcome from "./Welcome";
import { useNavigate } from 'react-router-dom';

export default function Login(props){
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState(false);
    const {logged, setLogged} = props;
    const handleLogin = async(e)=>{
        e.preventDefault();
        await login(username, password, setLogged, setErr);
        setUsername('');
        setPassword('');
    }

    if(logged){
        navigate('/')
    }
    return (<>
        <h1 className="heading">Login-Page</h1>
        <div className="signup">
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">User Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1"value={username} aria-describedby="emailHelp" onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {err&&<p style={{color:"red", textAlign:"center"}}>Username and password mismatch</p>}
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div></>);
}