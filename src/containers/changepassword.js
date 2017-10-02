import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./login.css";
import LoaderButton from "../components/loaderbutton";
import CustomToast from "../components/customalerts";


export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      changepassword: "",
      confirmpassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.confirmpassword.length > 0 && this.state.changepassword.length > 0
    this.state.confirmpassword !== this.state.changepassword;
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
      'changepassword' : this.state.changepassword,
    };
    axios({
              url:  'http://127.0.0.1:5000/auth/reset_password',
              method: "post",
              data: load,
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem('token'),
                'content_type' :'application/json'
              }

            })
            .then((response) => {
                  this.props.history.push("/login");
                  
              }
            )
          .catch(error => {
            
            this.setState({isLoading : false});
          })
  }

  render() {
    return (

      <div className="Login">
        <CustomToast/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="changepassword" bsSize="large">
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="confirmpassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
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
            text="Change Password"
            loadingText="Changing …"
          />
        </form>
      </div>
    );
  }
}
