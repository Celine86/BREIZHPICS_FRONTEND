import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import '../App.css';
import './Myprofil.css';

export default function Modifymyaccount() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [userpicture, setUserpicture] = useState("");
  const [newuserpicture, setNewUserpicture] = useState("");
  const [userusername, setUserusername] = useState("");
  const [newuserusername, setNewUserusername] = useState("");
  const [userbio, setUserbio] = useState("");
  const [newuserbio, setNewUserbio] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [userAvatar, setUserAvatar] = useState(false);

  const token = sessionStorage.getItem('token')
  const [modifyStatusMsg, setModifyStatusMsg] = useState("");
  const [modifyStatusError, setModifyStatusError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if( sessionStorage.getItem("username") !== null ) {
        Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + sessionStorage.getItem("userId"), { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
        .then((response) => {
            setUserpicture(response.data.userInfos.avatar);
            setUserusername(response.data.userInfos.username);
            setUserbio(response.data.userInfos.bio);
        }) 
    }
    if (newuserpicture) {
      setImageUrl(URL.createObjectURL(newuserpicture));
    }
  },[newuserpicture]);

  const modify = event => {
    event.preventDefault();
    const formData = new FormData()
    formData.set("file", newuserpicture)
    formData.set("username", newuserusername)
    formData.set("bio", newuserbio)
    Axios.put(`${process.env.REACT_APP_API_URL}users/profils/modifyAccount/${id}`, 
        formData,
      { headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": "Bearer " + token 
        }
      }
    )
    .then((response) => {
      setModifyStatusMsg(response.data.message);
      setTimeout(() => {navigate("/myprofil"); }, 2000);      
    }) 
    .catch((error) => { 
      setVisible(true);
      setModifyStatusError(error.response.data.error) 
      setTimeout(() => {window.location.reload() }, 1500);
    })
  }

  return (
    <div className="card">
        <h1>Modifier mon profil</h1>
        <form encType="multipart/form-data" className="form">
            <label>Pseudonyme</label>
            <input type="text" placeholder={userusername} defaultValue={userusername} name="userusername" onChange={(e) => { setNewUserusername(e.target.value); }} />
            <label>Biographie</label>
            <textarea rows="4" cols="30" maxLength="250" defaultValue={userbio} onChange={(e) => { setNewUserbio(e.target.value); }} ></textarea>
            <label>Avatar</label>
            { userAvatar || <img className="avatar" alt="mon avatar" src={ userpicture } /> }
            <label htmlFor="filePicker" className='btn'>Choisir un nouvel avatar</label>
            { userAvatar && <img className="avatar" alt="Futur avatar" src={ imageUrl } /> }
            <input id="filePicker" type="file" style={{display:'none'}} onInput={(e) => {setUserAvatar(true)} } onChange={(e) => { setNewUserpicture(e.target.files[0]) }}></input>       
            <button onClick={ modify }>Enregistrer</button>
            { visible || <h5 className="msg">{modifyStatusMsg}</h5> }
            { visible && <h5 className="error">{modifyStatusError}</h5> }
        </form>
    </div>
  )
}
