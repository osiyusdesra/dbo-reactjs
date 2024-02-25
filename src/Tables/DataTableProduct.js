import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalFormProduct from '../Modals/ModalProduct'
import axios from 'axios';

class DataTableProduct extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      axios.delete('http://localhost:5000/api/v1/secured/product/delete/'+id, {
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

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.brand_id}</td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
          <td>{item.supplier_id}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalFormProduct buttonLabel="VIEW/EDIT" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Supplier</th>
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