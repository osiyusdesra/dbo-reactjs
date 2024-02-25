import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ModalFormSupplier from '../Modals/ModalSupplier'
import DataTableSupplier from '../Tables/DataTableSupplier'
import Header from '../Component/Header'


class Supplier extends Component {
  state = {
    items: [
      {
        "id": 1,
        "name": "Supplier 1",
        "username": "Supplier1",
        "email": "Supplier1@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      },
      {
        "id": 2,
        "name": "Supplier 2",
        "username": "Supplier2",
        "email": "Supplier2@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      },
      {
        "id": 3,
        "name": "Supplier 3",
        "username": "Supplier3",
        "email": "Supplier3@mail.com",
        "phone": "081234567890",
        "address": "St. Lorem Ipsum 1"
      }
    ]
  }

  getCustomerList(){
    axios.get('http://localhost:5000/api/v1/supplier/list')
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
            <h1 style={{margin: "20px 0"}}>LIST SUPPLIER DBO</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTableSupplier items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormSupplier buttonLabel="Register New Supplier" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Supplier;
