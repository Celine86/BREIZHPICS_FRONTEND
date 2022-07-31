import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from "axios";
import './Pic.css';
import './Pics.css';
import like from '../img/like_black.png';
//import report from '../img/report_black.png';

export default function Pic() {

  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [canchange, setCanChange] = useState(false);
  const [deleteThisPic, setDeleteThisPic] = useState(false);
  //const [reportThisPic, setReportThisPic] = useState(false);
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [picUrl, setPicUrl] = useState();
  const [authorName, setAuthorName] = useState();
  const [authorAvatar, setAuthorAvatar] = useState();
  const [authorId, setAuthorId] = useState();
  const [likes, setLikes] = useState();
  const [picexist, setPicExist] = useState();
  //const [InfoMsg, setInfoMsg] = useState("");
  //const [ErrorMsg, setErrorMsg] = useState("");
  //const [visible, setVisible] = useState(false);

  const fetchPic = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all/${id}`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
      if(data !== null){
        setPicExist(true);
        setLocation(data.location);
        setDescription(data.description);
        setPicUrl(data.picUrl);
        setAuthorName(data.User.username);
        setAuthorAvatar(data.User.avatar);
        setAuthorId(data.User.id);
        setLikes(data.Likes.length);
      } else {
        setPicExist(false);
      }
  }
  useEffect(() => {
    fetchPic();
  })

  useEffect(() => {
    if((sessionStorage.getItem("userId")) === authorId){
      setCanChange(true)
    }
    else if((sessionStorage.getItem("role")) === "modo"){
      setCanChange(true)
    }
    else if((sessionStorage.getItem("role")) === "admin"){
      setCanChange(true)
    }
    else {
      setCanChange(false)
    }
  }, [setCanChange, authorId])

  const deletePic = async () => {
    setDeleteThisPic(true);
  }
  const confirmdeletePic = async () => {
    await Axios.delete(`${process.env.REACT_APP_API_URL}pics/delete/${id}`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
    .then((response) => {
      console.log(response.data.message)
      //setInfoMsg(response.data.message);
      setTimeout(() => {navigate("/pics"); }, 2000);      
    }) 
    .catch((error) => { 
      console.log(error.response.data.error)
      //setVisible(true);
      //setErrorMsg(error.response.data.error) 
      //setTimeout(() => {window.location.reload() }, 1500);
    })
  }
  const infirmdeletePic = () => {
    setDeleteThisPic(false);
  }

  /*
  const reportPic = async () => {
    setReportThisPic(true);
  }
  const confirmreportPic = async () => {
    console.log("report Pic")
  }
  const infirmreportPic = () => {
    setReportThisPic(false)
  }
  */


  return (
  <div>
    {picexist && 
      <div className="picture">
        <img className="onepic" src={picUrl} alt={location}/>
        <div className="inlinepics">
          <img className='navIcon' src={ like } alt="like" onClick={(e) => {
            e.preventDefault(); 
            Axios.post(`${process.env.REACT_APP_API_URL}pics/like/${id}`, 
              { "picId": id },
              { headers: {"Authorization": 'Bearer ' + token, },})
            .then(()=> { fetchPic() }) }}>
          </img>
          <p>{likes}</p>
        </div>
        <div className="inlinepics">
          <p className="username">{authorName}</p>
          <img className="useravatar" src={authorAvatar} alt={authorName}/>
        </div>
        <div>
          <h1>{location} </h1>
          <p>{description} </p>
          { /*visible || <h5 className="msg">{InfoMsg}</h5>*/ }
          { /*visible && <h5 className="error">{ErrorMsg}</h5>*/ }
        </div>
        { /*}
        <div className="reportmsg">
            <img className="picIcon" onClick={reportPic} src={report} alt="Signaler une erreur" title="Signaler une erreur"></img>
            {  reportThisPic &&
              <div className="reportform">
                <p>Test</p>
                    <form>
                    <div className="inline">
                      <button onClick={confirmreportPic} className="btn-pic--yn">OUI</button>
                      <button onClick={infirmreportPic} className="btn-pic--yn">NON</button>
                    </div>
                  </form>
              </div>
            }
        </div>
        */ }
          { canchange &&
            <div>
              <div className="inlinebutton">
                <Link to={`/modifypic/${id}`}><button className="btn-pic">Modifier</button></Link>
                <button onClick={deletePic} className="btn-pic">Supprimer</button>
              </div>
              { deleteThisPic &&
                <div className="inline">
                  <p>Supprimer ?</p>
                  <button onClick={confirmdeletePic} className="btn-pic--yn">OUI</button>
                  <button onClick={infirmdeletePic} className="btn-pic--yn">NON</button>
                </div>
              }
            </div>       
          }
      </div>  
    }
  </div>
  )
}
