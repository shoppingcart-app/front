import './AdminNav.css';
import Aux from '../../hoc/Auxiliary.js';
import {Link } from 'react-router-dom';
    

import React, {​​​​​​​​ Component }​​​​​​​​ from'react'
import Form from'react-bootstrap/Form'
import Button from'react-bootstrap/Button';
import axios from'axios';
 
export default class AdminNav extends Component {​​​​​​​​
constructor(props){​​​​​​​​
super(props)

this.state = {​​​​​​​​
productId:'',
title :'',
price :'',
description :'',
imageUrl :''
        }​​​​​​​​ 

    }​​​​​​​​
onChangeproductId= (e) =>  {​​​​​​​​
this.setState({​​​​​​​​ productId :e.target.value}​​​​​​​​)
    }​​​​​​​​
 
onChangetitle = (e) =>  {​​​​​​​​
this.setState({​​​​​​​​ title :e.target.value}​​​​​​​​)
    }​​​​​​​​
 
onChangeprice = (e) =>  {​​​​​​​​
this.setState({​​​​​​​​ price :e.target.value}​​​​​​​​)
    }​​​​​​​​
 
onChangedescription = (e) =>  {​​​​​​​​
this.setState({​​​​​​​​ description :e.target.value}​​​​​​​​)
    }​​​​​​​​
 
onChangeimageUrl = (e) =>  {​​​​​​​​
this.setState({​​​​​​​​ imageUrl :e.target.value}​​​​​​​​)
    }​​​​​​​​
onSubmit = (e) => {​​​​​​​​
e.preventDefault()
constProductObj= {​​​​​​​​ 
productId:this.state.productId,
title:this.state.title,
price:this.state.price,
description:this.state.description,
imageUrl:this.state.imageUrl
        }​​​​​​​​
 
axios.post('http://localhost:4000/api/products',ProductObj)
        .then(res=>console.log(res.data));
 
alert(`Job successfully created!`)
this.setState({​​​​​​​​
productId:'',
title :'',
price :'',
description :'',
imageUrl :''
        }​​​​​​​​);
    }​​​​​​​​
 
render() {​​​​​​​​
return (


<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="productId">
                <Form.Label>Product Id</Form.Label>
                <Form.Control type="text" value={this.state.productId} onChange={this.onChangeproductId} />
                </Form.Group>
 
                <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={this.state.title} onChange={this.onChangetitle} />
                </Form.Group>
 
                <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={this.state.price} onChange={this.onChangeprice} />
                </Form.Group>
 
                <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={this.state.description} onChange={this.onChangedescription} />
                </Form.Group>
 
 


    

                <Form.Group controlId="imageUrl">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" value={this.state.imageUrl} onChange={this.onChangeimageUrl} />
                </Form.Group>
                </Form>
                <Button variant="success" size="lg" block="block" type="submit">Post Products</Button>
            </div>
        )
    }
}