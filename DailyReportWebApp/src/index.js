import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./normalize.css";
import "./siemens-report-web.webflow.css";
import "./webflow.css";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
  IndexRoute
} from "react-router";
import {Home} from "./Components/Home";
import {Customer} from "./Components/Customer";
import {Root} from "./Components/root";


const routing = (
  <Router>
    <div>
      <div className="navigation">
          <NavLink exact activeClassName="active" to="/home">
            <div className="box_nav">
              Übersicht
            </div>
          </NavLink>
          <NavLink activeClassName="active" to="/customer">
          <div className="box_nav">
              Kunden
            </div>
          </NavLink>
          <NavLink activeClassName="active" to="/home">
          <div className="box_nav">
              Einstellungen
            </div>
          </NavLink>
      </div>
      <hr />
      <Switch>
        <Route exact path="/" component={Root} />
        <IndexRoute component={Home} />
        <Route path="/customer" component={Customer} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
