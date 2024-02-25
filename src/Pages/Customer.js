import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ModalFormCustomer from '../Modals/ModalCustomer'
import DataTableCustomer from '../Tables/DataTableCustomer'
import Header from '../Component/Header'



class Customer extends Component {
  state = {
    items: [
      {
        "id": 1,
        "name": "Customer 1",
        "username": "customer1",
        "email": "customer1@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      },
      {
        "id": 2,
        "name": "Customer 2",
        "username": "customer2",
        "email": "customer2@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      },
      {
        "id": 3,
        "name": "Customer 3",
        "username": "customer3",
        "email": "customer3@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      }
    ]
  }

  getCustomerList(){
    axios.get('http://localhost:5000/api/v1/customer/list')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addCustomerItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getCustomerList()
  }

  render() {
    return(
      <Container className="App">
        <Header />
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>LIST CUSTOMER DBO</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTableCustomer items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormCustomer buttonLabel="Register New Customer" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Customer;
