import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import NotFound from "./containers/notfound";
import Login from "./containers/login";
import Signup from "./containers/signup";
import ChangePassword from "./containers/changepassword";

import AllBuckets from "./containers/allbuckets";

export default () =>
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/login"  component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/changepassword" component={ChangePassword} />
    <Route path="/bucket" component={AllBuckets} />
    <Route component={NotFound} />
  </Switch>;
