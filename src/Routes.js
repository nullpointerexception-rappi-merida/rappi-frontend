import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from './utils/IsAuthenticated';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';



function Logout(){
  localStorage.removeItem('token')
  return <Redirect to="/login" />
}

const SecureLogout = isAuthenticated(Logout);


function Routes(){
    return(
        <>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/logout' component={SecureLogout}/>  
        </>
    )
}

export default Routes;