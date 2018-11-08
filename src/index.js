import React from 'react'
import { ReactDom } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {Home} from './Components/Home';
import {Customer} from './Components/Customer';
import {Root} from './Components/root';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
import { fromPromise } from 'apollo-link';

const app = (
        <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Übersicht</Link>
            </li>
            <li>
              <Link to="/customer">Kunden</Link>
            </li>
          </ul>
  
          <hr />
  
          <Route exact path="/" component={Home} />
          <Route path="/customer" component={Customer} />
        </div>
      </Router>
);


ReactDOM.render(app, document.getElementById('root'))
render((
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  ), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
