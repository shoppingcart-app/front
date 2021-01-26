import React from 'react';
import './Services.css';
class Services extends React.Component{
    render(){
    return(
            <div className="row p-4 " id="services">
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="row">
                    <div className="col-lg-3 pt-2">
                        <i className="fa fa-car text-danger"></i>  
                    </div>
                        <div className="col-lg-9">
                            <h6>Free Shipping</h6>
                            <p>For all oder over $99</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="row">
                    <div className="col-lg-3 pt-2">
                        <i className="fa fa-money text-danger"></i>  
                        </div>
                        <div className="col-lg-9">
                        <h6>Money Back Guarantee</h6>
                        <p>If good have Problems</p>
                        </div>
                    </div>
                </div>
            <div className="col-lg-3 col-md-4 col-sm-6 ">
                <div className="row">
                    <div className="col-lg-3 pt-2">
                    <i className="fa fa-support text-danger"></i>  
                    </div>
                    <div className="col-lg-9">
                    <h6>Online Support 24/7</h6>
                    <p>Dedicated support</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 ">
            <div className="row">
                    <div className="col-lg-3 pt-1">
                        <i className="fa fa-headphones text-danger"></i>  
                        </div>
                        <div className="col-lg-9">
                        <h6>Payment Secure</h6>
                        <p>100% secure payment</p>
                        </div>
                    </div>
                </div>
            </div>
                
    )
    }
}
export default Services;