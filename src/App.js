import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import './App.css';
import Routes from "./routes";
import RouteNavItem from "./components/routenavitem";


class App extends Component {

  renderView(){
    if(window.localStorage.getItem("token")){
      return (
        <Nav pullRight>
          <Link to="/" onClick={()=> window.localStorage.removeItem("token")}>Logout</Link>
        </Nav>)
    } else {
      return (
        <Nav pullRight>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </Nav>)
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
