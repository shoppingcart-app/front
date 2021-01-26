import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import './Cart.css';
import {decrement,increment,deleteBook,getCartItems,placeOrder } from '../UserFunctions/UserFunctions.js';
import { ToastContainer, toast } from 'react-toastify';
export default class Cart extends React.Component{
    state={
        searchItem:"",
        displayCart:false,
        cartItems:[],
        message:"",
        totalAmount:0,
        errors:{
            cardNumber:"",
            cvv:""
        },
        isValid:false
    };
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    componentDidMount(){
        getCartItems(this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                this.setState({cartItems:res.cartItems},()=>{
                    let priceArray=this.state.cartItems.map((cartItem)=>{
                        return cartItem.totalPrice;
                    });
                    let sum=priceArray.reduce((totalValue,currentValue)=>{
                        return totalValue+currentValue;
                    },0);
                    this.setState({totalAmount:sum});
                    
                });
            }else{
                    this.setState({message:res.message});   
            }
        }).catch(err=>this.setState({message:err.message}));
        
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    decrementHandler=(id)=>{
        decrement(id,this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                window.location.reload();
            }else{
                toast.error("Unable to decrement try again later!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                  }
                  );
                
            }
        }).catch((err=>this.setState({message:'Error in loading the cart'})));

    }
    incrementHandler= (event,id)=>{
        increment(id,this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                window.location.reload();
            }else{
                toast.error("Unable to increment try again later!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                  }
                  );
                
            }
        }).catch((err=>this.setState({message:'Error in loading the cart'})));

    }
    deletecartItem=(id)=>{
       deleteBook(id,this.auth.getUserName()).then((res)=>{    
        if(res.message===true){
            toast.info("Deleted successfully!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                onClose:() =>window.location.reload()
              }
              );
            }else{
                toast.error("Unable to delete try again later!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                  }
                  );
            }
        });
    }
    handleChange=(event)=>{
        const {id,value}= event.target;
        let errors = this.state.errors;
        switch(id){
            case 'cardNumber':
                errors.cardNumber=
                value.length < 16
                  ? 'Card Number should be of 16 digits length!'
                  : '';
                 
              break;
            case 'cvv':
                errors.cvv=
                value.length < 3
                ? 'CVV should be of 3 digits length!'
                :'';
                break;
            default:
                break;
        }this.setState(            
            {errors}
        );        

    }
    handlePayment=async(event)=>{
        event.preventDefault(); 
        for(const key in this.state.errors){
            if(this.state.errors[key]){
                await this.setState({isValid:true});

            }
        }
        if(this.state.isValid===true){
            alert("Valid card details");
            return false;
        }
        else{
            placeOrder({cartItems:this.state.cartItems,userName:this.auth.getUserName()}).then((res)=>{
                    if(res.message===true){
                        this.props.history.push('/orders');
                    }else{
                        toast.error("Could not place order", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: true,
                          }
                          );
                        return false;
                    }
                }).catch((err)=>{if(err){this.setState({message:"404 error"})}});
                
            }
              
        
    }
    render(){
        return(
            <Aux>
            <ToastContainer/>
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.cartItems.length}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 cart-col1-Card">
                        <h5 className="mt-3">Cart Items</h5>
                        <h5 className="mt-3">{this.state.message}</h5>
                        {this.state.cartItems.map((cartItem,index)=>{
                            return(
                                <div className="card flex-row w-75" key={index}> 
                                    <img src={`http://localhost:4000/${cartItem.book.imageURL}`} className="card-img cartimg" alt="..." height="200px" />
                                    <div className="card-body">
                                            <h5 className="card-title"><span>{cartItem.book.bookName}</span></h5>
                                            <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                                            <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    {cartItem.quantity===1?<button className="btn btn-danger" disabled>-</button> : <button className="input-group-text bg-danger" type="button" onClick={()=>this.decrementHandler(cartItem.book._id)}>-</button>}    
                                                </div>
                                                <input type="text" className="border-0 bg-light text-center"  style={{ width: "30px" }} value={cartItem.quantity} readOnly aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text bg-success" type="button" onClick={(e)=>this.incrementHandler(e,cartItem.book._id)}>+</span>                                
                                                </div>
                                            </div>
                                            
                                                <div className="d-flex align-items-center">
                                                    <p className="card-text pb-0 mt-2">
                                                        Total Amount:<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{cartItem.totalPrice}</span>
                                                    </p> 
                                                    <button className="btn btn-danger btn-sm ml-auto" type="button" onClick={()=>this.deletecartItem(cartItem.book._id)}><i className="fa fa-trash" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}}></i></button> 
                                                </div>
                                    </div>
                                </div> 
                        );
                        })}
                    </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="card w-75 mt-5">  
                <div className="card-body">
                    <h5 className="card-title">Cart Details</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Total Cart Items: {this.state.cartItems.length}</li>
                    <li className="list-group-item">Total Cart Amount: {this.state.totalAmount}</li>
                    {/* <li class="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                    {this.state.cartItems.length===0 ? <button className="btn btn-success form-control" disabled>Place order</button>:
                    <button className="btn btn-success form-control" type="button" data-toggle="modal" data-target="#modalLoginForm" data-backdrop="false">Place Order</button>}
                    <div className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold"><i className="fa fa-credit-card fa-lg"></i> &nbsp;Payment Details</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handlePayment}>
                            <div className="modal-body mx-3">
                                <div className="row mb-2"> 
                                        <input type="text" id="cardNumber" className="form-control" placeholder="Card Number : xxxx xxxx xxxx xxxx" required onChange={this.handleChange}/>
                                        <div className="float-right error">
                                            {this.state.errors.cardNumber.length > 0 && 
                                                <span className='error'>{this.state.errors.cardNumber}</span>}
                                        </div>
                                       
                                </div>        
    
                                    <div className="row mb-2">
                                        <div className="col-md-7 p-0 mb-1">
                                        <input type="text" id="expiryDate" className="form-control" placeholder="mm/yyyy" required/>
                                        </div>
                                        <div className="col-md-5 p-0">
                                        <input type="password" id="cvv" className="form-control" placeholder="CVV" required onChange={this.handleChange}/>
                                        </div>
                                        <div className="float-right error">
                                            {this.state.errors.cvv.length > 0 && 
                                                <span className='error'>{this.state.errors.cvv}</span>}
                                        </div>                            
                                    </div>
                                    <div className="row mb-2">
                                        <input type="text" id="cardHolderName" className="form-control validate" placeholder="Card Holder Name" required/>
                                    </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>  
</div>     
</Aux>
        )
    }

}

