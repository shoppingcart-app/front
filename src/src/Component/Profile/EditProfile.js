import React from 'react';
// import './Register.css';
import Navbar from '../Navbar/Navbar';
import Auth from '../../Authentication/Auth'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import Services from '../../Others/Services.js';
import Footer from '../../Others/Footer';
import {getCartItems} from '../UserFunctions/UserFunctions.js';
class EditProfile extends React.Component{
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
            // details:[],
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
            message:'',
            count: 0
        }; 
        this.auth=new Auth(this.props.history);     
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    componentDidMount(){
        Axios.get(`http://localhost:4000/user/getUser/${this.props.userName}`).then((res)=>{
            console.log(res.data)
            if(res.data){
                this.setState({
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    userName: res.data[0].userName,
                    password:res.data[0].password,
                    phnNo:res.data[0].phnNo,
                    address:res.data[0].address,
                    state:res.data[0].state,
                    city:res.data[0].city,
                    pincode:res.data[0].pincode
                   
                });
            }else{
                this.setState({message:res.data.message});
            }
        });
        if(this.auth.getUserName()){
            getCartItems(this.auth.getUserName()).then((res)=>{
                if(res.cartItems){
                    this.setState({count:res.cartItems.length});
                }
            }).catch(err=>{this.setState({message:"404 error"})});
        }        
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
            // alert("Please enter all the fields correctly");
        }
        else{
            Axios.put(`http://localhost:4000/user/updateDetails`,data).then((res)=>{
            console.log(res.data)
            if(res.data.success){
                this.setState({message:res.data.message});
                toast.info(this.state.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                   
                  }
                  );
                //   alert(this.state.message)
            }else{
                this.setState({message:res.data.message});
                toast.info(this.state.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                    // onClose:() =>window.location.reload()
                  }
                  );
                // alert(this.state.message)
            }
        });        
        }      
    }

    render(){
        const {errors} = this.state;
        return(
            <>
                <ToastContainer />
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.count}/>
            </div>
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    <div className="jumbotron mt-5 mb-5" style={{width:"550px"}}>
                        <h4>Edit Profile</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                            <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="firstName" className="float-left">First Name:</label>
                                <input id="firstName" value={this.state.firstName} type="text" className="form-control" onChange={this.handleChange} placeholder="First Name" required contentEditable="true"/>
                                <div className="float-right error">
                                {errors.firstName.length > 0 && 
                                    <span className='error'>{errors.firstName}</span>}</div>
                            </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="lastName" className="float-left">Last Name:</label>
                                <input id="lastName" value={this.state.lastName} type="text" className="form-control" onChange={this.handleChange} placeholder="Last Name" required/>
                                <div className="float-right error">
                                {errors.lastName.length > 0 && 
                                    <span className='error'>{errors.lastName}</span>}</div>
                            </div>
                            </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName" className="float-left">User Name(Email):</label>
                                <input id="userName" value={this.state.userName} type="text" className="form-control" onChange={this.handleChange} placeholder="ex: abcdef@ghijk.xyz" required readOnly/>
                                <div className="float-right error">
                                {errors.userName.length > 0 && 
                                    <span className='error'>{errors.userName}</span>}</div>
                            </div>
                            <div className="row">
                            <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="address" className="float-left">Address:</label>
                                <input id="address" value={this.state.address} type="text" className="form-control" onChange={this.handleChange} placeholder="Address" required/>
                                <div className="float-right error">
                                {errors.address.length > 0 && 
                                    <span className='error'>{errors.address}</span>}</div>
                            </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="pincode" className="float-left">Pincode:</label>
                                <input id="pincode" value={this.state.pincode} type="number" className="form-control" onChange={this.handleChange} placeholder="PinCode" required/>
                                <div className="float-right error">
                                {errors.pincode.length > 0 && 
                                    <span className='error'>{errors.pincode}</span>}</div>
                            </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-6">
                            <div className="form-group">
                            <label htmlFor="state" className="float-left">State:</label>
                                <select id="state" value= {this.state.state} onChange={this.handleChange} className="form-control" required>
                                    <option>---Select a State---</option>
                                    <option value = "Telangana">Telangana</option>
                                    <option value = "Andhra Pradesh">Andhra Pradesh</option>
                                    <option value = "Tamil Nadu">Tamil Nadu</option>
                                </select>                                
                            </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                            <label htmlFor="city" className="float-left">City:</label>
                                <select id="city" value= {this.state.city} onChange={this.handleChange} className="form-control" required>
                                    <option>---Select a City---</option>
                                    <option value = "Hyderabad">Hyderabad</option>
                                    <option value = "Vizaq">Vizaq</option>
                                    <option value = "Chennai">Chennai</option>
                                </select>
                            </div>
                            </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phnNo" className="float-left">Phone Number:</label>
                                <input id="phnNo" value={this.state.phnNo} type="number" className="form-control" onChange={this.handleChange} placeholder="Phone Number" required/>
                                <div className="float-right error">
                                {errors.phnNo.length > 0 && 
                                    <span className='error'>{errors.phnNo}</span>}</div>
                            </div>                        
                            <input type="Submit" className="form-control btn-success" value="Update Details" />
                        </form>
                    </div>
                </div>                
            </div>
       
        <div className="container-fluid">
                <Services />
                <Footer /> 
        </div>    
        </>
        )
    }
}

export default EditProfile
