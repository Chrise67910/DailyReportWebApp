import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import AlbumIcon from '@material-ui/icons/Album';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class Map extends Component {

   render() {

   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 47.2634854, lng: 9.862278 } }
        defaultZoom = { 10 }
      >
      </GoogleMap>
   ));

   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: 688, width: 823, borderRightColor: '#EAEAEA', borderRightWidth: 3, paddingRight: 63, borderRightStyle: 'solid' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        <div style={{position: 'absolute', right: 200, top: 250}}>
          <label>Liste Worker Aufgaben</label>
          <List>
            <ListItem>
              <ListItemText primary={"Lorenz Pschenitschnigg"}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={"Christopher Nagel"}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={"Jakob Sturm"}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={"Julia Moosbrugger"}></ListItemText>
            </ListItem>
          </List>
        </div>
        <div style={{display: 'flex', paddingTop: 15, paddingBottom: 30}}>
          <AlbumIcon style={{color: 'red', fontSize: 30}}/>
          <div>
            <label style={{ paddingLeft: 10, paddingRight: 10,  fontSize: 16}}>
              Wartung
            </label>
          </div>
          <AlbumIcon style={{color: 'green', fontSize: 30}} />
          <div>
            <label style={{ paddingLeft: 10, paddingRight: 10, fontSize: 16}}>Defekt</label>
          </div>
          <AlbumIcon style={{color: 'blue', fontSize: 30}} />
          <div>
            <label style={{ paddingLeft: 10, paddingRight: 10, fontSize: 16}}>Service</label>
          </div>
        </div>
      </div>
   );

   }
};

export default Map;