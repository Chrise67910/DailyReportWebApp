import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink  } from 'react-router-dom';
import ContactIcon from '@material-ui/icons/Contacts';
import PlaceIcon from '@material-ui/icons/Place';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';

const Header = () => (
    <header style={{display: 'flex', paddingBottom: 35, textAlign: 'center'}}>
        <NavLink exact className="box_nav" activeClassName="active" to="/">
            <div style={{display: 'column'}}>
              <PlaceIcon />
              <label>Übersicht</label>
            </div>
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/kunden">
            <div style={{display: 'column'}}>
              <ContactIcon />
              <label>Kunden</label>
            </div>
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/aufgaben">
            <div style={{display: 'column'}}>
              <AssignmentIcon />
              <label>Aufgaben</label>
            </div >
          </NavLink >
          <NavLink  className="box_nav" activeClassName="active" to="/mitarbeiter">
            <div style={{display: 'column'}}>
              <PersonIcon />
              <label>Mitarbeiter</label>
            </div >
          </NavLink >
          <NavLink to="/">
            <img style={{height: 100, width: 'auto', position: 'absolute', right: 100}} src={require('./siemens_logo.png')} />
          </NavLink>
    </header> 
)
export default Header;