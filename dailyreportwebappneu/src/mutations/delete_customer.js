import gql from 'graphql-tag';
const Customer_DELETE = gql`
  mutation DeleteCustomer($id: ID!){
      deleteCustomer(id: $id) {
          id
      }
  }
`;
export default Customer_DELETE;