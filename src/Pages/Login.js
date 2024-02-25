import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import axios from "axios";
import "./Login.css";
import Product from "./Product";

async function loginUser(credentials) {
    const bodyRequest = JSON.stringify(credentials)
    return axios.post('http://localhost:5000/api/v1/admin/login', 
    bodyRequest, 
    {  
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        const token = data.data.token;
        return token
    })
      .catch(err => console.log(err))
}

export default function Login({ setToken }) {

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  const handleSubmit = async e => {
    e.preventDefault();
    // const token = "123355576868ksdfbjbsdjfbvdfgfhghg";
    const token = await loginUser({
      "email": email,
      "password": password
    });
    setToken(token);
    setLoggedIn(true);
  }

  if (loggedIn) {
    return <Product />
  }

  return (

    <div className="login-wrapper">
        
        <h1>Admin Log In</h1>

      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">

          <Form.Label>Email</Form.Label>

          <Form.Control

            autoFocus

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          <Form.Label>Password</Form.Label>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>

        <br/>

        <Button block size="lg" type="submit" disabled={!validateForm()}>

          Login

        </Button>

      </Form>

    </div>

  );

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}