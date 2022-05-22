import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Axios from "axios";
import './Pic.css';
import './Pics.css';
import like from '../img/like_black.png';
//import liked from '../img/like_black_full.png';

export default function Pic() {

  const { id } = useParams();
  const token = sessionStorage.getItem('token');

  const [loggedin, setLoggedIn] = useState(false);
  const [canchange, setCanChange] = useState(false);
  const [deleteThisPic, setDeleteThisPic] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("username") === null){
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [])


  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [picUrl, setPicUrl] = useState();
  const [authorName, setAuthorName] = useState();
  const [authorAvatar, setAuthorAvatar] = useState();
  const [authorId, setAuthorId] = useState();
  //const [userId, setUserID] = useState();
  const [likes, setLikes] = useState();
  //const [userlikes, setUserLikes] = useState(false);

  const fetchPic = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all/${id}`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
      setLocation(data.location);
      setDescription(data.description);
      setPicUrl(data.picUrl);
      setAuthorName(data.User.username);
      setAuthorAvatar(data.User.avatar);
      setAuthorId (data.User.id);
      setLikes(data.Likes.length);

      //console.log(data.Likes[0].UserId)
      //https://stackoverflow.com/questions/66396557/vuejs-add-like-and-remove-like-does-not-work
      //https://lyket.dev/docs/react
      
            
      if(sessionStorage.getItem("userId") === authorId){
        setCanChange(true);
      }
      if(sessionStorage.getItem("role") === "modo"){
        setCanChange(true);
      }
  }
  useEffect(() => {
    fetchPic();
  })

  const deletePic = async () => {
    setDeleteThisPic(true);
  }

  // modifyPic : btn visible que si auteur ou modo 
  // deletePic : btn visible que si auteur ou modo 
  // location : lien avec une API pour afficher géographiquement la carte, cf https://www.openstreetmap.org/copyright
  // like : OK que si connecté ét couleur change si liké --> cf map

  return (
  <div>
    { loggedin || 
      <div className="card">
        <h1 className="error">Il faut être connecté pour afficher les détails de la photo </h1>
      </div>
    }
    { loggedin &&
      <div className="picture">
        <img className="onepic" src={picUrl} alt={location}/>
        <div className="inlinepics">
          {//userlikes ||
            <img className='navIcon' src={ like } alt="like" onClick={(e) => {
              e.preventDefault(); 
              Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${id}`, 
                { "picId": id },
                { headers: {"Authorization": 'Bearer ' + token, },})
              .then(()=> { fetchPic() }) }}>
            </img>
          }
          {/*userlikes &&
            <img className='navIcon' src={ liked } alt="like" onClick={(e) => {
              e.preventDefault(); 
              Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${id}`, 
                { "picId": id },
                { headers: {"Authorization": 'Bearer ' + token, },})
              .then(()=> {  setUserLikes(false) }) }}>
            </img>
          */}
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
          { canchange &&
            <div>
              <div className="inlinebutton">
                <button className="btn-pic">Modifier</button>
                <button onClick={deletePic} className="btn-pic">Supprimer</button>
              </div>
              { deleteThisPic &&
                <div className="inline">
                  <p>Supprimer ?</p>
                  <button className="btn-pic--yn">OUI</button>
                  <button className="btn-pic--yn">NON</button>
                </div>
              }
            </div>       
          }
      </div>     
    }
  </div>
  )
}
