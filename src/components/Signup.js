import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../App.css';
import './Register.css';

export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    //const navigate = useNavigate();

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
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("userId",response.data.userId)
                        setLoginStatus(response.data.message)
                        //navigate("/home");
                        //console.log(response.data.message)
                    }) 
                }
            })
            .catch(error => {
                setLoginStatus(error.response.data.error)
                //console.log(error.response.data.error)
            }) 
        } catch (error) {
            setLoginStatus(error.response.data.error)
            //console.log(error);
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
                <button onClick={signup}>Signup</button>
                <h5>{loginStatus}</h5>
            </form>
        </div>
    )
}
