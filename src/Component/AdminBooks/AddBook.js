import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AddBook.css';
import AdminNav from '../Admin/AdminNav';
import Services from '../../Others/Services';
import Footer from '../../Others/Footer';
import {addBook,getCategories,getAuthors} from '../UserFunctions/UserFunctions';
import Auth from '../../Authentication/Auth';
import { ToastContainer, toast } from 'react-toastify';
class AddBook extends React.Component{
    state={
        BookTitle: '',
        AuthorName: '',
        Category: '',
        Price: '',
        PublishedDate:'',
        ImageURL:'',
        description:'',
        message:'',
        categories:[],
        authors:[],
        fileTypeError:''
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
     handleChangeFile=(e)=>{
      const {name,files}=e.target;
      let filetype=files[0].name.split('.').pop();
      if(filetype==='jpg'||filetype==='png'||filetype==='jpeg'||filetype==='jfif'){       
          this.setState({
            [name]:files[0]
          });
      }else{
        this.setState({fileTypeError:"Only jpg,png,jpeg,jfif are accepted"});
      }
    }
     submit=(event)=>{
         event.preventDefault();
         if(this.state.fileTypeError){
          toast.error("Enter valid files", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
            onClose:() =>window.location.reload()
          }
          );
           return false;
         }else{
            const formData= new FormData();
            formData.append('bookName',this.state.BookTitle);
            formData.append('author',this.state.AuthorName);
            formData.append('category',this.state.Category);
            formData.append('price',this.state.Price);
            formData.append('date',this.state.PublishedDate);
            formData.append('description',this.state.description);
            formData.append('imageURL',this.state.ImageURL);
            /*const payload={
                bookName: this.state.BookTitle,
                author: this.state.AuthorName,
                category: this.state.Category,
                price: this.state.Price,
                date:this.state.PublishedDate,
                imageURL:this.state.ImageURL,
                description:this.state.description
                //ReleaseDate:this.state.ReleaseDate
            };*/
            this.resetUserInputs();
            addBook(formData).then((res)=>{
                if(res.message===true){
                  this.setState({message:"Added"})
                }else{
                  this.setState({message:res.message});
                }
            }).catch(err=>{this.setState({message:err.messsage})})
        }
     }
     resetUserInputs=()=>{
         this.setState({
            BookTitle: '',
            AuthorName: '',
            Category: '',
            Price: '',
            PublishedDate:'',
            ImageURL:'',
            description:''
         });
     };
     componentDidMount(){
          getCategories().then((res)=>{
            if(res.message===true){
                this.setState({categories:res.categories});
            }else{
              toast.error("Add categories to add book", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true
              })
            }
          }).catch(err=>{if(err) alert(err.message)});
        getAuthors().then((res)=>{
          if(res.message===true){
              this.setState({authors:res.authors});
          }else{
            toast.error("Add Authors to add book", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: true
            })
          }
          }).catch(err=>{if(err) alert("404 error")});
     }
render(){
        return(
       <Aux>
         <ToastContainer/>
        <div className="container-fluid">
            <AdminNav logoutHandler={this.logoutHandler}/>
        </div>
        <div className="container">
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          {this.state.categories.length>0 && this.state.authors.length>0 &&<div className="jumbotron text-center">
              <h4>Add Book</h4>
              <form  onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">BookTitle:</label>
                <input
                  type="text"
                  className="form-control "
                  name="BookTitle"
                  placeholder="Enter Book Title"
                  onChange={this.handleChange}
                  value={this.state.BookTitle}
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="AuthorName" className="float-sm-left">Author:</label>
                <select className="custom-select" id="AuthorName" name="AuthorName" required onChange={this.handleChange}>
                  <option>Select an author</option>
                  {this.state.authors.map((author)=>
                    <option value={author.name} key={author._id}>{author.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
              <label htmlFor="Category" className="float-sm-left">Category:</label>
              <select className="custom-select" id="Category" name="Category" required onChange={this.handleChange}>
                  <option>Select an category</option>
                  {this.state.categories.map((category)=>
                    <option value={category.name} key={category._id}>{category.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Price"
                  placeholder="Price"
                  onChange={this.handleChange}
                  value={this.state.Price}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">PublishedDate:</label>
                <input
                  type="text"
                  className="form-control"
                  name="PublishedDate"
                  placeholder="YYYY-MM-DD"
                  value={this.state.PublishedDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Image URL:</label>
                <input
                  type="file"
                  className="form-control"
                  name="ImageURL"
                  placeholder="URL"
                  onChange={this.handleChangeFile}
                  required
                />
                {this.state.fileTypeError && <span className='error text-right'>{this.state.fileTypeError}</span>}
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  rows="3"
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
          </div>}
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
export default AddBook