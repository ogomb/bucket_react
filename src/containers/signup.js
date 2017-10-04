import React, { Component } from "react";
import { FormGroup,FormControl,ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/loaderbutton";
import "./signup.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomToast from "../components/customalerts";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading : true});

    const load = {
      'email' : this.state.email,
      'username': this.state.username,
      'password' : this.state.password,
    };

    axios.post('http://127.0.0.1:5000/auth/register', load)
          .then((response) => {
                //alert(response.data.message);
                this.props.history.push("/login");
            }
          )
          .catch(error => {
          this.setState({isLoading : false});
          toast.error(error.response.data.message);
          })
  }

  render() {
    return (
      <div className="Signup">
      <CustomToast/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
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
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <LoaderButton
            id="sigupbutt"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Signup"
              loadingText="Signing up…"
            />
          </form>
        </div>
    );
  }
}
