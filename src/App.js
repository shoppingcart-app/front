import React from 'react';
import {Route, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
import Cart from './Component/shoppingCart/Cart.js';
import EditProfile from './Component/Profile/EditProfile';
import BookDescription from './Component/Books/BooksDescription';
import Order from './Component/shoppingCart/Order';

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
        <Route path="/register"  component={Register} />
        <Route path="/" exact component={Home}/>
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/shoppingCart" render={(props)=>this.auth.isAuthenticated()?<Cart {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/orders" render={(props)=>this.auth.isAuthenticated()?<Order {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/editDetails" render={(props)=>this.auth.isAuthenticated() && <EditProfile {...props} userName={this.auth.getUserName()}/>}/>
        <Route path="/bookDescription/:id" component={BookDescription}/>
        <Route render={()=><h1>Page not found</h1>}/>
      </Switch>
    </div>
  );
  }
}


