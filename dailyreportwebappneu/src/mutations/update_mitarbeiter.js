import gql from 'graphql-tag';
const Mitarbeiter_UPDATE = gql`
    mutation updateWorker($id: ID!, $vorname: String!, $nachname: String!, $street: String, $plz: Int, $city: String){
        updateWorker(id: $id, vorname: $vorname, nachname: $nachname, street: $street, plz: $plz, city: $city) {
            id
            vorname
            nachname
            street
            plz
            city
        }
    }
`;
export default Mitarbeiter_UPDATE;