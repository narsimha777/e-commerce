import logo from './logo.svg';
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Welcome from './components/Welcome';
import Signup from './components/signup';
import Login from './components/login';
import Cart from './components/cart';
import { useState, useEffect } from 'react';

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true');
  const token = localStorage.getItem('token');
  useEffect(() => {
    // When the loggedIn state changes, update the localStorage value
    localStorage.setItem('logged', logged);
  }, [logged]);
  // const [name, setName] = useState();
  // const id = localStorage.getItem('id');
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Welcome setLogged={setLogged} logged={logged} token={token}/>}/>
      <Route path='/login' element={<Login setLogged = {setLogged} logged = {logged} />}/>
      <Route path='/cart/:id' element={<Cart logged={logged} token={token}/>}/>  
      <Route path='/signup' element={<Signup setLogged = {setLogged} logged = {logged} />}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
