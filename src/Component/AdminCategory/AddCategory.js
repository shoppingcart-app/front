import React, { Component } from "react";
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import AdminNav from '../Admin/AdminNav';
import Services from '../../Others/Services';
import Footer from '../../Others/Footer';
import Auth from '../../Authentication/Auth';
 class AddCategory extends Component{
     state={
        Category: '',
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
          axios.post(`http://localhost:4000/book/addCategory/${this.state.Category.toUpperCase()}`)
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
            Category: '',
        });
     };
render(){
    console.log('sate',this.state);
    return(
        <Aux>
       <AdminNav logoutHandler={this.logoutHandler} />
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="jumbotron text-center">
              <h4>Add Category</h4>
              <form onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="Category"
                  placeholder="Enter Category"
                  value={this.state.Category}
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
        <div className="container-fluid">
                <Services />
                <Footer /> 
        </div> 
        
        </Aux>
    )
  }
}
export default AddCategory;
