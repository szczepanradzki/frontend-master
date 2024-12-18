import {gql} from "apollo-boost";

export const searchClients = gql`
    query Clients {
        kliencis {
            id
            name
            street
            houseno
            city
            nip
            zipcode
            email
            phone
        }
    }
`;
