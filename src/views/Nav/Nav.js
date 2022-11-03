import React from "react";
import {
    NavLink
  } from 'react-router-dom'
import './Nav.css'

function Nav () {
    return(
        <div className="topnav">
            <NavLink to="/" activeclassname="active">
                Home
            </NavLink>
            <NavLink to="/classs" activeclassname="active">
                Todo Class
            </NavLink>
            <NavLink to="/function" activeclassname="active">
                Todo Function 
            </NavLink>
        </div>
    )
}


export default Nav;