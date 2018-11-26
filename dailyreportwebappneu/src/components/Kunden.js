import React, { Component } from 'react';
import '../App.css';
import '../index.css';
import { graphql, ApolloProvider, Query} from 'react-apollo';
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
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      checked: [0]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    checked: [0]
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  addCustomer() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
    
  }

  editCustomer(e, customer) {
    console.log(customer);
  }

  deleteCustomer() {
    console.log('this is:', this);
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
              {({loading, data, error}) => {
                if (loading) {
                  return <p>Loading ...</p>;
                }
                if (error) { 
                  return <p>{error.message}</p>;
                }
                const {allCustomers} = data;
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
                        <IconButton aria-label="Comments" onClick={(e, customer) => this.editCustomer(e, customer)}>
                          Edit
                        </IconButton>
                        <IconButton aria-label="Comments" onClick={(e) => this.deleteCustomer(e)}>
                        Delete
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>  
                    </List>
                )));                
                } }
                
            </Query>
                    <IconButton aria-label="Comments" onClick={() => this.addCustomer()}>
                      ADD
                    </IconButton>
                    
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
