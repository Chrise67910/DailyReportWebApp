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

class Aufgaben extends Component {
  state = {boardData: {lanes: []}}

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
        var lane = {'id': element.id, 'title': element.vorname + " " + element.nachname, 'cards': [],'style': { borderRadius: 7, backgroundColor: '#f4f4f4'},'addCardLink': '+ Neue Aufgabe...'};
        jsnRes.lanes.push(lane);                
      })
    ); 
    await client.query({
      query: All_Trello
    }).then(res => 
      res.data.allTrelloCards.forEach(element => {
        console.log(element);
        jsnRes.lanes.forEach(lane => {
          if (element.laneId === lane.id) {
            var card = {'id': element.id, 'title': element.title, 'laneId': element.laneId,'style': { borderRadius: 7, borderBottom: 'none'}};
            lane.cards.push(card)
          }
        });        
      })
    );   
    this.setState({boardData: jsnRes});
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
  
  render() {
    return (
      <div>        
        <Board data={this.state.boardData}
          style={{backgroundColor: 'white', borderRadius: 10, marginTop: 15,height: 600}}
          draggable
          customCardLayout
          handleDragEnd={(cardId, metadata, laneId, position) => this.updateDrag(cardId, metadata, laneId, position)}
          editable
          onCardAdd={(card, laneId) => this.createCard(card, laneId)}
          onCardDelete={(cardId) => this.delCard(cardId)}
          //onDataChange={() => this.forceUpdate()}
        >
          <CustomCard style={{borderRadius: 10}}/>
        </Board>
      </div>
    );
  }
}

const CustomCard = props => {
  return (
    <div style={{borderRadius:10}}>
      <header
        style={{
          marginLeft: 5,
          paddingTop:5,
          paddingBottom: 6,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: props.cardColor,
        }}>
        <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.title}</div>
        <div style={{fontSize: 11}}>{props.dueOn}</div>
      </header>
    </div>
  )
}

export default (Aufgaben)