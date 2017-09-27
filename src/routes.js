import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import NotFound from "./containers/notfound";
import Login from "./containers/login";
import Signup from "./containers/signup";
import AllBuckets from "./containers/allbuckets";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/bucket" exact component={AllBuckets} />
    <Route component={NotFound} />
  </Switch>;
