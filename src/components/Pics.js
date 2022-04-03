import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Pics.css';
import like from '../img/like_black.png';
import search from '../img/search_white.png';
import refresh from '../img/refresh_white.png';
import info from '../img/information_black.png'

export default function Pics() {

  const token = localStorage.getItem('token');
  const [visible, setVisible] = useState(true);
  
  /*const [disabled, setDisabled] = useState(true);

  if(localStorage.getItem("username") !== null){
    setDisabled(false);
  }*/
  
  const [allpics, setPics] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  //const [errorMsg, setErrorMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

   
  const fetchPics = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all`)
    setVisible(true)
    setResponseMsg("")
    const allpics = data.allPics;
    setPics(allpics);
  }
  useEffect(() => {
    fetchPics();
  }, [])

  const searchPics = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}pics/search`, { "location": location, "description": description })
      .then((response) => { 
        setResponseMsg(response.data.message)
        setVisible(false)
        const { data } = response
        const allpics = data
        setPics(allpics)   
      })   
    }
    catch (error) {
      console.log(error)
    }
  }

    return (
      <div>
        <form className="searchform">
            <img className='navIcon' src={refresh} alt="rafraichir" onClick = { fetchPics }></img>
            <input className="searchform--child" type="text" name="location" placeholder="chercher par localisation" onChange={(e) => { setLocation(e.target.value); }}></input>
            <input className="searchform--child" type="text" name="description" placeholder="chercher par mot-clé" onChange={(e) => { setDescription(e.target.value); }}></input>
            <img className='navIcon' src={search} alt="rechercher" onClick = { searchPics }></img>
        </form>
        <h5 className="msg">{ responseMsg }</h5>
        <div className="album">
          {(allpics && allpics.length > 0) && allpics.map((pic) => (
            <div className="polaroid" key={pic.id}>
              <img className="pic" src={pic.picUrl} alt={pic.location}/>
                <div className="inlinepics">
                  { visible &&
                    /* <button disabled={disabled}> */
                    <img className='navIcon' src={ like } alt="like" onClick={(e) => {
                      e.preventDefault(); 
                      Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${pic.id}`, 
                        { "UserId": pic.User.id, "picId": pic.id },
                        { headers: {
                          "Authorization": 'Bearer ' + token,
                        },
                      })
                      .then(()=> {
                        fetchPics()
                      })
                    }}>
                    </img>
                  }
                  { visible && 
                    <p>{pic.Likes.length}</p>
                  }
                  { visible ||
                    <Link to="/"><img className='navIcon' src={info} alt="plus d'infos"/></Link>
                  }
                </div>
                <p className="location">{pic.location}</p>
                <p className="description">{pic.description}</p>
                <div className="inlinepics">
                  <p className="username">{pic.User.username}</p>
                  <img className="useravatar" src={pic.User.avatar} alt={pic.User.username}/>
                </div>
            </div>
          ))}
        </div>
      </div>
    ) 
}
