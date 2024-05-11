import React from "react";
import './navbar.css'
import {useNavigate,NavLink} from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Navbar = ({isloggedIn,setIsloggedIn})=>{
    const navigate = useNavigate();

    const handleSignout = ()=>{
        // localStorage.removeItem('jwtToken');
        navigate('/')
    }

    const handleLogout = ()=>{
        setIsloggedIn(false);
        localStorage.clear();
    }

    return(
        <div className="nav">
            <a href="" className="logo">
                University
            </a>
            <div className="navmenu">
                <NavLink to="/" className="home">
                    <span className="span">HOME</span>
                </NavLink>
                <NavLink to="/streams" className="home">
                    <span className="span">STREAMS</span>
                </NavLink>
                <NavLink to="/subject" className="home">
                    <span className="span">SUBJECT</span>
                </NavLink>
                <NavLink to="/marks" className="home">
                    <span className="span"> MARKS</span>
                </NavLink>
                <NavLink to="/allstudents" className="home">
                    <span className="span"> ALL STUDENTS</span>
                </NavLink>
                <NavLink to="/studentprofile" className="home">
                    <span className="span"> STUDENT PROFILE</span>
                </NavLink>
                <NavLink to="/studentprogress" className="home">
                    <span className="span"> STUDENT PROGRESS</span>
                </NavLink>
                <NavLink to="/login" className="home">
                    {isloggedIn? <span onClick={handleLogout} className="span">LOGOUT</span> : <span className="span"> LOGIN</span>}
                    
                </NavLink>
                <NavLink to="/signup" className="home">
                    <span className="span"> SIGNUP</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;