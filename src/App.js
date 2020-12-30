import React from 'react';
import {Route, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Auth from './Authentication/Auth.js';
import Home from './Component/Home/Home';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render(){

  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/"  component={Register} />
        <Route path="/Home"  component={Home} />

        <Route render={()=><h1>Page not found</h1>}/>
      </Switch>
    </div>
  );
  }
}


