import React from 'react';
import { Link } from 'react-router-dom';
import payload from '../utils/payload';

function Navbar(){
    return(
      
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Rappi MID</Link>
        <ul className="navbar-nav px-3">
          {
              payload().isAuthenticated ?(
                <>
                  <li className="nav-item text-nowrap">
                    <Link className="nav-link" to="/">{ payload().user.email} </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item text-nowrap">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )
            }
        </ul>
      </nav>
       
    )
}

export default Navbar;
