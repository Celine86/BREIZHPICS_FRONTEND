import React, { useEffect, useState} from 'react';
import Axios from "axios";
import '../App.css';
import { useParams } from "react-router-dom";

export default function Modifymyaccount() {

  const { id } = useParams();
  const [userpicture, setUserpicture] = useState("");
  const [newuserpicture, setNewUserpicture] = useState("");

  const token = localStorage.getItem('token')
  const [modifyStatus, setModifyStatus] = useState("");

  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if( localStorage.getItem("username") !== null ) {
        Axios.get(`${process.env.REACT_APP_API_URL}users/profils/` + localStorage.getItem("userId"), { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
        .then((response) => {
            setUserpicture(response.data.userInfos.avatar);
        }) 
    }
  });

  const modify = event => {
    event.preventDefault();

        const formData = new FormData()
        formData.set("file", newuserpicture)

        Axios.put(`${process.env.REACT_APP_API_URL}users/profils/modifyAccount/${id}`, 
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
            <label>Modifier mon avatar</label>
            <button onClick={handleClick}>Choisir un nouvel avatar</button>
            <input type="file" ref={hiddenFileInput} onChange={(e) => { setNewUserpicture(e.target.files[0]); }}></input>       
            <button onClick={ modify }>Modifier mon profil</button>
            <h5>{modifyStatus}</h5>
        </form>
    </div>
  )
}
