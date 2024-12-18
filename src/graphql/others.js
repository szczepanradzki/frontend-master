import {gql} from "apollo-boost";

export const getOthers = gql`    
    query Others($name: String) {
        pozostales (where:  {name: $name}) {
            id
            name
            Opis {
                short_description
                full_description {
                    url
                }
            }
            price
        }
    }
`;
