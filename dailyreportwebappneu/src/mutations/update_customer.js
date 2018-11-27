import gql from 'graphql-tag';
const Customer_UPDATE = gql`
    mutation updateCustomer($id: ID!, $name: String!, $street: String, $plz: Int, $city: String){
        updateCustomer(id: $id, name: $name, street: $street, plz: $plz, city: $city,) {
            id
            name
            street
            plz
            city
        }
    }
`;
export default Customer_UPDATE;