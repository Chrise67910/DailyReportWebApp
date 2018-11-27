import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink  } from 'react-router-dom';
import ContactIcon from '@material-ui/icons/Contacts';
import PlaceIcon from '@material-ui/icons/Place';
import AssignmentIcon from '@material-ui/icons/Assignment';
const Header = () => (
    <header style={{display: 'flex', paddingBottom: 35}}>
        <NavLink exact className="box_nav" activeClassName="active" to="/">
            <div>
              <PlaceIcon />
              Übersicht
            </div>
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/kunden">
            <div>
              <ContactIcon />
              Kunden
            </div>
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/aufgaben">
            <div>
              <AssignmentIcon />
              Aufgaben
            </div>
          </NavLink >
          <img style={{height: 100, width: 'auto', position: 'absolute', right: 100}} src={require('./siemens_logo.png')} />
    </header> 
)
export default Header;