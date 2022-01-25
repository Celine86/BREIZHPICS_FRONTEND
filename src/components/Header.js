import './Header.css';
import { Link } from 'react-router-dom';
import home from '../img/home_white.png';
import search from '../img/search_white.png';

export default function Header () {
    return (
        <div className="header">
            <h1>BREIZHPICS</h1>
            <div><Link to="/login">Se Connecter</Link> | <Link to="/signup">S'inscrire</Link></div>
            <div><Link to="/"><img className='navIcon' src={home} alt="toto"/></Link> | <Link to="/search"><img className='navIcon' src={search} alt="toto"/></Link></div>            
        </div>
    )
}

