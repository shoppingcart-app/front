import React, { Component } from "react";
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import AdminNav from '../Admin/AdminNav';
import Services from '../../Others/Services';
import Footer from '../../Others/Footer';
import Auth from '../../Authentication/Auth';
 class AddAuthor extends Component{
     state={
        AuthorName: '',
        ContactNo: '',
        EmailID: '',
        Address:'',
        message:''
     };
     constructor(props){
       super(props);
       this.auth=new Auth(this.props.history);
     }
     logoutHandler=()=>{
       this.auth.adminLogout();
     }
     handleChange=(e)=>{
        const {name,value}=e.target;
        this.setState({
            [name]:value
        });
     }
     submit=(event)=>{
         event.preventDefault();
         const payload={
            name: this.state.AuthorName.toUpperCase(),
            contactNo: this.state.ContactNo,
            emailId: this.state.EmailID,
            address:this.state.Address
         };
         axios.post(`http://localhost:4000/book/addAuthor`,payload)
         .then((res) => {
           this.resetUserInputs();
            if(res.data.message===true){
               this.setState({message:"Added"});
            }else{
               this.setState({message:res.data.message}); 
            }
         })
         .catch((err) => {
             if(err)
               this.setState({message:"404 error"});
         })
     }
     resetUserInputs=()=>{
         this.setState({
            AuthorName: '',
            ContactNo: '',
            EmailID: '',
            Address:'',
         });
     };
render(){
    return(
        <Aux>
        <div className="container-fluid">
            <AdminNav logoutHandler={this.logoutHandler}/>
        </div>
        <div className="container">
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="jumbotron text-center">
              <h4>Add Author</h4>
              <form onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">Author Name:</label>
                <input
                  type="text"
                  className="form-control "
                  name="AuthorName"
                  placeholder="Enter Author Name"
                  value={this.state.AuthorName}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">Contact No:</label>
                <input
                  type="Number"
                  className="form-control"
                  name="ContactNo"
                  placeholder="Enter Contact Number"
                  value={this.state.ContactNo}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Email Id:</label>
                <input
                  type="email"
                  className="form-control"
                  name="EmailID"
                  placeholder="Enter email Id"
                  value={this.state.EmailID}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  placeholder="Address"
                  value={this.state.Address}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="form-control btn-success"
              >
                Add
              </button>
              <h5 className="mt-2" style={{fontSize:"16px",color:'red'}}>{this.state.message}</h5>
            </form>
          </div>
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
export default AddAuthor;
