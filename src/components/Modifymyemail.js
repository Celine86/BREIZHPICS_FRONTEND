import React, { useEffect, useState} from 'react';
import Axios from "axios";
import '../App.css';
import { useParams } from "react-router-dom";

export default function Modifymyemail() {

  const { id } = useParams();
  const [useremail, setUseremail] = useState("");
  const [newuseremail, setNewUseremail] = useState("");

  const token = localStorage.getItem('token')
  const [modifyStatus, setModifyStatus] = useState("");

  useEffect(() => {
    if( localStorage.getItem("username") !== null ) {
        Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
        .then((response) => {
            setUseremail(response.data.userInfos.email);
        }) 
    }
  });

  const modify = event => {
    event.preventDefault();

        const formData = new FormData()
        formData.set("email", newuseremail)

        Axios.put(`${process.env.REACT_APP_API_URL}users/profils/modifyAccount/email/${id}`, 
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
            <label>Modifier mon email</label>
            <input type="text" placeholder={useremail} defaultValue={useremail} name="useremail" onChange={(e) => { setNewUseremail(e.target.value); }} />            
            <button onClick={ modify }>Modifier mon profil</button>
            <h5>{modifyStatus}</h5>
        </form>
    </div>
  )
}
