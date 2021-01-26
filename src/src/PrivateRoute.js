import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from './Authentication/Auth.js';
const PrivateRoute = ({ component: Component,auth,...rest }) =>{
    return(
    <Route
      render={props =>
        auth=== true ? (
          <Component {...props} {...rest}/>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
  export default PrivateRoute;