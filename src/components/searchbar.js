import React, { useEffect } from "react";
import { NavLink} from "react-router-dom";
import ROUTES from "../routes";
import logo from '../img/logo.png';
import { logout } from "../utils/requests";

export default function Searchbar({setSearch, logged, setLogged}){
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const handlelogout = async()=>{
        await logout(setLogged);
    }
    function reload(){
        self.location.reload();
    }
    function hist(){
        self.history.pushState({},"", ROUTES.cart(id));
    }
    return (<>
        <div className="navs">
            <img className="logo" src={logo} style={{ width: "100px" }} />
            <div className="searchb">
                <input className="form-control" type="text" placeholder="🔍Search" aria-label="default input example" onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <ul className="nav justify-content-end">
                {logged&&
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" onClick={handlelogout}>Logout</a>
                </li>
                }
                {!logged&&
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={ROUTES.login()}>Login</NavLink>
                </li>}
                {!logged&&<li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={ROUTES.signup()}>Sign-Up</NavLink>
                </li>}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
                {logged&&<li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" onClick={()=>{hist; reload}} to={ROUTES.cart(id)}>Cart</NavLink>
                </li>}
                {logged&&name&&<li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" style={{color:"orange"}}>{name}</a>
                </li>
                }
            </ul>
        </div>
    </>);
}