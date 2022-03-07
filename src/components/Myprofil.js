import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../App.css';
import './Myprofil.css';
import Axios from "axios";

export default function Myprofil() {

    const [username, setUsername] = useState("");
    const [userpicture, setUserpicture] = useState("");
    const [useremail, setUseremail] = useState("");

    useEffect(() => {
        if( localStorage.getItem("username") !== null ) {
            Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                setUsername(response.data.userInfos.username);
                setUserpicture(response.data.userInfos.avatar);
                setUseremail(response.data.userInfos.email);
            }) 
        }
    });

    return (
        <div className="card">
            <h1>Bonjour { username } </h1>
            <div className="inline">
                <img className="avatar" alt="mon avatar" src={ userpicture }/>
                <div className="heightcenter">
                    <h4>Pseudonyme : { username }</h4>
                    <h4>E-mail : { useremail }</h4>   
                </div>
            </div>
            <div>
            <Link to={{ pathname: `/myprofil/modify/account/${localStorage.getItem("userId")}` }}>
                <button>Modifier mon compte</button>
            </Link> 
            <Link to={{ pathname: `/myprofil/modify/email/${localStorage.getItem("userId")}` }}>
                <button>Modifier mon email</button>
            </Link>            
            <Link to={{ pathname: `/myprofil/modify/pswd/${localStorage.getItem("userId")}` }}>
                <button>Modifier mon mot de passe</button>
            </Link>
            </div>
        </div>
    )  
}

