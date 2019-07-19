import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import isAuthenticated from './utils/IsAuthenticated';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Create from './views/Create';
import DeliveryService from './views/DeliveryService';


function Logout() {
	localStorage.removeItem('token');
	return <Redirect to="/login"/>;
}

const SecureLogout = isAuthenticated(Logout);


function Routes() {
	return (
		<>
			<Route exact path='/' component={Home}/>
			<Route exact path="/delivery/:id" component={DeliveryService}/>
			<Route exact path="/create" component={Create}/>
			<Route exact path='/signup' component={Signup}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/logout' component={SecureLogout}/>
		</>
	);
}

export default Routes;
