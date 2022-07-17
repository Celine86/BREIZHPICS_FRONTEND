import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className='card'>
      <div className='inline'>
        <div className='childcard' onClick={() => navigate("/dashboard/PicsToValidate")}>
          <p>Voir les posts à valider</p>
        </div>
        <div className='childcard' onClick={() => navigate("/dashboard/ReportedPics")}>
          <p>Voir les posts signalés</p>
        </div>
      </div>
    </div>
  )
}

