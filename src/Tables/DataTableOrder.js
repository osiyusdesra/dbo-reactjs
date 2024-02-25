import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import axios from 'axios';

class DataTableProduct extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      axios.delete('http://localhost:5000/api/v1/secured/order/delete/'+id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  approvePayment = id => {
    let bodyRequest = JSON.stringify({
        order_payment: 1
    })
    let confirmDelete = window.confirm('Approve Payment?')
    if(confirmDelete){
      axios.put('http://localhost:5000/api/v1/secured/order/update/'+id, 
      bodyRequest,
      {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(item => {
        this.props.addItemToState(item)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.product_id}</td>
          <td>{item.quantity}</td>
          <td>{item.total_amount}</td>
          <td>{item.customer_id}</td>
          <td>{item.supplier_id}</td>
          <td>
            <div style={{width:"110px"}}>
                <Button color="success" onClick={() => this.approvePayment(item.id)}>Approve Payment</Button>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Cancel</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>PRODUCT NAME</th>
            <th>QTY</th>
            <th>AMOUNT</th>
            <th>CUSTOMER</th>
            <th>SUPPLIER</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTableProduct