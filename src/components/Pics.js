import React, { useState, useEffect } from "react";
import Axios from "axios";
//import '../App.css';
import './Pics.css';

export default function Pics() {

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
      <div>
        <div>
          {(pics && pics.length > 0) && pics.map((pic) => (
            <div className="polaroid" key={pic.id}>
              <img src={pic.picUrl} alt={pic.location}/>
                <p>{pic.location}</p>
                <p>{pic.description}</p>
                <p>{pic.User.username}</p>
                { /* <img src={pic.User.avatar} alt={pic.User.username}/> */ }
            </div>
          ))}
        </div>
        
      </div>
    ) 
}
