import gql from 'graphql-tag';
const TrelloCard_DELETE = gql`
  mutation DeleteTrelloCard($id: ID!){
      deleteTrelloCard(id: $id) {
          id
      }
  }
`;
export default TrelloCard_DELETE;