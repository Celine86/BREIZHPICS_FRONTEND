import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../App.css';
import './Register.css';

export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [modifySignupMsg, setSignupMsg] = useState("");
    const [modifySignupError, setSignupError] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const signup = async event => {
        event.preventDefault();
        try {
            Axios.post(`${process.env.REACT_APP_API_URL}users/signup`, {
                username: username,
                email: email,
                password: password,
                verifyPassword: verifyPassword
            })
            .then((response) => {
                if(response.statusText === "Created"){
                    Axios.post(`${process.env.REACT_APP_API_URL}users/login`, {
                        username: username,
                        password: password,
                    })
                    .then((response) => {
                        sessionStorage.setItem("token", response.data.token)
                        sessionStorage.setItem("userId",response.data.userId)
                        sessionStorage.setItem("username", response.data.username)
                        setSignupMsg(response.data.message)
                        setTimeout(() => {navigate("/myprofil"); }, 2000);
                    }) 
                }
            })
            .catch(error => {
                setVisible(true);
                setSignupError(error.response.data.error);
                setTimeout(() => {window.location.reload() }, 2000);
            }) 
        } catch (error) {
            setVisible(true);
            setSignupError(error.response.data.error);
            setTimeout(() => {window.location.reload() }, 2000);
        }
    }

    return (
        <div className="cardregister">
            <h1>Inscription</h1>
            <form className="form">
                <label>Pseudonyme: </label>
                <input type="text" placeholder="Pseudonyme" onChange={(e) => { setUsername(e.target.value); }}></input>
                <label>Email: </label>
                <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }}></input>
                <label>Mot de passe: </label>
                <input type="password" placeholder="Mot de passe" onChange={(e) => { setPassword(e.target.value); }}></input>
                <label>Confirmer le mot de passe: </label>
                <input type="password" placeholder="Confirmer le mot de passe" onChange={(e) => { setVerifyPassword(e.target.value); }}></input>
                <button onClick={signup}>S'inscrire</button>
                { visible || <h5 className="msg">{modifySignupMsg}</h5> }
                { visible && <h5 className="error">{modifySignupError}</h5> }
            </form>
        </div>
    )
}
