import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink  } from 'react-router-dom';


const Header = () => (
    <header>
        <NavLink exact className="box_nav" activeClassName="active" to="/">
            <div>
              Übersicht
            </div>
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/kunden">
            <div>
              Kunden
            </div>
          </NavLink >
    </header> 
)
export default Header;