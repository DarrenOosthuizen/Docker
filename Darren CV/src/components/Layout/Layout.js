import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import React, { Component } from "react";
import Home from "../Home";
import AboutMe from "../../components/Home/Resume/Resume";
import Projects from "../../components/Home/Work/Project";
import Courses from "../../components/Home/Work/Courses";
import PageNotFound from "../404";
import Aux from "../../hoc/Auxillary" ;

class Layout extends Component {
  render() {
  return (
    <Router>
	<Aux>
      <Switch>
        <Redirect exact from="/" to="/Home" />
        <Route path="/Home" component={Home} />
        <Route exact path="/AboutMe" component={AboutMe} />
        <Route exact path="/Work/Projects" component={Projects} />
        <Route exact path="/Work/Courses" component={Courses} />
        <Route component={PageNotFound} />
      </Switch>
</Aux>
    </Router>
  );
}
}

export default Layout;
