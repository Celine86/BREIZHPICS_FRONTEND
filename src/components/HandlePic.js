import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../App.css';

export default function HandlePic() {

  const token = localStorage.getItem('token')

  const [localisation, setLocalisation] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(null);
  const [imgpreview, setImgPreview] = useState(false);

  useEffect(() => {
    if (picture) {
      setPreview(URL.createObjectURL(picture))
    }
  },[picture])

  const createPic = async event => {
    event.preventDefault();
    const formData = new FormData()
    formData.set("file", picture)
    formData.set("location", localisation)
    formData.set("description", description)
    Axios.post(`${process.env.REACT_APP_API_URL}pics/create`, formData, { headers: {'Content-Type': 'multipart/form-data',"Authorization": "Bearer " + token }})
    .then((response) =>{
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='card'>
      <form encType="multipart/form-data" className="form">
        <label>Localisation</label>
        <input type="text" placeholder="localisation" name="localisation" onChange={(e) => {setLocalisation(e.target.value); }}/>
        <label>Description</label>
        <textarea rows="4" cols="30" maxLenght="250" onChange={(e) => {setDescription(e.target.value); }}/>
        <label htmlFor="filePicker" className='btn'>Choisir une photo</label>
        <input id="filePicker" type="file" style={{display:'none'}} onInput={(e) => {setImgPreview(true)} } onChange={(e) => { setPicture(e.target.files[0]) }}></input>
        {imgpreview && <img alt="toto" src={preview} /> }      
        <button onClick={ createPic }>Enregistrer</button>
      </form>
    </div>
  )
}
