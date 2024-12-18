import {gql} from "apollo-boost";

export const getBlums = gql`    
    query Blum($name: String) {
        blums (where:  {name: $name}) {
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
