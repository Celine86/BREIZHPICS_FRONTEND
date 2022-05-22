import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../App.css';
import './Register.css';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatusMsg, setLoginStatusMsg] = useState("");
    const [loginStatusError, setLoginStatusError] = useState("");
    const [visible, setVisible] = useState(false);
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
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("userId",response.data.userId)
                sessionStorage.setItem("username", response.data.username)
                sessionStorage.setItem("email", response.data.email)
                sessionStorage.setItem("role", response.data.role)
                setLoginStatusMsg(response.data.message)
                setTimeout(() => {navigate("/pics"); }, 2000);
            })
            .catch(error => {
                setVisible(true);
                setLoginStatusError(error.response.data.error)
                setTimeout(() => {window.location.reload() }, 1500);
            }) 
        } catch(error) {
            setVisible(true);
            setLoginStatusError(error.response.data.message)
            setTimeout(() => {window.location.reload() }, 1500);
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
                { visible || <h5 className="msg">{loginStatusMsg}</h5> }
                { visible && <h5 className="error">{loginStatusError}</h5> }
            </form>
        </div>
    )
}