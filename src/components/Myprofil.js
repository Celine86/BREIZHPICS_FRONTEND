import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../App.css';
import './Myprofil.css';
import Axios from "axios";
import modify from '../img/modify_grey.png';

export default function Myprofil() {

    const [username, setUsername] = useState("");
    const [userpicture, setUserpicture] = useState("");
    const [useremail, setUseremail] = useState("");
    const [userbio, setUserbio] = useState("");

    useEffect(() => {
        if( localStorage.getItem("username") !== null ) {
            Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                setUsername(response.data.userInfos.username);
                setUserpicture(response.data.userInfos.avatar);
                setUseremail(response.data.userInfos.email);
                setUserbio(response.data.userInfos.bio)
            }) 
        }
    });

    return (
        <div className="card">
            <h1>Bonjour { username } </h1>
            <div className="inline">
                <div className ="heightcenter">
                    <div className='inline'>
                        <img className="avatar" alt="mon avatar" src={ userpicture }/>
                        <Link className="bottom" to={{ pathname: `/myprofil/modify/account/${localStorage.getItem("userId")}` }}><img className='navIcon' src={modify} alt="modify"/></Link>                    
                    </div>
                </div>
                <div className="heightcenter">
                    <div className="inline">
                        <h4>{ username }</h4>
                        <Link to={{ pathname: `/myprofil/modify/account/${localStorage.getItem("userId")}` }}><img className='navIcon' src={modify} alt="modify"/></Link>
                    </div>
                    <div className="inline">
                        <p className="bio">{ userbio }</p>
                        <Link to={{ pathname: `/myprofil/modify/account/${localStorage.getItem("userId")}` }}><img className='navIcon' src={modify} alt="modify"/></Link>
                    </div>
                    <div className="inline">
                        <h4>{ useremail }</h4>
                        <Link to={{ pathname: `/myprofil/modify/email/${localStorage.getItem("userId")}` }}><img className='navIcon' src={modify} alt="modify"/></Link>
                    </div>
                    <div className="inline">
                        <h4>************</h4>
                        <Link to={{ pathname: `/myprofil/modify/pswd/${localStorage.getItem("userId")}` }}><img className='navIcon' src={modify} alt="modify"/></Link>
                    </div>
                </div>
            </div>
        </div>
    )  
}

