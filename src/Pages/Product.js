import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ModalFormProduct from '../Modals/ModalProduct'
import DataTableProduct from '../Tables/DataTableProduct'
import Header from '../Component/Header'



class Product extends Component {
  state = {
    items: [
      {
        "id": 1,
        "name": "Pipa",
        "brand_id": "Rucika",
        "price": "1.000.000",
        "stock": "1000",
        "supplier_id": "RUCIKA"
      },
      {
        "id": 2,
        "name": "Keramik Granit",
        "brand_id": "Djabesmen",
        "price": "1.050.000",
        "stock": "10000",
        "supplier_id": "DJABESMEN"
      }
    ]
  }

  getCustomerList(){
    axios.get('http://localhost:5000/api/v1/product/list')
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
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
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
            <h1 style={{margin: "20px 0"}}>LIST PRODUCT DBO</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTableProduct items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormProduct buttonLabel="Add New Product Data" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Product;
