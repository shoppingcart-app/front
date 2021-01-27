import React from 'react';
import './Books.css';
export default class Books extends React.Component{
    render(){
        return(
                <div className="row">
                    {this.props.display? this.props.books.map((book,index)=>{
                      return( 
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard" key={book._id}>
                            <div className="card mt-4" id="card">
                                <img src={`http://localhost:4000/${book.imageURL}`} className="card-img-top" alt="..." height="150px"/>
                                <div className="card-body" key={index}>
                                    <h5 className="card-title" onClick={()=>{this.props.bookDescriptionHandler(book._id)}}>{book.bookName}</h5>
                                    <p className="card-text">Author:<span>{book.author}</span></p>
                                    <p className="card-text">Category:<span>{book.category}</span></p>
                                    <p className="card-text">Price:$<span className="text-primary font-weight-bold">{book.price}</span></p>
                                    <div className="card-footer center">
                                            <button  className="btn btn-danger btn-sm mr-1 ml-1" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                            <button className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                      );
                    }): this.props.searchResult.map((book,index)=>{
                        return( 
                          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard" key={book._id}>
                                <div className="card mt-4">
                                    <img src={`http://localhost:4000/${book.imageURL}`} className="card-img-top" alt="..." height="150px"/>
                                    <div className="card-body" key={index}>
                                        <h5 className="card-title"  onClick={()=>{this.props.bookDescriptionHandler(book._id)}}>{book.bookName}</h5>
                                        <p className="card-text">Author:<span>{book.author}</span></p>
                                        <p className="card-text">Category:<span>{book.category}</span></p>
                                        <p className="card-text">Price:$<span className="text-primary font-weight-bold">{book.price}</span></p>
                                        <div className="card-footer center">
                                                <button className="btn btn-danger btn-sm mr-1 ml-1" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                                <button  className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                        </div>
                                    </div>
                                </div>
                          </div>
                        )})}
                        {this.props.message &&<div className="col-lg-12">
                        <h5 className="mt-4">{this.props.message }</h5>
                        </div>}
                    </div>
        
        );
    }
}
