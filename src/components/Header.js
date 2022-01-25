import './Header.css';
import { Link } from 'react-router-dom';
import home from '../img/home_white.png';
import search from '../img/search_white.png';
import React, { useEffect, useState } from 'react';
import Axios from "axios";

/*
export default function Header () {
    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div>
            <div><Link to="/"><img className='navIcon' src={home} alt="toto"/></Link> | <Link to="/search"><img className='navIcon' src={search} alt="toto"/></Link></div>            
        </div>
    )
}
*/


export default function Header () {

    const [username, setUsername] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if( localStorage.getItem("username") != null ) {
            Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                //console.log(response.data.userInfos.username);
                setUsername(response.data.userInfos.username);
                setVisible(true);
            })
        }
    });
    
    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            { visible && <div><h4>Bonjour { username } </h4></div> }
            { visible || <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div> }
            <div><Link to="/"><img className='navIcon' src={home} alt="toto"/></Link> | <Link to="/search"><img className='navIcon' src={search} alt="toto"/></Link></div>            
        </div>
    )
}
