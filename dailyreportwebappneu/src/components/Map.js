import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import AlbumIcon from '@material-ui/icons/Album';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ApolloClient from 'apollo-boost';
import { graphql, ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
//import { worker } from 'cluster';
import CategoryIcon from '@material-ui/icons/Category';
import RadioButton from '@material-ui/icons/RadioButtonChecked';
import Album from '@material-ui/icons/Album';
import Room from '@material-ui/icons/Room';
import Accessible from '@material-ui/icons/Accessible';
import SvgIcon from '@material-ui/core/SvgIcon';

import all_Worker from '../queries/allWorker';
import { TextField, InputLabel, Input } from '@material-ui/core';

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
});

const Types_QUERY = gql`
    {
      allTyps {
        id
        name
        color
      }


      allWorkers {
        id
        vorname
        nachname
        street
        workingOn{
          id
          title
          customer{
            id
            name
            street
            city
            plz
            lat
            lng
          }
          from
          to
          typ{
            color
          }
        }
      }

    }
  `;

class Map extends Component {
  constructor(props) {
    super(props); 
    this.state={
      types: [],
      isMarkerShown: false
    }
    
  }

  _toggleShowInfo(event) {
    if (this.state.showInfoWindow === true) {
      this.setState({showInfoWindow: false})
    } else {
      this.setState({showInfoWindow: true})
    }
  } 
   render() {
    
    
  const GoogleMapExample = withGoogleMap(() =>
    
    <ApolloProvider client = {client}>
    <div>
    <GoogleMap
      defaultZoom={9.8}
      defaultCenter={{lat: 47.2634854, lng: 9.862278}}
    >
    <Query query={Types_QUERY}>
          {({loading, data, error}) => {
            console.log(data);
                  //this.setState({types: data});
                  if (loading) {
                    return <p>Loading ...</p>;
                  }
                  if (error) { 
                    return <p>{error.message}</p>;
                  }
                  const {allWorkers} = data;
                  //console.log("alltypes", allTypes);
                  console.log('data', data);
                  
                  return (allWorkers.map(worker => (
                  <div>
                    {worker.workingOn != null ?
                    <Marker
                      
                      onClick={(e) => { this.setState({ showInfoWindow: true }) }}
                      icon={{url: 'data:image/svg+xml;utf-8, \
                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> \
                        <path fill="'+ worker.workingOn.typ.color + '" d="M7,0C3.13,0,0,3.13,0,7c0,5.25,7,13,7,13s7-7.75,7-13C14,3.13,10.87,0,7,0z M7,9.5C5.62,9.5,4.5,8.38,4.5,7S5.62,4.5,7,4.5 S9.5,5.62,9.5,7S8.38,9.5,7,9.5z" ></path> \
                      </svg>',
                      scaledSize: { width: 30, height: 30},
                      anchor: { x: 15, y: 30 }
                      }}
                      
                      position = {{lat: worker.workingOn.customer.lat, lng: worker.workingOn.customer.lng}}
                    >
                      { this.state.showInfoWindow ?
                        <InfoWindow onCloseclick={(e) => { this.setState({ showInfoWindow: false }) }}>
                          <div>
                            {worker.vorname + " " + worker.nachname + " befindet sich bei " + worker.workingOn.customer.name}
                          </div>
                        </InfoWindow>
                        : null
                      }
                    </Marker>
                    : null}
                  </div>        
                                       
                  )));
                
            }}
        
        </Query>
    </GoogleMap> 
    
    </div>
      
    </ApolloProvider>
  )

   return(
    <ApolloProvider client={client}>
      <div>
        <GoogleMapExample
          isMarkerShown
          position
          containerElement={ <div style={{ height: 510, width: 1040, paddingRight: 63 }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
          
        />
        {/* <Query query={Types_QUERY}>
          
          {({loading, data, error}) => {
                console.log(data);
                //this.setState({types: data});
                if (loading) {
                  return <p>Loading ...</p>;
                }
                if (error) { 
                  return <p>{error.message}</p>;
                }
                const {allWorkers} = data;
                //console.log("alltypes", allTypes);
                console.log('data', data);
                return (allWorkers.map(worker => (
                    <Marker
                    
                    >
                    
                    </Marker>
                    
               )));
              
          }}
        </Query> */}
        <div style={{position: 'absolute', right: 125, top: 190}}>
        <h2 style={{color: "#009999"}}>Statusmeldungen</h2>
        <div style={{overflowY: 'scroll', height: 350, right: 105, top: 250}}>
          <Query query={Types_QUERY}>
          {({loading, data, error}) => {
                console.log(data);
                //this.setState({types: data});
                if (loading) {
                  return <p>Loading ...</p>;
                }
                if (error) { 
                  return <p>{error.message}</p>;
                }
                const {allWorkers} = data;
                //console.log("alltypes", allTypes);
                console.log('data', data);
                return (allWorkers.map(worker => (
          /* ---------------- Worker Liste mit Aufgaben -------------------- */
          
          <List >
            {worker.workingOn != null ?
            <div>
              {this.state.showInfoWindow != true ?
            
                <div style={{cursor:'pointer', marginRight: 20, backgroundColor: "#F4F4F4", borderRadius: 17}}  onClick={(e) => this._toggleShowInfo(e)}>
                  <ListItem>
                    <Room style={{color: worker.workingOn.typ.color}}/>
                      <ListItemText style={{fontWeight: "bold"}}>
                        {worker.vorname + " " + worker.nachname}
                      </ListItemText>
                  </ListItem>
                </div>

                :<div style={{cursor:'pointer', marginRight: 20, backgroundColor: "#F4F4F4", borderRadius: 17}}  onClick={(e) => this._toggleShowInfo(e)}>
                <div>
                  <ListItem>
                    <Room style={{color: worker.workingOn.typ.color}}/>
                      <ListItemText style={{fontWeight: "bold"}}>
                        {worker.vorname + " " + worker.nachname}
                      </ListItemText>
                  </ListItem>
                </div>
                <div style={{paddingBottom: 10}}>
                  <div style={{fontWeight: "bold", paddingLeft: 20}}>
                    {worker.workingOn.customer.name}
                  </div>

                  <div style={{paddingBottom: 10, fontSize: 13, paddingLeft: 20}}>
                    {worker.workingOn.customer.street + ", " + worker.workingOn.customer.plz + " " + worker.workingOn.customer.city}
                  </div>

                  <div style={{fontWeight: "bold", paddingLeft: 20}}>
                    {worker.workingOn.title}
                  </div>
                  <div style={{fontSize: 13, paddingLeft: 20}}>
                    {worker.workingOn.from + "-" + worker.workingOn.to}
                  </div>
                </div>
                </div>}

            </div>
            : null}
          </List>
          
          )))
          } }
          </Query>
        </div>
        </div>
        <div style={{display: 'flex', flexDirection: "row", flexWrap: "wrap",paddingTop: 15, paddingBottom: 30, position: "absolute", right: 105, bottom: 25, width: 293.01}}>
        <Query query={Types_QUERY}>
              {({loading, data, error}) => {
                console.log(data);
                //this.setState({types: data});
                if (loading) {
                  return <p>Loading ...</p>;
                }
                if (error) { 
                  return <p>{error.message}</p>;
                }
                const {allTyps} = data;
                //console.log("alltypes", allTypes);
                console.log('data', data);
                return (allTyps.map(typ => (
                    <List 
                    //style={{position: 'absolute', display: "flexbox", flex: 1, flexDirection: "column", height: 300 ,right: 600, top: 190}}
                    >
                    <div
                    style={{position: "relative", height: 20, width: 90}}
                      //style={{borderColor: '#E3E3E3', borderWidth: 2, borderStyle: 'solid'}}
                      key={typ.id}
                      role={undefined}
                      >
                      
                      <div style={{fontSize: 14 }}>
                      <Room style={{color: typ.color }} />
                      {typ.name}</div>
                    </div>  
                    </List>
                )));                
                } }
                
            </Query>
              {/* <List>
              {this.state.types.map(typ => (
                <ListItem>
                  <ListItemText>{typ.name}</ListItemText>
                  <ListItemText>{typ.color}</ListItemText>
                </ListItem>
              ))}
              </List>  */}
        </div>
      </div>
      </ApolloProvider>
    );
   }
};

export default Map;