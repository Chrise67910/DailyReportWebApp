import gql from 'graphql-tag';
const Customer_UPDATE = gql`
    mutation updateCustomer($id: ID!, $name: String!, $street: String, $plz: Int, $city: String, $lat: Float, $lng: Float){
        updateCustomer(id: $id, name: $name, street: $street, plz: $plz, city: $city, lat: $lat, lng: $lng) {
            id
            name
            street
            plz
            city
            lat
            lng
        }
    }
`;
export default Customer_UPDATE;