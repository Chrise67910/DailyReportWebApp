import gql from 'graphql-tag';
const TrelloCard_UPDATE = gql`
    mutation updateTrelloCard($id: ID!, $laneId: String!){
        updateTrelloCard(id: $id, laneId: $laneId) {
            id
            laneId
        }
    }
`;
export default TrelloCard_UPDATE;