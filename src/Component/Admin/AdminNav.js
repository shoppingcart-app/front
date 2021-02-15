import React from 'react';
import './AdminNav.css';
import Aux from '../../hoc/Auxiliary.js';
import {Link } from 'react-router-dom';
class AdminNav extends React.Component{
    render(){
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light adminNav">
                    <Link className="navbar-brand" to="/admin"><strong>BookStore</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="bookDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-book" aria-hidden="true"></i>Books
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="bookDropdown">
                            <Link className="dropdown-item" to="addBook">Add Book</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/viewBooks">View Books</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="categoryDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-list" aria-hidden="true"></i>Category
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="categoryDropdown">
                            <Link className="dropdown-item" to="addCategory">Add Category</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/showCategories">View Categories</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="authorDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-user" aria-hidden="true"></i>Author
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="authorDropdown">
                            <Link className="dropdown-item" to="addAuthor">Add Author</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/showAuthors">View Authors</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-success" onClick={this.props.logoutHandler}>Logout</button>
                        </li>
                        </ul>
                    </div>
                </nav>
            </Aux>
        );
    }
}
export default AdminNav