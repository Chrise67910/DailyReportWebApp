import React, { Component } from 'react';
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

export class Kunden extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    checked: [0]
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
        <ApolloProvider client={client}> 
          <div className="Kunden">
            <Query query={Customers_QUERY}>
              {({loading, data}) => {
                if(loading) return 'Loading...';
                const {allCustomers} = data;
                //return allCustomers.map(customer => <h1>{customer.name}</h1>);
                
                return (allCustomers.map(customer => (
                  <List>
                  <ListItem
                    key={customer}
                    role={undefined}
                    dense
                    button
                    onClick={this.handleToggle(customer)}
                    className={Kunden.ListItem}
                    >
                    <Checkbox
                      checked={this.state.checked.indexOf(customer) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  <ListItemText primary={customer.name}/>  
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Comments">
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  </List>
                )));
                } }
            </Query>
          </div>
      </ApolloProvider>
    );
  }
}


// export class Customer extends Component {
    
//       state = {
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//         checked: [0]
//       }

  

  
//     handleToggle = value => () => {
//       const { checked } = this.state;
//       const currentIndex = checked.indexOf(value);
//       const newChecked = [...checked];
  
//       if (currentIndex === -1) {
//         newChecked.push(value);
//       } else {
//         newChecked.splice(currentIndex, 1);
//       }
  
//       this.setState({
//         checked: newChecked,
//       });
//     };
  
//     render() {
//       const style = {
//         width: '50vw',
//         height: '75vh',
//         'marginLeft': 'auto',
//         'marginRight': 'auto'
//       }
//       return (
//         <ApolloProvider client={client}> 
//             <div className="Customer">
//               <Query query={Customers_QUERY}>
//                 {({loading, data}) => {
//                   if(loading) return 'Loading...';
//                   const {allCustomers} = data;
//                   //return allCustomers.map(customer => <h1>{customer.name}</h1>);
                  
//                   return (allCustomers.map(customer => (
//                     <List>
//                     <ListItem
//                       key={customer}
//                       role={undefined}
//                       dense
//                       button
//                       onClick={this.handleToggle(customer)}
//                       className={Customer.ListItem}
//                       >
//                       <Checkbox
//                         checked={this.state.checked.indexOf(customer) !== -1}
//                         tabIndex={-1}
//                         disableRipple
//                       />
//                     <ListItemText primary={customer.name}/>  
//                       <ListItemSecondaryAction>
//                         <IconButton aria-label="Comments">
//                           <CommentIcon />
//                         </IconButton>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                     </List>
//                   )));
//                 }};
//               </Query>
//             </div>
//       </ApolloProvider>
//     );
//   }
// }

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Kunden);
