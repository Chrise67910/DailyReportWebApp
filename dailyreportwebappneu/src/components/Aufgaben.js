import React, { Component } from 'react';
import Board from 'react-trello';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import TrelloCard_DELETE from '../mutations/delete';
import TrelloCard_UPDATE from '../mutations/updateTrelloCard';
import All_Trello from '../queries/allTrello';
import All_Worker from '../queries/allWorker';

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
});
// const CustomBoard = styled(Board)`
//   .Section { border-radius: 10px }
// `;
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
class Aufgaben extends Component {
  state = { boardData: { lanes: [] } }

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    var jsnRes = {
      lanes: [
        //   {
        //     id: 'lane1',
        //     title: 'Mitarbeiter 1',
        //     cards: []
        //   },
        //   {
        //     id: 'lane2',
        //     title: 'Mitarbeiter 2',
        //     cards: []
        //   }
      ]
    }
    await client.query({
      query: All_Worker
    }).then(res =>
      res.data.allWorkers.forEach(element => {
        console.log(element);
        var lane = { 'id': element.id, 'title': element.vorname + " " + element.nachname, 'cards': [], 'style': { borderRadius: 7, backgroundColor: '#f4f4f4' }, 'addCardLink': '+ Neue Aufgabe...' };
        jsnRes.lanes.push(lane);
      })
    );
    await client.query({
      query: All_Trello
    }).then(res =>
      res.data.allTrelloCards.forEach(element => {
        console.log(element);
        console.log('customer', element.customer.name);
        jsnRes.lanes.forEach(lane => {
          if (element.laneId === lane.id) {
            var card = { 'id': element.id, 'title': element.title, 'laneId': element.laneId, 'customer': element.customer.name, 'priority': element.priority, 'style': { borderRadius: 7, borderBottom: 'none' } };
            lane.cards.push(card)
          }
        });
      })
    );
    this.setState({ boardData: jsnRes });
  }
  updateDrag(cardId, metadata, laneId, position) {
    client.mutate({
      variables: { id: cardId, laneId: laneId },
      mutation: TrelloCard_UPDATE,
    }).then(() => {
    }).catch(error => {
      console.log(error);
    });
  }

  delCard(cardId) {
    console.log(cardId);
    client.mutate({
      variables: { id: cardId },
      mutation: TrelloCard_DELETE,
    }).then(() => {
    }).catch(error => {
      console.log(error);
    });
  }
  createCard(card, laneId) {
    console.log(card.customer);
    client.mutate({
      variables: { title: card.title, priority: parseInt(card.prio), laneId: laneId, customerId: card.customer },
      mutation: gql`
            mutation createTrelloCard($title: String!, $priority: Int!, $laneId: String!, $customerId: ID!){
                createTrelloCard(title: $title, priority: $priority, laneId: $laneId, customerId: $customerId) {
                    id
                    title
                    priority
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

  render() {
    return (
      <div>
        <Board data={this.state.boardData}
          style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15, height: 600 }}
          draggable
          customCardLayout
          newCardTemplate={<NewCard />}
          handleDragEnd={(cardId, metadata, laneId, position) => this.updateDrag(cardId, metadata, laneId, position)}
          editable
          onCardAdd={(card, laneId) => this.createCard(card, laneId)}
          onCardDelete={(cardId) => this.delCard(cardId)}
        //onDataChange={() => this.forceUpdate()}
        >
          <CustomCard style={{ borderRadius: 10 }} />
        </Board>
      </div>
    );
  }
}

const CustomCard = props => {
  switch (props.priority) {
    case 0:
      return (
        <div style={{ borderRadius: 10 }}>
          <header
            style={{
              marginLeft: 5,
              paddingTop: 5,
              paddingBottom: 6,
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              color: props.cardColor,
            }}>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
            <div style={{ fontSize: 13 }}>{props.customer}</div>
            <div style={{ fontSize: 11, fontWeight: 'light' }}>Niedrige Priorität</div>
          </header>
        </div>
      );
      break;
    case 1:
    return (
      <div style={{ borderRadius: 10 }}>
        <header
          style={{
            marginLeft: 5,
            paddingTop: 5,
            paddingBottom: 6,
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            color: props.cardColor,
          }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
          <div style={{ fontSize: 13 }}>{props.customer}</div>
          <div style={{ fontSize: 11, fontWeight: 'light' }}>Mittlere Priorität</div>
        </header>
      </div>
    );
      break;
    case 2:
    return (
      <div style={{ borderRadius: 10 }}>
        <header
          style={{
            marginLeft: 5,
            paddingTop: 5,
            paddingBottom: 6,
            //display: 'flex',
            //flexDirection: 'column',
            //justifyContent: 'space-between',
            color: props.cardColor,
          }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
          <div style={{ fontSize: 13}}>{props.customer}</div>
          <div style={{ fontSize: 11, fontWeight: 'light' }}>Hohe Priorität (Störung)</div>
        </header>
      </div>
    );
      break;
    default:
      break;
  }
  // return (
  //   <div style={{ borderRadius: 10 }}>
  //     <header
  //       style={{
  //         marginLeft: 5,
  //         paddingTop: 5,
  //         paddingBottom: 6,
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //         color: props.cardColor,
  //       }}>
  //       <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
  //       <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.customer.name}</div>
  //       <div style={{ fontSize: 11, fontWeight: 'bold' }}>{props.priority}</div>
  //     </header>
  //   </div>
  // )
}
class NewCard extends Component {
  updateField = (field, evt) => {
    this.setState({ [field]: evt.target.value })
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const { onCancel } = this.props
    return (
      <ApolloProvider client={client}>
        <div style={{ background: 'white', borderRadius: 3, border: '1px solid #eee', borderRadius: '10px', width: '250px' }}>
          <div style={{ padding: 5, margin: 5 }}>
            <div>
              <div style={{ marginBottom: 5 }}>
                <input type="text" onChange={evt => this.updateField('title', evt)} style={{ borderRadius: '5px', border: 'none', padding: '10px', backgroundColor: 'rgb(244, 244, 244)', color: 'black', width: '100%', marginBottom: '7px' }} placeholder="Aufgabe" />
              </div>
              <div style={{ marginBottom: 5 }}>
                <select defaultValue="priori" onChange={evt => this.updateField('prio', evt)} style={{ borderRadius: '5px', border: 'none', padding: '10px', backgroundColor: 'rgb(244, 244, 244)', color: 'black', width: '100%', marginBottom: '10px' }}>
                  <option disabled value="priori">Priorität wählen</option>
                  <option value="2">Hohe Priorität (Störung)</option>
                  <option value="1">Mittlere Priorität</option>
                  <option value="0">Niedrige Priorität</option>
                </select>
                <select defaultValue="kunde" onChange={evt => this.updateField('customer', evt)} style={{ borderRadius: '5px', border: 'none', padding: '10px', backgroundColor: 'rgb(244, 244, 244)', color: 'black', width: '100%' }}>
                  <option disabled value="kunde">Kunde auswählen</option>
                  <Query query={Customers_QUERY}>
                    {({ loading, data, error }) => {
                      if (loading) {
                        return "Loading";
                      }
                      if (error) {
                        return "{error.message}";
                      }
                      const { allCustomers } = data;
                      return (allCustomers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      )));
                    }}
                  </Query>
                </select>
              </div>
            </div>
            <button onClick={this.handleAdd} style={{ cursor: 'pointer', backgroundColor: '#099', color: 'white', borderRadius: '5px', marginRight: '10px', padding: '10px', marginTop: '10px' }}>Hinzufügen</button>
            <button onClick={onCancel} style={{ cursor: 'pointer', backgroundColor: 'rgb(244, 244, 244)', color: 'black', borderRadius: '5px', marginRight: '10px', padding: '10px' }}> Abbrechen</button>
          </div>
        </div >
      </ApolloProvider>
    )
  }
}
export default (Aufgaben)