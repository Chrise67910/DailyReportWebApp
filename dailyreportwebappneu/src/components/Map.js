import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import AlbumIcon from '@material-ui/icons/Album';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ApolloClient from 'apollo-boost';
import { graphql, ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
//import { worker } from 'cluster';

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
});

const Types_Query = gql`
    {
      allTyps {
        id
        name
        color
      }

      allWorkers {
        id
        name
        street
        workingOn
      }
    }
  `;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state={
      types: [],
      workers: [],
    }
  }
  async componentWillMount() {
    await client.query({
      query: Types_Query
    }).then(res => 
      res.data.allTyps.forEach(element => {
        console.log(element);
        this.state.types.push(element);                
      })
    ); 
    console.log(this.state.types)

    await client.query({
      query: Types_Query
    }).then(res => 
      res.data.allWorkers.forEach(element => {
        console.log(element);
        this.state.workers.push(element);                
      })
    ); 
    console.log(this.state.workers)
    
    //this.setState({tpyes: res.data.allTyps});
  }
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
          {this.state.workers.map(worker => (
          <List>
            <ListItem>
              <ListItemText>{worker.name}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>{worker.name}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>{worker.name}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>{worker.name}</ListItemText>
            </ListItem>
          </List>
          ))}
        </div>
        <div style={{display: 'flex', paddingTop: 15, paddingBottom: 30}}>
            
              <List>
              {this.state.types.map(typ => (
                <ListItem>
                  <ListItemText>{typ.name}</ListItemText>
                  <ListItemText>{typ.color}</ListItemText>
                </ListItem>
              ))}
              </List> 
        </div>
      </div>
    );
   }
};

export default Map;