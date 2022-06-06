import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    let userid = sessionStorage.getItem("userId") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/notloggedin" />};
        </>
    )
}

