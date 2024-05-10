import React from "react";
import './navbar.css'
import {useNavigate,NavLink} from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Navbar = ()=>{
    const navigate = useNavigate();

    const handleSignout = ()=>{
        // localStorage.removeItem('jwtToken');
        navigate('/')
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
                <NavLink to="/login" className="home">
                    <span className="span"> LOGIN</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;