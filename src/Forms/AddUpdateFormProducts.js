import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class AddUpdateFormProduct extends React.Component {
  state = {
    id: 0,
    name: '',
    brand_id: 1,
    price: 1000,
    stock: 10,
    supplier_id: 1
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    const bodyRequest = JSON.stringify({
        name: this.state.name,
        brand_id: this.state.brand_id,
        price: this.state.price,
        stock: this.state.stock,
        supplier_id: this.state.supplier_id
      });
    e.preventDefault()
    axios.post('http://localhost:5000/api/v1/product/create', 
    bodyRequest,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {console.log(response)})
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failed')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    const bodyRequest = JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        brand_id: this.state.brand_id,
        price: this.state.price,
        stock: this.state.stock,
        supplier_id: this.state.supplier_id
      })
    e.preventDefault()
    axios.put('http://localhost:5000/api/v1/secured/product/update'+bodyRequest.id, 
    bodyRequest,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {console.log(response)})
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failed')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    if(this.props.item){
      const { id, name, brand_id, price, stock, supplier_id } = this.props.item
      this.setState({ id, name, brand_id, price, stock, supplier_id })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Product Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="brand_id">BRAND</Label>
          <Input type="text" name="brand_id" id="brand_id" onChange={this.onChange} value={this.state.brand_id === null ? '' : this.state.brand_id}  />
        </FormGroup>
        <FormGroup>
          <Label for="price">PRICE</Label>
          <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  />
        </FormGroup>
        <FormGroup>
          <Label for="stock">STOCK</Label>
          <Input type="text" name="stock" id="stock" onChange={this.onChange} value={this.state.stock === null ? '' : this.state.stock} />
        </FormGroup>
        <FormGroup>
          <Label for="supplier_id">SUPPLIER</Label>
          <Input type="text" name="supplier_id" id="supplier_id" onChange={this.onChange} value={this.state.supplier_id === null ? '' : this.state.supplier_id} />
        </FormGroup>
        <Button>SAVE</Button>
      </Form>
    );
  }
}

export default AddUpdateFormProduct
