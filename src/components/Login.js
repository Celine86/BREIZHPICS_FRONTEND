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
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("email", response.data.email)
                setLoginStatus(response.data.message)
                navigate("/myprofil");
                //window.location.reload();
            })
            .catch(error => {
                setLoginStatus(error.response.data.error)
            }) 
        } catch(error) {
            setLoginStatus(error.response.data.message)
        }
    }
    
    return (
        <div className="cardregister">
            <h1>Connexion</h1>
            <form className="form">
                <label>Pseudonyme: </label>
                <input type="text" placeholder="Pseudonyme" onChange={(e) => { setUsername(e.target.value); }}></input>
                <label>Mot de passe: </label>
                <input type="password" placeholder="Mot de passe" onChange={(e) => { setPassword(e.target.value); }}></input>
                <button onClick={login}>Se Connecter</button>
                <h5>{loginStatus}</h5>
            </form>
        </div>
    )
}