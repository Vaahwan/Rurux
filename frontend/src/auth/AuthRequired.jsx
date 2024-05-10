import React from "react";
import {Outlet,Navigate} from 'react-router-dom'

const AuthRequired = ()=>{
    const isLoggedIn = localStorage.getItem('adminLoggedIn');

    if(isLoggedIn==null || isLoggedIn!='true'){
        console.log("admin is not logged in")
        return <Navigate to='/login' />
    }
    return <Outlet/>
}

export default AuthRequired;