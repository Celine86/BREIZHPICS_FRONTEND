/*import React, {useEffect, useState} from 'react'
import Axios from "axios";
import './Pic.css';
import './Pics.css';

export default function PicsToValidate() {

  const [picstovalidate, setPicsToValidate] = useState([]);

  const fetchPics = async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/picstovalidate`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
      const picstovalidate = data.picsToValidate;
      setPicsToValidate(picstovalidate);
  }
  useEffect(() => {
    fetchPics();
  }, [])

  return (
      <div className="album">
        {picstovalidate.length === 0 && <p className='msginfo'>Aucun post à valider</p>}
        {(picstovalidate && picstovalidate.length > 0) && picstovalidate.map((pic) => (
          <div className="polaroid" key={pic.id}>
              <div className="cover">
                <img className="pic" src={pic.picUrl} alt={pic.location}/>
              </div>
              <p className="location">{pic.location}</p>
              <p className="description">{pic.description}</p>
              <button className="btn-pic" onClick={ async (e) => {
                e.preventDefault(); 
                await Axios.put(`${process.env.REACT_APP_API_URL}pics/validate/${pic.id}`, 
                {beforeSubmission : false},
                {headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} }, )
                .then(()=> { 
                  fetchPics() 
                }) }}>
                Valider
              </button>
          </div>
        ))}
      </div>
  )
}
*/