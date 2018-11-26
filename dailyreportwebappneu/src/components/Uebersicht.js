import React, { Component } from 'react';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";
import {Typography} from "typography";
import {Paper} from "@material-ui/core/Paper";
import gql from 'graphql-tag';
import MAP from '../components/Map.js';





const Uebersicht = () => (
  <div className="Uebersicht">  
    <MAP />
  </div>
 );

 export default Uebersicht;