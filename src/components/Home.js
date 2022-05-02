import '../App.css';
import homepage from '../img/home.jpg';

export default function Home() {
    return (
        <div className="card">
            <h1>Bienvenue sur BreizhPics !</h1>
            <p>Cet espace est dédié au partage de photographies d'une des plus belles régions de France !</p><br/>
            <img className="imghome" src={homepage} alt="accueil"></img>
        </div>
    )
}
