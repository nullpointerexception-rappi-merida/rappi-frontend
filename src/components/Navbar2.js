import React from 'react';
import { Link } from 'react-router-dom';
import payload from '../utils/payload';

function Navbar(){
    return(
        <>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <Link className="navbar-brand mr-1" to="/" >Rappifavores</Link>

            <ul className="navbar-nav ml-auto ml-md-0">
                {payload().isAuthenticated ?(
                    <>
                    <li className="nav-item no-arrow mx-1">
                        <Link to="/" className="nav-link" >{ payload().user.email} </Link>
                    </li>
                    </>
                ) : (
                    <li className="nav-item dropdown no-arrow mx-1">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
        </>
    )
};

export default Navbar;
