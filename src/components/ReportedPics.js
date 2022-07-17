//import React, {useEffect, useState} from 'react'
//import Axios from "axios";
import './Pics.css';

export default function ReportedPics() {

  /*
  const [picstovalidate, setPicsToValidate] = useState([]);

  const fetch = async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/reportedpics`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
      const picstovalidate = data.reportedPics;
      setPicsToValidate(picstovalidate);
      console.log(picstovalidate)
  }
  useEffect(() => {
    fetch();
  }, [])
  */

  return (
      <div className='card'><h1>En cours de construction</h1>
      {/* 
      <div className="album">
        {picstovalidate === undefined && <p className='msginfo'>Aucun signalement de post</p>}
        {(picstovalidate && picstovalidate.length > 0) && picstovalidate.map((pic) => (
          <div className="polaroid" key={pic.id}>
              <div className="cover">
                <img className="pic" src={pic.picUrl} alt={pic.location}/>
              </div>
              <p className="location">{pic.location}</p>
              <p className="description">{pic.description}</p>
          </div>
        ))}
      </div> 
      */}
      </div>
  )
}
