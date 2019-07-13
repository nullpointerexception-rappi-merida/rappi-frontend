import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

function Routes(){
    return(
        <>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' component={Login}/>
        </>
    )
}

export default Routes;