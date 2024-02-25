import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import DataTableOrder from '../Tables/DataTableOrder'
import Header from '../Component/Header'


class Order extends Component {
  state = {
    items: [
      {
        "id": "111111",
        "product_id": "Pipa",
        "quantity": "1",
        "total_amount": "1.000.000",
        "customer_id": "John",
        "supplier_id": "RUCIKA"
      },
      {
        "id": "2342345",
        "product_id": "Pipa",
        "quantity": "10",
        "total_amount": "10.000.000",
        "customer_id": "John Wick",
        "supplier_id": "RUCIKA"
      },
      {
        "id": "34535455",
        "product_id": "Kreamik Granit",
        "quantity": "100",
        "total_amount": "100.000.000",
        "customer_id": "Abel",
        "supplier_id": "Djabesmen"
      },
      {
        "id": "54634453",
        "product_id": "Pipa",
        "quantity": "1",
        "total_amount": "1.000.000",
        "customer_id": "Selvi",
        "supplier_id": "RUCIKA"
      },
      {
        "id": "34534535",
        "product_id": "Keramik Granit",
        "quantity": "10",
        "total_amount": "10.000.000",
        "customer_id": "Bambang",
        "supplier_id": "Djabesmen"
      },
    ]
  }

  getOrderList(){
    axios.get('http://localhost:5000/api/v1/secured/order/list')
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
    this.getOrderList()
  }

  render() {
    return(
      <Container className="App">
        <Header />
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>ORDER DATA DBO</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTableOrder items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Order;
