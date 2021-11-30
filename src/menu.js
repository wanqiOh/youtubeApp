import React from 'react';
import { NavLink } from "react-router-dom";
import './menu.css';

class Menu extends React.Component {
    render() { 
        return (
        <div>
            <ul>
                <li>&nbsp; <NavLink exact activeClassName="active" to="/home">Home</NavLink> &nbsp;</li>
                <li>&nbsp; <NavLink activeClassName="active" to="/youtube"> Youtube</NavLink>&nbsp;</li>
                <li>&nbsp; <NavLink activeClassName="active" to="/help"> Help</NavLink>&nbsp;</li>
            </ul>
        </div>
        );
    }
}
 
export default Menu;