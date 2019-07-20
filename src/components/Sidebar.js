import React from 'react';
import { Link } from 'react-router-dom';
import payload from '../utils/payload';


function Sidebar({ isCustomer }) {
	return (

        <>
        <ul className="sidebar navbar-nav p-0 m-0 h-100">
            {isCustomer ?
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-map-pin"></i>
                    <span>   Rappifavores</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create">
                    <i className="fas fa-truck"></i>
                    <span>   Nuevo Rappifavor</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-credit-card"></i>
                    <span>   Metodos de pago</span></Link>
                </li>    
            </>: <></>      
            }
            <li className="nav-item">
                <Link className="nav-link" to="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>   Logout</span></Link>
            </li>
            </ul>
        </>
    );
}
    
    
export default Sidebar;