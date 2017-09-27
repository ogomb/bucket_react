import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./login.css";
import LoaderButton from "../components/loaderbutton";
import CustomToast from "../components/customalerts";
import {  toast } from 'react-toastify';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit (event){
    event.preventDefault();
    this.setState({isLoading : true});

    const load = {
      'username': this.state.username,
      'password' : this.state.password,
    };

    axios.post('http://127.0.0.1:5000/auth/login', load)
          .then((response) => {
                //toast(response.data.message);
                localStorage.setItem("token",response.data.token);
                this.props.history.push("/bucket");

            }
          )
          .catch(error => {
            toast.error(error.response.data.message);
            this.setState({isLoading : false});
          })
  }

  render() {
    return (

      <div className="Login">
        <CustomToast/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
