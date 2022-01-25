import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../App.css';
import './Register.css';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const login = async event => {
        event.preventDefault();
        try {
            Axios.post(`${process.env.REACT_APP_API_URL}users/login`, {
                username: username,
                password: password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("username", response.data.username)
                setLoginStatus(response.data.message)
                navigate("/");
                window.location.reload();
                //console.log(response.data)
            })
        } catch(error) {
            setLoginStatus(error.response.data.message)
            //console.log(error.response.data.error);
        }
    }
    
    return (
        <div className="cardregister">
            <h1>Login</h1>
            <form className="form">
                <label>Pseudonyme: </label>
                <input type="text" placeholder="Pseudonyme" onChange={(e) => { setUsername(e.target.value); }}></input>
                <label>Mot de passe: </label>
                <input type="password" placeholder="Mot de passe" onChange={(e) => { setPassword(e.target.value); }}></input>
                <button onClick={login}>Login</button>
                <h5>{loginStatus}</h5>
            </form>
        </div>
    )
}