import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import '../App.css';


export default function Modifymypassword() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [password, setNewPassword] = useState("");
  const [verifypassword, setNewVerifyPassword] = useState("");

  const token = sessionStorage.getItem('token')
  const [modifyStatusMsg, setModifyStatusMsg] = useState("");
  const [modifyStatusError, setModifyStatusError] = useState("");
  const [visible, setVisible] = useState(false);

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
            setModifyStatusMsg(response.data.message);
            setTimeout(() => {navigate("/myprofil"); }, 2000);
        }) 
        .catch((error) => { 
          setVisible(true);
          setModifyStatusError(error.response.data.error);
          setTimeout(() => {window.location.reload() }, 1500);
        })
  }

  return (
    <div className="card">
        <h1>Modifier mon mot de passe</h1>
        <form encType="multipart/form-data" className="form">
            <input type="password" placeholder="modifier le mot de passe" onChange={(e) => { setNewPassword(e.target.value); }} />            
            <input type="password" placeholder="confirmer le mot de passe" onChange={(e) => { setNewVerifyPassword(e.target.value); }} />
            <button onClick={ modify }>Enregistrer</button>
            { visible || <h5 className="msg">{modifyStatusMsg}</h5> }
            { visible && <h5 className="error">{modifyStatusError}</h5> }
        </form>
    </div>
  )
}
