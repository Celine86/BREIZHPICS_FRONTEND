import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import home from '../img/home_white.png';
import search from '../img/search_white.png';
import logoutimg from '../img/logout_white.png'
import profil from '../img/profil_white.png';

export default function Header () {

    const [username, setUsername] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if( localStorage.getItem("username") !== null ) {
            Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                setUsername(response.data.userInfos.username);
                setVisible(true);
            })
        }
    });
    
    const logout = (() => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
        navigate("/");
        window.location.reload();
    });


    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            { visible && <div><h4>Bonjour { username } </h4></div> }      
            { visible || <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div> }
            <div className="inline">
                <div><Link to="/"><img className='navIcon' src={home} alt="home"/></Link>|<Link to="/search"><img className='navIcon' src={search} alt="rechercher"/></Link></div>
                { visible && <div>||<img className='navIcon' src={ logoutimg } onClick={ logout } alt="logout"/>|<Link to="/myprofil"><img className='navIcon' src={profil} alt="mon profil"/></Link></div> }
            </div>            
        </div>
    )
}
