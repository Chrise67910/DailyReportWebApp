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
//import LocationSearchInput from './locationSearchInput';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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
        city
        plz
        street
        lat
        lng
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
      showAddButton: true,
      showItemButton: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handlePlzChange = this.handlePlzChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handlenameChange = this.handlecitychange.bind(this)
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
          variables: { name: this.state.name, street: this.state.strasse, plz: parseInt(this.state.plz), city: this.state.ort, lat: this.state.latitude, lng: this.state.longitude },
          mutation: gql`
              mutation createCustomer($name: String!, $street: String, $plz: Int, $city: String, $lat: Float, $lng: Float){
                  createCustomer(name: $name, street: $street, plz: $plz, city: $city, lat: $lat, lng: $lng) {
                      name
                      street
                      plz
                      city
                      lat
                      lng
                  }
              }
          `,
      }).then((data) => {
          window.location.reload();
          //this._refreshList();
      }).catch(error => {
          console.log(error);
      })
  }

  // -------- Form  ----------
  handleChangeStreet = strasse => {
    this.setState({ strasse });
  };

  handleSelectStreet = selected => {
    this.setState({ isGeocoding: true });
    var strasseWith = selected;
    var strasseWithOut = strasseWith.slice(0,(strasseWith.indexOf(',')));
    this.setState({ strasse: strasseWithOut });
    geocodeByAddress(selected)
        //.then(res => getLatLng(res[0]))
        .then(res => {
            //console.log(res[0]["address_components"]);
            this.setState({
                ort: res[0]["address_components"][2]["long_name"],
                plz: res[0]["address_components"][6]["long_name"],
            }) 
            return getLatLng(res[0]);
        })
        .then(({ lat, lng }) => {
        this.setState({
            latitude: lat,
            longitude: lng,
            isGeocoding: false,
        });
            //console.log(this.state.latitude);
        })
        .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
    })
  };
  // ------ Ende Form --------

  addCustomer() {
    //alert(1);
    this.setState({showAddButton: false});
    this.setState({showForm: true});
    this.setState({showFormEdit: false});
    this.setState({id: ''});
    this.setState({name: ''});
    this.setState({strasse: ''});
    this.setState({plz: ''});
    this.setState({ort: ''});
  }
  _hideForms(event) {
    this.setState({showFormEdit: false});
    this.setState({showForm: false});
    this.setState({showAddButton: true});
    event.preventDefault();
  }
  _showFormEdit(e, customer) {
    this.setState({showAddButton: false});
    this.setState({showForm: false});
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
    console.log("name", this.state.name, "street", this.state.strasse, "plz", parseInt(this.state.plz), "city", this.state.ort, "lat", this.state.latitude, "lng", this.state.longitude);
      client.mutate({
          variables: { id: this.state.id, name: this.state.name, street: this.state.strasse, plz: parseInt(this.state.plz), city: this.state.ort, lat: this.state.latitude, lng: this.state.lng },
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

    if (this.state.showItemButton === true) {
      this.setState({showItemButton: false})
    } else {
      this.setState({showItemButton: true})
    }
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
          {this.state.showAddButton ? (
            <Button style={{backgroundColor: '#009999', color: '#fff', position: 'absolute', right: 100}} onClick={(e) => this.addCustomer(e)}>
              Hinzufügen
            </Button>
          ): (<div></div>)}
            {this.state.showForm ? (
              <form style={{display: 'flex'}}>
                <label>
                  <input placeholder="Name" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                {/* <label>
                  <input placeholder="Straße" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.strasse} onChange={this.handleStreetChange}/>
                </label> */}
                <PlacesAutocomplete
                  value={this.state.strasse}
                  onChange={this.handleChangeStreet}
                  onSelect={this.handleSelectStreet}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                      style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}}
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                
                <label>
                  <input placeholder="Plz" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type='text' value={this.state.plz} onChange={this.handlePlzChange}/>
                </label>
                <label>
                  <input placeholder="Ort" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.ort} onChange={this.handleCityChange}/>
                </label>
                <Button style={{backgroundColor: '#009999', color: '#fff', marginLeft: 5, marginRight: 5, height: 36, width: 117.59}} onClick={this.handleSubmit}>
                  Hinzufügen
                </Button>
                <Button style={{backgroundColor: '#f4f4f4', color: '#000', marginLeft: 5, marginRight: 5, height: 36, width: 117.59}} onClick={(e) => this._hideForms(e)}>
                  Abbrechen
                </Button>
                {/* <input style={{backgroundColor: '#009999', color: '#fff'}} type="submit" value="Submit" onClick={this.handleSubmit} />
                <input style={{borderColor: '#E3E3E3', borderWidth: 1, borderStyle: "solid", color: '#000'}}type="submit" value="Abbrechen" onClick={(e) => this._hideForms(e)} /> */}
              </form>
            ): (<div></div>)}    
            {this.state.showFormEdit ? (
              <form style={{display: 'flex'}}>
                <label>
                  <input placeholder="Name" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                {/* <label>
                  <input placeholder="Straße" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.strasse} onChange={this.handleStreetChange}/>
                </label> */}
                <PlacesAutocomplete
                  value={this.state.strasse}
                  onChange={this.handleChangeStreet}
                  onSelect={this.handleSelectStreet}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                      style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}}
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                        value={this.state.strasse}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <label>
                  <input placeholder="Plz" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type='text' value={this.state.plz} onChange={this.handlePlzChange}/>
                </label>
                <label>
                  <input placeholder="Ort" style={{backgroundColor: '#F1F1F1', borderRadius: 6, border: 'none', padding: 5, marginLeft: 10, marginRight: 10}} type="text" value={this.state.ort} onChange={this.handleCityChange}/>
                </label>
                <Button style={{backgroundColor: '#009999', color: '#fff', marginLeft: 5, marginRight: 5, height: 36, width: 117.59}} onClick={(e) => this.editCustomer(e)}>
                  Ändern
                </Button>
                <Button style={{backgroundColor: '#f4f4f4', color: '#000', marginLeft: 5, marginRight: 5, height: 36, width: 117.59}} onClick={(e) => this._hideForms(e)}>
                  Abbrechen
                </Button>
                {/* <input type="Submit" value="Edit" onClick={(e) => this.editCustomer(e)} />
                <input type="submit" value="Abbrechen" onClick={(e) => this._hideForms(e)} /> */}
              </form>
            ): (<div></div>)}    
          </div>
          <div style={{overflowY: 'scroll', height: 400}}>
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
                      className="KundenListItem"
                      >
                      {/* <Checkbox
                        onClick={this.handleToggle(customer)}
                        checked={this.state.checked.indexOf(customer) !== -1}
                        tabIndex={-1}
                        disableRipple
                      /> */}
                    <ListItemText style={{cursor: 'default', fontSize: 18, width: 400 }} primary={customer.name}/>
                    <ListItemText style={{cursor: 'default', fontSize: 15, textAlign: 'left', flex: 1, flexBasis: '75%'}} secondary={customer.street + ", " + customer.plz + " " + customer.city}/>
                    {/* <ListItemText style={{fontSize: 15 }} secondary={customer.lat + "/" + customer.lng}/> */}
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
            </div> 
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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Kunden);
