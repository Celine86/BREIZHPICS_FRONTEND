import React, { useState } from 'react';
import Axios from "axios";
import '../App.css';
import { useParams } from "react-router-dom";

export default function Modifymypassword() {

  const { id } = useParams();
  const [password, setNewPassword] = useState("");
  const [verifypassword, setNewVerifyPassword] = useState("");

  const token = localStorage.getItem('token')
  const [modifyStatus, setModifyStatus] = useState("");

  const modify = event => {
    event.preventDefault();

        const formData = new FormData()
        formData.set("password", password)
        formData.set("verifyPassword", verifypassword)

        Axios.put(`${process.env.REACT_APP_API_URL}users/profils/modifyAccount/pswd/${id}`, 
            formData,
          { headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + token 
            }
          }
        )
        .then((response) => {
            setModifyStatus(response.data.message);
        }) 
        .catch((error) => setModifyStatus(error.response.data.error))
  }

  return (
    <div className="card">
        <h1>Modifier mon profil</h1>
        <form encType="multipart/form-data" className="form">
            <label>Modifier mon mot de passe</label>
            <input type="password" placeholder="modifier le mot de passe" onChange={(e) => { setNewPassword(e.target.value); }} />            
            <input type="password" placeholder="confirmer le mot de passe" onChange={(e) => { setNewVerifyPassword(e.target.value); }} />
            <button onClick={ modify }>Modifier mon profil</button>
            <h5>{modifyStatus}</h5>
        </form>
    </div>
  )
}
