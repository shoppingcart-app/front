import React from 'react';
import {getAuthors,deleteAuthor} from '../UserFunctions/UserFunctions';
import AdminNav from '../Admin/AdminNav';
import Footer from '../../Others/Footer';
import Services from '../../Others/Services';
import Aux from '../../hoc/Auxiliary';
import Auth from '../../Authentication/Auth';
import './showAuthor.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class ShowAuthors extends React.Component{
    state={authors:[],message:''};
    componentDidMount(){
        getAuthors().then((res)=>{
            if(res.message===true){
                this.setState({authors:res.authors});
            }else {
                
             this.setState({message: res.message})
            // alert(res.message);
        }
        }).catch(err=>{if(err) 
           this.setState({message:err.message});
        // alert("404 error")
        });
    }
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
      confimationHandler = (id) =>{
        toast(
            <>            
            <p className="text-dark pt-3 text-center">Do you want to delete it?</p>
            <div className="pull-right pt-0 mt-0">
            <button className="btn btn-success btn-sm mr-2" onClick={()=>this.deleteHandler(id)}>Yes</button>
            <button className="btn btn-danger btn-sm">No</button>
            </div>
            </>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            // onClose:() =>window.location.reload()
          }
          );
    }
    deleteHandler=(id)=>{
        deleteAuthor(id).then((res)=>{
            if(res.message===true){
                toast.info("Deleted Successfully !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    onClose:() =>window.location.reload()
                  }
                  );
                // alert("Deleted Successfully");
                // window.location.reload();
            }else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    onClose:() =>window.location.reload()
                  }
                  );
            //    alert(res.message);
            }
        }).catch(err=>{if(err) 
            toast.error("404 error !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                onClose:() =>window.location.reload()
              }
              );
            // alert("404 error")
        });
    }
    render(){
        return(
            <Aux>
                <ToastContainer/>
                <div className="container-fluid">
                    <AdminNav logoutHandler={this.logoutHandler}/>
                </div>
                <div className="container">
                    <div className="jumbotron w-75  mt-4 mb-4 border-0">
                    {!this.state.message&&<h1 style={{fontSize:"25px"}}>List of Authors</h1>}
                    {this.state.message && <h5>{this.state.message}</h5>}
                    <table className="table showAuthors">
                    {this.state.authors.length>0 &&
                        <Aux> 
                        <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">ContactNo</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.authors.map((author)=>{
                            return(
                                <tr>
                                    <td>{author.name}</td>
                                    <td>{author.emailId}</td>
                                    <td>{author.contactNo}</td>
                                    <td>{author.address}</td>
                                    <td><i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.confimationHandler(author._id)}></i> </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </Aux>
                    }
                     </table>
                     </div>    
                        
                    
                </div>
                <div className="container-fluid">
                    <Services/>
                    <Footer/>
                </div>
            </Aux>
        );
    }
} 