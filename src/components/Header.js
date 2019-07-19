import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
	return (

		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
			<div className="sidebar-sticky">
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link className="nav-link active" to="/">
							Dashboard <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/logout">
							logout
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}


export default Header;
