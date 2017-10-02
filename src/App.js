import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import './App.css';
import Routes from "./routes";



class App extends Component {

  renderView(){
    if(window.localStorage.getItem("token")){
      return (
        <Nav pullRight>
          <Link to="/" onClick={()=> window.localStorage.removeItem("token")}>Logout</Link> &nbsp; &nbsp;
          <Link to="/changepassword">Change Password</Link>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <Link to="/signup">Sign up</Link> &nbsp; &nbsp;
          <Link to="/login">Login</Link>
        </Nav>
      )
    }}
  render() {
    return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Bucket List</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
            <Navbar.Collapse>
            {this.renderView()}
          </Navbar.Collapse>
        </Navbar>
      <Routes />
    </div>
    );
  }
}

export default App;
