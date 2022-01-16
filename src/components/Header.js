import './Header.css';
import { Link } from 'react-router-dom';
import home from '../img/home_white.png';
import search from '../img/search_white.png';

export default function Header () {
    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            <p>Partagez vos plus belles photos !</p>

            <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div>
            <div><Link to="/"><a href=""><img className='navIcon' src={home}/></a></Link> | <Link to="/search"><a href=""><img className='navIcon' src={search}/></a></Link></div>
            
        </div>
    )
}

