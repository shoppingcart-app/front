import React from 'react';
import Axios from 'axios';
import {getBookById,getBookByCategory,getBookByAuthor,search} from '../UserFunctions/UserFunctions.js';
import Aux from '../../hoc/Auxiliary';
import Auth from '../../Authentication/Auth';
import Footer from '../../Others/Footer';
import Services from '../../Others/Services';
import LeftNavbar from '../Navbar/LeftNavbar';
import Navbar from '../Navbar/Navbar';
import Books from '../Books/Books';
import './BookDescription.css';
export default class BookDescription extends React.Component{
    state={searchItem:"",books:[],display:true,result:[],message:"",displaySearch:true,count:0,bookById:{}};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
        this.setState({count:0}) ;
    }
    resetHandler=()=>{
        this.setState({result:[],message:""});
    }
    changeHandler=(event)=>{
        event.preventDefault();
        this.setState({searchItem:event.target.value});
    }
    
    addToCartHandler=(id)=>{
        Axios.post(`cart/addBook?id=${id}&userName=${this.auth.getUserName()}`).then((res)=>{    
            if(res.data.message===true){
                    this.props.history.push(`/shoppingcart`);               
                }else{
                    this.setState({message: `Unable to add to cart please try again later`});
                }
            });
    }

    getSearchResult=(event)=>{
        event.preventDefault();
        this.resetHandler();
        this.setState({display:false},()=>{
            search(this.state.searchItem).then((searchResult)=>
                        {
                            if(searchResult.length>0){
                                this.setState({result:searchResult});
                            }else{
                                this.setState({message:`No book found with ${this.state.searchItem} name`});
                            }
            }).catch(err=>{this.setState({message:"404 error"})});
        }); 
    }
    getBooksByCategory=(category)=>{
        this.resetHandler();
        this.setState({display:false},()=>{
            getBookByCategory(category).then((res)=>{
                if(res.message===true){
                    this.setState({result:res.books});
                }else{
                    this.setState({message:res.message});
                }
            }).catch(err=> this.setState({message:"404 Error"}));
        });
    }
    getBooksByAuthor=(author)=>{
        this.resetHandler();
       this.setState({display:false},()=>{
        getBookByAuthor(author).then((res)=>{
            if(res.message===true){
                this.setState({result:res.books});
            }else{
                this.setState({message:res.message});
            }
        }).catch(err=>this.setState({message:"404 Error"}));
       });
    }
    componentDidMount(){
        getBookById(this.props.match.params.id).then((res)=>{
            if(res.message===true){
                this.setState({bookById:res.book});
            }else{
                this.setState({message:res.message});
            }
            
        }).catch(err=>this.setState({message:err.message}));
    }
    
    formatData=(publisheddate)=>{
        if(publisheddate!==undefined){
        var date=new Date(publisheddate);
        const currentMonth = date.getMonth();
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
        }else{
            return null;
        }
    }
    render(){
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} display={this.state.displaySearch} logout={()=>{this.logoutHandler()}} search={(e)=>this.changeHandler(e)} click={(e)=>this.getSearchResult(e)} userName={this.auth.getUserName()} count={this.state.count}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className=" col-lg-2 col-md-3 col-sm-4 bg-white ml-lg-2 ml-md-0">
                        <LeftNavbar getBookByCategory={this.getBooksByCategory} getBookByAuthor={this.getBooksByAuthor}/>                    
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-7">
                        {this.state.display && (<div className="d-flex justify-content-even align-items-top">
                            <img className="p-3" src={`http://localhost:4000/${this.state.bookById.imageURL}`} alt="..." width="350px" height="400px"/>
                            <div className='p-3'>
                                <h4 className="headerstyle">{this.state.bookById.bookName}</h4>
                                <hr></hr>
                                <p>Category:<span className="parastyle">{" "+this.state.bookById.category}</span></p>
                                <p>Author:<span className="parastyle">{" "+this.state.bookById.author}</span></p>
                                <p>Price:<span className="parastyle">{" "+this.state.bookById.price}</span></p>
                                <p>PublishedDate:<span className="parastyle">{" "+this.formatData(this.state.bookById.publishedDate)}</span></p>
                                <hr></hr>
                                <h5>About Item:</h5>
                                <p className="text-justify">{this.state.bookById.description}</p>
                                <div className="d-flex">
                                    <button className="btn btn-danger mr-2" onClick={()=>this.addToCartHandler(this.state.bookById._id)}>Add to cart</button>
                                    <button className="btn btn-success mr-2" onClick={()=>this.addToCartHandler(this.state.bookById._id)}>Buy Now</button>
                                </div>
                            </div>
                        </div>)}
                        <Books {...this.props} books={this.state.books} searchResult={this.state.result} message={this.state.message} display={this.state.display} addToCart={this.addToCartHandler}/>

                    </div>
                </div>
            </div> 
            <div className="container-fluid">
                <Services />
                <Footer /> 
            </div>  
            </Aux> 
        )
    }
}