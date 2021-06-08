import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import AxiosTest from "./library-pages/Axios-Test";

export default class App extends React.Component {
  render(){
    return (
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/axios-test" component={AxiosTest} />
            </Switch>
          </div>
        </Router>
    );
  }
}
