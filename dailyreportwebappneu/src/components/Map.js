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
import CategoryIcon from '@material-ui/icons/Category';

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
    }
  `;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state={
      types: [],
    }
  }
  // async componentWillMount() {
  //   await client.query({
  //     query: Types_QUERY
  //   }).then(res => 
  //     res.data.allTyps.forEach(element => {
  //       console.log(element);
  //       this.state.types.push(element);                
  //     })
  //   ); 
  //   console.log(this.state.types)
  //   //this.setState({tpyes: res.data.allTyps});
  // }
   render() {

   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 47.2634854, lng: 9.862278 } }
        defaultZoom = { 10 }
      >
      </GoogleMap>
   ));

   return(
    <ApolloProvider client={client}>
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: 688, width: 823, borderRightColor: '#EAEAEA', borderRightWidth: 3, paddingRight: 63, borderRightStyle: 'solid' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        <div style={{position: 'absolute', right: 200, top: 250}}>
          <label>Liste Worker Aufgaben</label> 
          {/* ---------------- Worker Liste mit Aufgaben -------------------- */}
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
                    <List>
                    <ListItem
                      //style={{borderColor: '#E3E3E3', borderWidth: 2, borderStyle: 'solid'}}
                      key={typ.id}
                      role={undefined}
                      >
                      <CategoryIcon style={{color: typ.color }} />
                    <ListItemText style={{fontSize: 18 }} primary={typ.name}/>
                    </ListItem>  
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