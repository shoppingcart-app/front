import React from 'react';
import Axios from 'axios';
import './Profile.css';
import Aux from '../../hoc/Auxiliary.js';
import {Link} from 'react-router-dom';
class Profile extends React.Component{
    state={
        details:[],
        message:""
    };
    componentDidMount(){
        Axios.get(`http://localhost:4000/user/getUser/${this.props.userName}`).then((res)=>{
            if(res.data){
                this.setState({details:res.data[0]});
            }else{
                this.setState({message:res.data.message});
            }
        });       
    }
    handleEdit =(id)=>{
        this.props.history.push('/editDetails');
      
    }
    render(){
        let data=Array(this.state.details);
        return(
            <Aux>              
            <Link to="/#" type="button" data-toggle="modal" data-target="#profileModal" data-backdrop="false">
            <i className="fa fa-user-circle-o" style={{fontSize: '30px',padding: '0px 4px 5px 0px',margin:'0px'}}></i>
            </Link>
            <div className="modal" id="profileModal" tabIndex="-1" role="dialog" aria-labelledby="profileModal" aria-hidden="true" style={{paddingRight: '0px !important',overflow: 'inherit'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">My Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Name: {data[0].firstName}{' '}{data[0].lastName}</p>
                        <p>User Name: {data[0].userName}</p>
                        <p>Phone Number: {data[0].phoneNumber}</p>
                        <p>Address: {data[0].address}{','}{data[0].state}{','}{data[0].city}{'.'}</p>
                        
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-success " onClick={()=>this.handleEdit(data[0]._id)}>Edit Details</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            </Aux>
        );
    }
}
export default Profile;