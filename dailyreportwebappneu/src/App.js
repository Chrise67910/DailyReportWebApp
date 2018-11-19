import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Kunden from './components/Kunden';
import Uebersicht from './components/Uebersicht';
import Header from './components/Header';
import Aufgaben from './components/Aufgaben';

import "./index.css";
import "./normalize.css";
import "./siemens-report-web.webflow.css";
import "./webflow.css";

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />       
          <Switch>
            <Route path="/kunden" component={Kunden} />
            <Route exact path="/" component={Uebersicht} />
            <Route exact path="/aufgaben" component={Aufgaben} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
