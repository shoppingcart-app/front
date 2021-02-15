import React from 'react';
import {Route, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
import Cart from './Component/shoppingCart/Cart.js';
import Admin from './Component/Admin/Admin.js';
import AddAuthor from './Component/AdminAuthor/AddAuthor.js';
import AddCategory from './Component/AdminCategory/AddCategory.js';
import AddBook from './Component/AdminBooks/AddBook.js';
import ShowAuthors from './Component/AdminAuthor/ShowAuthor';
import ShowCategories from './Component/AdminCategory/showCategory';
import EditProfile from './Component/Profile/EditProfile';
import ViewBooks from './Component/AdminBooks/ViewBooks';
import BookDescription from './Component/Books/BooksDescription';
import Order from './Component/shoppingCart/Order';
import BookUpdate from './Component/AdminBooks/BookUpdate';

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
        <Route path="/admin" render={(props)=>this.auth.isAdminAuthenticated()?<Admin {...props}/>:<Redirect to='/login'/>} />
        <Route path="/editDetails" render={(props)=>this.auth.isAuthenticated() && <EditProfile {...props} userName={this.auth.getUserName()}/>}/>
        <Route path="/addAuthor" render={(props)=>this.auth.isAdminAuthenticated()?<AddAuthor {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addCategory" render={(props)=>this.auth.isAdminAuthenticated()?<AddCategory {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addBook" render={(props)=>this.auth.isAdminAuthenticated()?<AddBook {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/viewBooks" render={(props)=>this.auth.isAdminAuthenticated()?<ViewBooks {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showCategories" render={(props)=>this.auth.isAdminAuthenticated()?<ShowCategories {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showAuthors" render={(props)=>this.auth.isAdminAuthenticated()?<ShowAuthors {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/bookUpdate" render={(props)=>this.auth.isAdminAuthenticated()?<BookUpdate {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/bookDescription/:id" component={BookDescription}/>
        <Route render={()=><h1>Page not found</h1>}/>
      </Switch>
    </div>
  );
  }
}


