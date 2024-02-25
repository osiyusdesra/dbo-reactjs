import React, { useState, Component} from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Header() {
    const [openBasic, setOpenBasic] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='/'>Home</MDBNavbarBrand>
    
            <MDBNavbarToggler
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setOpenBasic(!openBasic)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
    
            <MDBCollapse navbar open={openBasic}>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                  <MDBNavbarLink href='/product'>Product</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/customer'>Customer</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/supplier'>Supplier</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/order'>Order</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
    
              <form className='d-flex input-group w-auto'>
                <input type='search' className='form-control' placeholder='keyword' aria-label='Search' />
                <MDBBtn color='primary'>Search</MDBBtn>
              </form>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      );
}
