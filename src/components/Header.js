import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import home from '../img/home_white.png';
import logoutimg from '../img/logout_white.png'
import profil from '../img/profil_white.png';
import pics from '../img/pics_white.png';
import addpic from '../img/addpic_white.png';

export default function Header () {

    const [username, setUsername] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if( sessionStorage.getItem("username") !== null ) {
            Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + sessionStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")} })
            .then((response) => {
                setUsername(response.data.userInfos.username);
                setVisible(true);
            })
        }
    });
    
    const logout = (() => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("email")
        navigate("/");
        window.location.reload();
    });

    const goToPics = (() => {
        if(window.location.pathname === "/pics"){
            window.location.reload()
        } else {
            navigate("/pics")
        }
    })


    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            { visible && <div><h4>Bonjour { username } </h4></div> }      
            { visible || <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div> }
            <div className="inline">
                <div><Link to="/"><img className='navIcon' src={home} alt="home"/></Link>|<img className='navIcon' src={pics} onClick={ goToPics } alt="naviguer"/></div>
                { visible && <div>||<Link to="/pic/handle"><img className='navIcon' src={addpic} alt="mon profil"/></Link>|<Link to="/myprofil"><img className='navIcon' src={profil} alt="mon profil"/></Link>|<img className='navIcon' src={ logoutimg } onClick={ logout } alt="logout"/></div> }
            </div>            
        </div>
    )
}
