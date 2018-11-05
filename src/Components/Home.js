import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../index.css';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
});

const Customers_QUERY = gql`
  {
    allCustomers{
      name
      street
    }

  }
`;

 client.query({
   query: Customers_QUERY
 }).then(res => console.log(res));

class App extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      checked: [0]
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);

  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
            <Map
              query = {Customers_QUERY}
              item
              xs = { 12 }
              style = { style }
              google = { this.props.google }
              onClick = { this.onMapClick }
              zoom = { 14 }
              initialCenter = {{ lat: 47.4910902, lng: 9.7243652 }}
            > 
              <Marker
                onClick = { this.onMarkerClick }
                title = { 'Changing Colors Garage' }
                position = {{ lat: 47.4910902, lng: 9.7243652 }}
                name = { 'Changing Colors Garage' }
              />
              <InfoWindow
                marker = { this.state.activeMarker }
                visible = { this.state.showingInfoWindow }
              >
                <Paper>
                  <Typography
                    variant = 'headline'
                    component = 'h4'
                  >
                    Changing Colors Garage
                  </Typography>
                  <Typography
                    component = 'p'
                  >
                    98G Albe Dr Newark, DE 19702 <br />
                    302-293-8627
                  </Typography>
                </Paper>
              </InfoWindow>
            </Map>
    );
  }
}



// class CheckboxList extends Component {
//   state = {
//     checked: [0],
//   };

//   handleToggle = value => () => {
//     const { checked } = this.state;
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     this.setState({
//       checked: newChecked,
//     });
//   };

//   render() {
//     const { classes } = this.props;
// /*
//     return (
//         <div className={classes.root}>
//             <List>
//                 {allCustomers.map(customer => (
//                   <ListItem
//                     key={customer}
//                     role={undefined}
//                     dense
//                     button
//                     onClick={this.handleToggle(customer)}
//                     className={classes.listItem}
//                   >
//                     <Checkbox
//                       checked={this.state.checked.indexOf(customer) !== -1}
//                       tabIndex={-1}
//                       disableRipple
//                     />
//                   <ListItemText primary={customer.name}/>
                      
//                     <ListItemSecondaryAction>
//                       <IconButton aria-label="Comments">
//                         <CommentIcon />
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                 ))}
//             </List>
//         </div>
        
//     );
//     */
//   }
// }

// CheckboxList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

//export default withStyles(styles)(App);
export default GoogleApiWrapper({
  api: ('AIzaSyC29LB9hBKKAj5GtTTj6MzipVIXzn7k9bs')
})(App)