import {gql} from "apollo-boost";

export const getServices = gql`
    query Services {
        services {
            id
            name
            measurement
            Opis
            price
        }
    }
`;
