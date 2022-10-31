import React from "react";
import {
    NavLink
  } from 'react-router-dom'
import './Nav.css'

class Nav extends React.Component {
    

    render() {
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
            </div>
        )
    }
}

export default Nav;