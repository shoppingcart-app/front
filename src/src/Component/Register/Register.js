import React from 'react';
import './Register.css';
import Auth from '../../Authentication/Auth';
import {Link} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = 
        {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            address: '',
            state: '',
            city: '',
            pincode:'',
            phnNo: '',
            errors : {
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                address: '',
                state: '',
                city: '',
                pincode:'',
                phnNo: '',
            },
            isValid: false,
            message:''
        }; 
        this.auth=new Auth();     
    }


    handleChange=(event)=>{
        const {id,value} =event.target;
        let errors = this.state.errors;
        switch (id) {
            case 'firstName': 
              errors.firstName = 
                value.length < 3
                  ? 'First Name must be at least 3 characters long!'
                  : '';
                
              break;
              case 'lastName': 
              errors.lastName = 
                value.length < 5
                  ? 'Last Name must be at least 5 characters long!'
                  : '';
                
              break;
            case 'userName': 
              errors.userName = 
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                  ? ''
                  : 'userName is not valid!';
                
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
                
              break;
            case 'address': 
              errors.address = 
                value.length < 8
                  ? 'address must be at least 8 characters long!'
                  : '';
                
              break;
              case 'pincode': 
              errors.pincode = 
                value.length < 6
                  ? 'Pincode must be atleast 6 Numbers long!'
                  : '';
                
              break;
            case 'phnNo': 
              errors.phnNo = 
                value.length < 10
                  ? 'Phone Number must be 10 Numbers long!'
                  : '';
                
              break;
            default:
              break;
          }
        this.setState(            
            {errors,[id] : value}
        );    
    }
    handleSubmit=async(event)=>{
        event.preventDefault();
        const {firstName,lastName,userName,password,phnNo,address,state,city,pincode}=this.state;
        const data={
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            password:password,
            phnNo:phnNo,
            address:address,
            state:state,
            city:city,
            pincode:pincode
        }

        for(const key in this.state.errors){
            if(this.state.errors[key]){
                await this.setState({isValid:true});
            }       
        }
        
        if(this.state.isValid === true){
            toast.error("Please enter field values correctly", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                // onClose:() =>window.location.reload()
              }
              );
            //alert("Please enter all the fields correctly");
            return false;
        }
        else{
            this.auth.registration(data).then((res)=>{
                if(res.message===true){
                    toast.info("Registered Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: true,
                        onClose:() =>this.props.history.push('/login')
                    }
                    );
                    
                }else{
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: true,
                        // onClose:() =>window.location.reload()
                      }
                      );
                    //alert(res.message);
                }
            });
        }
       
    
    }

    render(){
        const {errors} = this.state;
        return(
            <div className="container text-center">
            <ToastContainer/>
            <div className="projName text-center">
                <a href="/#"><strong>Book Store</strong></a>
            </div>
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    <div className="jumbotron" style={{width:"550px"}}>
                        <h4>SignUp</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName" className="float-left">First Name:</label>
                                <input id="firstName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="First Name" required/>
                                <div className="float-right error">
                                {errors.firstName.length > 0 && 
                                    <span className='error'>{errors.firstName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="float-left">Last Name:</label>
                                <input id="lastName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="Last Name" required/>
                                <div className="float-right error">
                                {errors.lastName.length > 0 && 
                                    <span className='error'>{errors.lastName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName" className="float-left">User Name(Email):</label>
                                <input id="userName" value={this.state.username} type="text" className="form-control" onChange={this.handleChange} placeholder="ex: abcdef@ghijk.xyz" required/>
                                <div className="float-right error">
                                {errors.userName.length > 0 && 
                                    <span className='error'>{errors.userName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="float-left">Password:</label>
                                <input id="password" value={this.state.password} type="password" className="form-control" onChange={this.handleChange} placeholder="Password" required/>
                                <div className="float-right error">
                                {errors.password.length > 0 && 
                                    <span className='error'>{errors.password}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="float-left">Address:</label>
                                <input id="address" value={this.state.address} type="text" className="form-control" onChange={this.handleChange} placeholder="Address" required/>
                                <div className="float-right error">
                                {errors.address.length > 0 && 
                                    <span className='error'>{errors.address}</span>}</div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="state" className="float-left">State:</label>
                                <select id="state" value= {this.state.state} onChange={this.handleChange} className="form-control" required>
                                    <option>---Select a State---</option>
                                    <option value = "Telangana">Telangana</option>
                                    <option value = "Andhra Pradesh">Andhra Pradesh</option>
                                    <option value = "Tamil Nadu">Tamil Nadu</option>
                                </select>                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="city" className="float-left">City:</label>
                                <select id="city" value= {this.state.city} onChange={this.handleChange} className="form-control" required>
                                    <option>---Select a City---</option>
                                    <option value = "Hyderabad">Hyderabad</option>
                                    <option value = "Vizaq">Vizaq</option>
                                    <option value = "Chennai">Chennai</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode" className="float-left">Pincode:</label>
                                <input id="pincode" value={this.state.pincode} type="number" className="form-control" onChange={this.handleChange} placeholder="PinCode" required/>
                                <div className="float-right error">
                                {errors.pincode.length > 0 && 
                                    <span className='error'>{errors.pincode}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phnNo" className="float-left">Phone Number:</label>
                                <input id="phnNo" value={this.state.phnNo} type="number" className="form-control" onChange={this.handleChange} placeholder="Phone Number" required/>
                                <div className="float-right error">
                                {errors.phnNo.length > 0 && 
                                    <span className='error'>{errors.phnNo}</span>}</div>
                            </div>                        
                            <input type="Submit" className="form-control btn-success"/> 
                            <small>By Submitting you agree to our Conditions of Use and Privacy Notice</small>
                        </form>
                    </div>
                </div>                
            </div>
            <h6><small>Already a registered USer?</small></h6>
            <Link to="/login" className="btn btn-success form-control sign">Login</Link>
        </div>
        )
    }
}

export default Register;