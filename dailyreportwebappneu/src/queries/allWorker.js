import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const all_Worker = gql`
  {
    allWorkers {
      id
      vorname
      nachname
    }
  }
`;
export default all_Worker;