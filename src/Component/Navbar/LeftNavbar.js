import React from 'react';
import './LeftNavbar.css';
import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxiliary.js'
import {getCategories,getAuthors} from '../UserFunctions/UserFunctions.js';
class LeftNavbar extends React.Component{
    state={categories:[],message:'',authors:[]};
    componentDidMount(){
        getCategories().then((res)=>{
            if(res.message===true){
                this.setState({categories:res.categories});
            }else{
                this.setState({message:res.message});
            }
        }).catch(err=>this.setState({message:"404 Error"}));
        getAuthors().then((res)=>{
            if(res.message===true){
                this.setState({authors:res.authors});
            }else{
                this.setState({message:res.message});
            }
        }).catch(err=>this.setState({message:"404 Error"}));
    }
    render(){
        return(
            <Aux>
            <div className="categories">
            <h1 className="fontstyle text-dark">Categories</h1>
            <nav className="navbar">
                {this.state.message}
                    <ul className="navbar-nav w-100 category-size">
                        {this.state.categories.map((category)=>{
                            return(
                                <li className="nav-item text-center" key={category._id}>
                                <Link className="nav-link text-dark" to="#" onClick={()=>this.props.getBookByCategory(category.name)}>{category.name}</Link>
                                </li>
                            );
                        })}
                        
                    </ul>
            </nav>
            </div>
            <div className="authors mb-2">
            <h1 className="fontstyle text-dark">Authors</h1>
            <nav className="navbar">
            {this.state.message}
                    <ul className="navbar-nav w-100 author-size">
                    {this.state.authors.map((author)=>{
                            return(
                                <li className="nav-item text-center" key={author._id}>
                                <Link className="nav-link text-dark" to="#" onClick={()=>this.props.getBookByAuthor(author.name)}>{author.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
            </nav>
            </div>
            </Aux>
        );
    }
}
export default LeftNavbar