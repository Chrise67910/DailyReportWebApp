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
      allCustomers {
        id
        name
        city
        plz
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
      checked: [0],
      showForm: false
    };

    this.handlecitychange = this.handlecitychange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlenameChange = this.handlecitychange.bind(this)
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    checked: [0]
  }
  handlenameChange(e) {
    this.setState({name: e.target.value});
  }

  handlecitychange(e){
    this.setState({city: e.target.value});
  }  

  handleSubmit = (e) => {
    client.mutate({
      variables: { title: card.title, laneId: laneId },
      mutation: gql`
          mutation createTrelloCard($title: String!, $laneId: String!){
              createTrelloCard(title: $title, laneId: $laneId) {
                  id
                  title
                  laneId
              }
          }
      `,
  }).then((data) => {
      //this.fetchCards();
      //this.forceUpdate();
      // var dataStat = this.state.boardData;
      // console.log(dataStat);
      // dataStat.lanes.forEach(lane => {
      //   if (data.data.createTrelloCard.laneId === lane.id) {
      //     lane.cards.forEach(cardE => {
      //       if (data.data.createTrelloCard.title === cardE.title) {
      //         cardE.id = data.data.createTrelloCard.id;
      //       }
      //     })
      //   }
      // })
      // console.log(dataStat);
      // this.setState({boardData: dataStat})
      // console.log(data.data.createTrelloCard.id);
      //card.id = data.data.createTrelloCard.id;
      window.location.reload();
  }).catch(error => {
      console.log(error);
  })
  }
  
  showForm() {
    //alert(1);
    this.setState({showForm: true});
  }

  editCustomer = (customer) => () =>  {
    this.setState({showForm: true});
  }

  deleteCustomer = (customer)  => () => {
    console.log(customer);
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
                      key={customer.id}
                      role={undefined}
                      dense
                      button
                      onClick={this.handleToggle(customer)}
                      className={Kunden.ListItem}
                      >
                      
                      {customer.id }
                    <ListItemText primary={customer.name}/>
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" onClick={this.editCustomer(customer)}>
                          Edit
                        </IconButton>
                        
                        <IconButton aria-label="Comments" onClick={this.deleteCustomer(customer)}>
                        Delete
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>  
                    </List>
                )));                
                } }
                
            </Query>
            <IconButton aria-label="Comments" onClick={(e) => this.showForm(e)}>
              ADD
            </IconButton>
              {this.state.showForm ? (
                <form>
                    Name: 
                    <input type="text" name="name" placeholder="name" ref="name" />
                    Stadt: 
                    <input type="text" name="city" placeholder="city" ref="city" />
                    PLZ: 
                    <input type="text" name="plz" ref="plz"/>
                    Strasse: 
                    <input type="text" name="street" ref="street"/>
                    <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </form>
              ): (<div></div>)}    
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
