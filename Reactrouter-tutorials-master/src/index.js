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
  Switch
} from "react-router-dom";
import Home from "./Components/Home";
import Customer from "./Components/Customer";


const routing = (
  <Router>
    <div>
      <div className="navigation">
          <NavLink exact actvieClassName="active" to="/home">
            <div className="box_nav">
              Übersicht
            </div>
          </NavLink>
          <NavLink actvieClassName="active" to="/customer">
          <div className="box_nav">
              Kunden
            </div>
          </NavLink>
          <NavLink actvieClassName="active" to="/home">
          <div className="box_nav">
              Einstellungen
            </div>
          </NavLink>
      </div>
      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/customer" component={Customer} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
