import React from 'react';
import './Login.css'
import Auth from '../../Authentication/Auth';
import {Link} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
        userName: "",
        password: "" ,
        errors:{
            email: '',
            password: '',
        },
        isValid: false,
        message:''
        };
        this.auth=new Auth(this.props.history);
    }


    handleChange = (event) =>{       
        const {id, value} = event.target;
        let errors = this.state.errors;
        switch (id) {            
            case 'userName': 
              errors.email = 
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                  ? ''
                  : 'UserName is not valid!';
                 
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
                  
              break;
            default:
              break;
          }
        this.setState(            
            {errors,[id] : value}
        );        
    }


    handleSubmit = async(event)=>{
        event.preventDefault();
        const {userName,password}=this.state;
        const data={
            userName:userName,
            password:password
        };
        if(userName === "admin@login.com" && password === "admin123"){
            this.auth.adminSetSession();
            this.props.history.push("/admin");
        }else{
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
            //alert("Enter field values correctly");
            return false;
        }
        else{
            this.auth.login(data).then((res)=>{
                if(res.message===true){
                    this.props.history.push('/Home');
                }else{
                    this.setState({message:res.message});
                }
            });
        }
    }
    }


    render(){
        const {errors,message} = this.state;    
    return(
        <div className="container text-center">
            <ToastContainer />
            <div className="projName text-center">
                <a href="/#"><strong>Book Store</strong></a>
            </div>
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    <div className="jumbotron">
                        <h4>Login</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName" className="float-left">User Name(email):</label>
                                <input id="userName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="ex:abcdef@ghi.xyz" required/>
                                <div className="float-right error">
                                {errors.email.length > 0 && 
                                    <span className='error'>{errors.email}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="float-left">Password:</label>
                                <input id="password" value={this.state.password} type="password" className="form-control" onChange={this.handleChange} placeholder="Password" required/>  
                                <div className="float-right error">
                                {errors.password.length > 0 && 
                                    <span className='error'>{errors.password}</span>}</div>
                            </div>                        
                            <input type="Submit" className="form-control btn-success"/> 
                            <small>By Submitting you agree to our Conditions of Use and Privacy Notice</small>
                            <div>
                                {this.state.message && <span className='error'>{message}</span>}
                            </div>
                        </form>
                    </div>
                </div>                
            </div>
            <h6><small>New to Book Store?</small></h6>
            <Link to="/register" className="btn btn-success form-control sign">SignUp</Link>
        </div>
    );
}

}
export default Login;
