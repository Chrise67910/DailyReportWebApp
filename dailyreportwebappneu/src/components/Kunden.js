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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import Customer_DELETE from '../mutations/delete_customer';
import Customer_UPDATE from '../mutations/update_customer';

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
});

const Customers_QUERY = gql`
    {
      allCustomers {
        id
        name
        street
        plz
        city
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
      checked: [0],
      showForm: false,
      name: '',
      strasse: '',
      plz: '',
      ort: '',
      id: '',
      showFormEdit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handlePlzChange = this.handlePlzChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    checked: [0]
  }
  handleChange(event) {
    this.setState({name: event.target.value});
  }
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleStreetChange(event) {
    this.setState({strasse: event.target.value});
  }
  handlePlzChange(event) {
    this.setState({plz: parseInt(event.target.value)});
  }
  handleCityChange(event) {
    this.setState({ort: event.target.value});
  }
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    //alert(this.state.name, this.state.strasse, this.state.plz, this.state.ort);
    //console.log("name", this.state.name, "street", this.state.strasse, "plz", this.state.plz, "city", this.state.ort)
      client.mutate({
          variables: { name: this.state.name, street: this.state.strasse, plz: this.state.plz, city: this.state.ort },
          mutation: gql`
              mutation createCustomer($name: String!, $street: String, $plz: Int, $city: String){
                  createCustomer(name: $name, street: $street, plz: $plz, city: $city) {
                      name
                      street
                      plz
                      city
                  }
              }
          `,
      }).then((data) => {
          window.location.reload();
      }).catch(error => {
          console.log(error);
      })
  }
  
  addCustomer() {
    //alert(1);
    this.setState({showForm: true});
  }
  _showFormEdit(e, customer) {
    this.setState({id: customer.id});
    this.setState({showFormEdit: true});
    this.setState({name: customer.name});
    this.setState({strasse: customer.street});
    this.setState({plz: customer.plz});
    this.setState({ort: customer.city});
  }
  editCustomer(event) {
    event.preventDefault();
    //console.log(customer.name);
    console.log("name", this.state.name, "street", this.state.strasse, "plz", this.state.plz, "city", this.state.ort);
      client.mutate({
          variables: { id: this.state.id, name: this.state.name, street: this.state.strasse, plz: this.state.plz, city: this.state.ort },
          mutation: Customer_UPDATE,
      }).then(() => {
        window.location.reload();
      }).catch(error => {
          console.log(error);
      });
  }
  deleteCustomer = (customer)  => () => {
    console.log(customer);  
      client.mutate({
          variables: { id: customer.id },
          mutation: Customer_DELETE,
      }).then(() => {
        window.location.reload();
      }).catch(error => {
          console.log(error);
      });
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
          <div style={{ height: 100, borderColor: '#E3E3E3', borderBottomWidth: 3, borderBottomStyle: 'solid'}}>
            <Button style={{backgroundColor: '#009999', color: '#fff', position: 'absolute', right: 100}} onClick={(e) => this.addCustomer(e)}>
              Hinzufügen
            </Button>
            {this.state.showForm ? (
              <form style={{display: 'flex'}}>
                <label>
                  Name:
                  <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                  Straße:
                  <input type="text" value={this.state.strasse} onChange={this.handleStreetChange}/>
                </label>
                <label>
                  Plz:
                  <input type='text' value={this.state.plz} onChange={this.handlePlzChange}/>
                </label>
                <label>
                  Ort:
                  <input type="text" value={this.state.ort} onChange={this.handleCityChange}/>
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
              </form>
            ): (<div></div>)}    
            {this.state.showFormEdit ? (
              <form style={{display: 'flex'}}>
                <label>
                  Name:
                  <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                  Straße:
                  <input type="text" value={this.state.strasse} onChange={this.handleStreetChange}/>
                </label>
                <label>
                  Plz:
                  <input type='text' value={this.state.plz} onChange={this.handlePlzChange}/>
                </label>
                <label>
                  Ort:
                  <input type="text" value={this.state.ort} onChange={this.handleCityChange}/>
                </label>
                <input type="Submit" value="Edit" onClick={(e) => this.editCustomer(e)} />
              </form>
            ): (<div></div>)}    
          </div>
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
                      style={{borderColor: '#E3E3E3', borderBottomWidth: 2, borderBottomStyle: 'solid'}}
                      key={customer.id}
                      role={undefined}
                      dense
                      button
                      onClick={this.handleToggle(customer)}
                      className={Kunden.ListItem}
                      >
                      {/* <Checkbox
                        checked={this.state.checked.indexOf(customer) !== -1}
                        tabIndex={-1}
                        disableRipple
                      /> */}
                    <ListItemText style={{fontSize: 18 }} primary={customer.name}/>
                    <ListItemText style={{fontSize: 15}} secondary={customer.street + " " + customer.plz + ", " + customer.city}/>
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" onClick={(e) => this._showFormEdit(e, customer)}>  
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Comments" onClick={this.deleteCustomer(customer)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>  
                    </List>
                )));                
                } }
                
            </Query>
            {/* <IconButton aria-label="Comments" onClick={(e) => this.addCustomer(e)}>
              ADD
            </IconButton>
            {this.state.showForm ? (
              <CustomerForm />
            ): (<div></div>)}     */}
          </div>
      </ApolloProvider>
    );


  }
}
// function CustomerForm() {
//   return(
//     <form style={{display: 'flex'}}>
//       <label>
//         Name:
//         <input type="text" />
//       </label>
//       <label>
//         Straße:
//         <input type="text"/>
//       </label>
//       <label>
//         Plz:
//         <input type="text" />
//       </label>
//       <label>
//         Ort:
//         <input type="text" />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }


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
