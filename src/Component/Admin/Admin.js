import React from 'react';
import AdminNav from './AdminNav';
import Banner from '../Banner/Banner';
import Services from '../../Others/Services';
import Footer from '../../Others/Footer';
import "./Admin.css";
import Auth from '../../Authentication/Auth';
export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    render(){
        return(
            <>
            <div className="container-relative">
            <AdminNav logoutHandler={this.logoutHandler} />
            </div>
            <div className="marqq"><h2><p>This is Admin Home</p></h2></div>
            <div className="container-fluid mr-3 ml-3">
            <Banner />
            </div>
            <div className="container-fluid">
                <Services />
                <Footer /> 
            </div>
            </>
        )
    }

}
