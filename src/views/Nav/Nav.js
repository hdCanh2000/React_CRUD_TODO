import React from "react";
import {
    NavLink, Link
  } from 'react-router-dom'
import './Nav.css'

function Nav () {
    return(
        <div className="topnav">
                <NavLink to="/" activeclassname="active">
                    Home
                </NavLink>
                <NavLink to="/class" activeclassname="active">
                    Todo Class
                </NavLink>
                <NavLink to="/function" activeclassname="active">
                    Todo Function 
                </NavLink>
                <NavLink to="/contact" activeclassname="active">
                    Contact
                </NavLink>
                <NavLink to="/about" activeclassname="active">
                    About
                </NavLink>
        </div>
    )
}


export default Nav;