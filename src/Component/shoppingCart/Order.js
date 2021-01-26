import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import {orders} from '../UserFunctions/UserFunctions';
import {Link} from 'react-router-dom';
import './Order.css';
export default class Orders extends React.Component{
    state={displayCart:false,result:[],message:""};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    
    logoutHandler=()=>{
        this.auth.logout();
    }
    resetHandler=()=>{
        this.setState({result:[],message:""});
    }
    componentDidMount(){
        orders(this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                let orders=[];
                res.orders.map((order)=>{
                    order.orderedItems.map((orderedItem)=>{
                        orders.push(orderedItem);
                        return 0;
                    });
                    return 0;
                });
                this.setState({result:orders});
            }else{
                this.setState({message:"Place orders to view order list"});
            }
            
        }).catch(err=>this.setState({message:"404 error"}));

    }
    render(){    
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}}/>
            </div>
            <div className="container">
                <div className="mt-5">
                {!this.state.message && <h3 className="text-dark"><span >My Orders</span></h3>}
                {this.state.message&&<h5 className="text-dark">{this.state.message}</h5>}
                                {this.state.result.map((orderedItem,index)=>{
                                    return(
                                    <Aux key={index}>
                                    <div className="row mt-3 font-custom-style" style={{border: "1px #ddd solid"}}>
                                        <div className="col-12">
                                            <div className="row  row-header">
                                                <div className="col">
                                                    <ul className="list-group list-group-horizontal">
                                                        <li className="list-group-item"><div className="row">ORDER PLACED</div>
                                                        </li>
                                                    <li className="list-group-item">
                                                        <div className="row">TOTAL</div>
                                                        <div className="row">{orderedItem.totalPrice}</div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">SHIP TO </div>
                                                        <div className="row"><span className="userName-color">{this.auth.getUserName()}</span></div>
                                                    </li>
                                                    </ul>
                                                </div>
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 p-3">
                                                <h1 style={{fontSize:"20px"}}>Order Placed</h1>
                                                    <div className="row">
                                                    <div className="col-12">
                                                        <p className="m-0 para-style">Package will be handed directly to the customer.</p>
                                                    </div>
                                                    </div>
                                            
                                                    <div className="row">
                                                    <div className="col-12">
                                                        <p className="m-0 para-style">Signed by:{this.auth.getUserName()}</p>
                                                    </div>
                                                    </div>
                                                
                                                <div className="row m-3 bookDetails">
                                                    <div className="col-lg-7 col-md-7 col-sm-7">
                                                        <div className="d-flex justify-content-start">
                                                            <img src={`http://localhost:4000/${orderedItem.book.imageURL}`} alt="..." height="100px" width="100px" className="border-secondary m-0"/>
                                                            <div className="ml-3 bookDetails">
                                                                <h5>{orderedItem.book.bookName}</h5>
                                                                <p>Author:<span className="author-color">{orderedItem.book.author}</span></p>
                                                                <p>Category:{orderedItem.book.category}</p>
                                                                <p>Price:<span className="price-color">{orderedItem.book.price}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5 col-sm-5">
                                                        <div className="row">
                                                            <span className="btn-color"><Link to="#" role="button" className="m-3">Write Product Review</Link></span>
                                                        </div>
                                                        <div className="row">
                                                            <span className="btn-color"><Link to="#" role="button" className="m-3">Rate Product</Link></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>    
                                           
                                    </div>   
                                    </Aux>
                                );
                            })}
                    </div>
                </div>    
            </Aux>
        )
    }

}

