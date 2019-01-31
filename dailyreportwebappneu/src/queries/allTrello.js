import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const all_Trello = gql`
  {
    allTrelloCards {
      id
      laneId
      title
      priority
      customer {
        id
        name
      }
    }
  }
`;
export default all_Trello;