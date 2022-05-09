import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Axios from "axios";
import './Pic.css';
import like from '../img/like_black.png';

export default function Pic() {

  const { id } = useParams();
  const token = sessionStorage.getItem('token');


  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("username") === null){
      setVisible(true);
    }
  }, [])


  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [picUrl, setPicUrl] = useState();
  const [authorName, setAuthorName] = useState();
  const [authorAvatar, setAuthorAvatar] = useState();
  //const [userId, setUserID] = useState();
  const [likes, setLikes] = useState();

  const fetchPic = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all/${id}`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
      setLocation(data.location);
      setDescription(data.description);
      setPicUrl(data.picUrl);
      setAuthorName(data.User.username);
      setAuthorAvatar(data.User.avatar);
      setLikes(data.Likes.length);

      console.log(data)
  }
  useEffect(() => {
    fetchPic();
  })

  // modifyPic : btn visible que si auteur ou modo 
  // deletePic : btn visible que si auteur ou modo 
  // location : lien avec une API pour afficher géographiquement la carte, cf https://www.openstreetmap.org/copyright
  // like : OK que si connecté ét couleur change si liké --> cf map

  return (
  <div>
    { visible && 
      <div className="card">
        <h1 className="error">Il faut être connecté pour afficher les détails de la photo </h1>
      </div>
    }
    { visible ||
      <div className="picture">
        <img className="onepic" src={picUrl} alt={location}/>
        <div className="inlinepics">

        <img className='navIcon' src={ like } alt="like" onClick={(e) => {
                      e.preventDefault(); 
                      Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${id}`, 
                        { "picId": id },
                        { headers: {
                          "Authorization": 'Bearer ' + token,
                        },
                      })
                      .then(()=> {
                        fetchPic()
                      })
                    }}>
        </img>

          <p>{likes}</p>

        </div>
        <div className="inlinepics">
          <p className="username">{authorName}</p>
          <img className="useravatar" src={authorAvatar} alt={authorName}/>
        </div>
        <div>
          <h1>{location} </h1>
          <h2>{description} </h2>
        </div>
      </div>     
    }
  </div>
  )
}
