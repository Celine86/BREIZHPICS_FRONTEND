import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../App.css';

export default function ModifyPic() {

  const { id } = useParams();
  const token = sessionStorage.getItem('token')
  const [localisation, setLocalisation] = useState("");
  const [newlocalisation, setNewLocalisation] = useState("");
  const [description, setDescription] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [actualpicture, setActualPicture] = useState(false);
  const [picture, setPicture] = useState("");
  const [newpicture, setNewPicture] = useState(null);
  const [loginStatusMsg, setLoginStatusMsg] = useState("");
  const [loginStatusError, setLoginStatusError] = useState("");
  const [visible, setVisible] = useState(false);
  const [isauthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const fetchPicToModify = async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API_URL}pics/all/${id}`, { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
    if(data !== null && (data.User.id === sessionStorage.getItem("userId") || sessionStorage.getItem("role") === "admin" || sessionStorage.getItem("role") === "modo")){
        setIsAuthorized(true);
        setLocalisation(data.location);
        setDescription(data.description);
        setPicture(data.picUrl);
    }
    if (newpicture) {
      setNewPicture(URL.createObjectURL(newpicture))
    } 
  }
  useEffect(() => {
    fetchPicToModify();
  })

  const modifyPic = async event => {
    event.preventDefault();
    const formData = new FormData()
    formData.set("file", newpicture)
    formData.set("location", newlocalisation)
    formData.set("description", newdescription)
    Axios.put(`${process.env.REACT_APP_API_URL}pics/modify/${id}`, formData, { headers: {'Content-Type': 'multipart/form-data',"Authorization": "Bearer " + token }})
    .then((response) =>{
      setLoginStatusMsg(response.data.message)
      setTimeout(() => {navigate("/pics"); }, 2000);
    })
    .catch((error) => {
      setVisible(true);
      setLoginStatusError(error.response.data.message)
      setTimeout(() => {setVisible(false) }, 2000);
    })
  }

  return (
    <div className='card'>
      { isauthorized ||
      <p>Pas autorisé</p>
      }
      { isauthorized &&
      <form encType="multipart/form-data" className="form">
        <label>Localisation</label>
        <input type="text" placeholder={localisation} name={localisation} onChange={(e) => {setNewLocalisation(e.target.value); }}/>
        <label>Description</label>
        <textarea placeholder={description} name={description} rows="4" cols="30" maxLength="250" onChange={(e) => {setNewDescription(e.target.value); }}/>
        { actualpicture || <img alt="actuelle" width="100%" heigth="auto" src={picture} /> }
        <label htmlFor="filePicker" className='btn'>Choisir une photo</label>
        { actualpicture && <img alt="breizhpic" width="100%" heigth="auto" src={newpicture} /> }   
        <input id="filePicker" type="file" style={{display:'none'}} onInput={(e) => {setActualPicture(true)} } onChange={(e) => { setNewPicture(e.target.files[0]) }}></input>    
        <button onClick={ modifyPic }>Enregistrer</button>
        { visible || <h5 className="msg">{loginStatusMsg}</h5> }
        { visible && <h5 className="error">{loginStatusError}</h5> }
      </form>
      }
    </div>
  )
}