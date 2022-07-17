import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import '../App.css';


export default function Modifymyemail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [useremail, setUseremail] = useState("");
  const [newuseremail, setNewUseremail] = useState("");

  const token = sessionStorage.getItem('token')
  const [modifyStatusMsg, setModifyStatusMsg] = useState("");
  const [modifyStatusError, setModifyStatusError] = useState("");
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    if( sessionStorage.getItem("username") !== null ) {
        Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + sessionStorage.getItem("userId"), { headers: {Authorization: "Bearer " + sessionStorage.getItem("token")} })
        .then((response) => {
            setUseremail(response.data.userInfos.email);
        }) 
    }
  });

  const modify = event => {
    event.preventDefault();

        Axios.put(`${process.env.REACT_APP_API_URL}users/profils/modifyAccount/email/${id}`, 
          { email: newuseremail},
          { headers: {
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
          setTimeout(() => {window.location.reload() }, 2000);
        }) 
  }

  return (
    <div className="card">
        <h1>Modifier mon email</h1>
        <form encType="multipart/form-data" className="form">
            <input type="text" placeholder={useremail} defaultValue={useremail} name="useremail" onChange={(e) => { setNewUseremail(e.target.value); }} />            
            <button onClick={ modify }>Enregistrer</button>
            { visible || <h5 className="msg">{modifyStatusMsg}</h5> }
            { visible && <h5 className="error">{modifyStatusError}</h5> }
        </form>
    </div>
  )
}
