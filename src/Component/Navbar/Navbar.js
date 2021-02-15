import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Profile from '../Profile/Profile.js';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    render(){
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <div className="container-fluid">
                    {!this.auth.isAuthenticated() && <Link className="navbar-brand" to='/'><strong>Bookstore</strong></Link>}
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:"/Home/"+this.props.userName}}><strong>Book Store</strong></Link>}
                    {this.props.display &&<div className="col-lg-8 col-md-6 col-sm-6">
                        <form className="form-inline justify-content-center">
                            <input className="form-control mr-sm-2 w-50"type="text" placeholder="Search" aria-label="Search" onChange={this.props.search}/>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.click}>Search</button>
                        </form>
                    </div>}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {!this.auth.isAuthenticated() && <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login">LogIn</Link>
                            </li>}
                            {!this.auth.isAuthenticated()&&<li className="nav-item">
                                <Link className="nav-link text-dark" to="/register">SignUp</Link>
                            </li>}
                            {this.auth.isAuthenticated()&& <li className="nav-item"><Profile {...this.props} userName={this.props.userName}/></li>}
                            <li className="nav-item">
                                <Link to={{pathname:`/orders`}}><span className="nav-link text-dark"><i className="fa fa-truck"></i></span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to='/shoppingCart'><i className="fa fa-shopping-cart"><span className='badge badge-warning' id='lblCartCount'>{this.props.count}</span></i></Link>
                            </li>
                            {this.auth.isAuthenticated() && <li className="nav-item"><button className="btn btn-success" onClick={this.props.logout}>LogOut</button></li>}
                        </ul>
                        
                    </div>
                    </div>   
                </nav>
            </Aux>
        );
    }
    
}
export default Navbar;