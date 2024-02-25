import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class AddUpdateFormSupplier extends React.Component {
  state = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    address: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    const bodyRequest = JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        address: this.state.address
      });
    e.preventDefault()
    axios.post('http://localhost:5000/api/v1/supplier/register', 
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
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        address: this.state.address
      })
    e.preventDefault()
    axios.put('http://localhost:5000/api/v1/secured/supplier/update'+bodyRequest.id, 
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
      const { id, name, username, email, phone, address } = this.props.item
      this.setState({ id, name, username, email, phone, address })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username === null ? '' : this.state.username}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="08123567890" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}  />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} />
        </FormGroup>
        <Button>SAVE</Button>
      </Form>
    );
  }
}

export default AddUpdateFormSupplier
