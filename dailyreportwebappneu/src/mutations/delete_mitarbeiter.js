import gql from 'graphql-tag';
const Mitarbeiter_DELETE = gql`
  mutation DeleteWorker($id: ID!){
      deleteWorker(id: $id) {
          id
      }
  }
`;
export default Mitarbeiter_DELETE;