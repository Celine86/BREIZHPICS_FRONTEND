import React, { useState, useEffect } from "react";
import Axios from "axios";
//import '../App.css';
import './Pics.css';
import like from '../img/like_black.png';

export default function Pics() {

  const token = localStorage.getItem('token');

  const [pics, setPics] = useState([]);
    
  const fetchPics = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all`)
    const pics = data.allPics;
    setPics(pics)
    //console.log(pics)
  }
  useEffect(() => {
    fetchPics();
  }, []);

    return (
        <div className="album">
          {(pics && pics.length > 0) && pics.map((pic) => (
            <div className="polaroid" key={pic.id}>
              <img className="pic" src={pic.picUrl} alt={pic.location}/>
                <div className="inlinepics">
                  <img className='navIcon' src={ like } alt="like" onClick={(e) => {
                    e.preventDefault(); 
                    Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${pic.id}`, 
                      { "UserId": pic.User.id, "picId": pic.id },
                      { headers: {
                        //'Content-Type' : 'application/json',
                        //'Accept' : 'application/json',
                        "Authorization": 'Bearer ' + token,
                      },
                    })
                    .then(()=> {
                      fetchPics()
                    })
                    /* .then((response) => {
                        console.log(response);    
                      }) 
                      .catch((error) => { 
                        console.log(error)
                      }) */
                  }}>
                  </img>
                  <p>{pic.Likes.length}</p>
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
    ) 
}
