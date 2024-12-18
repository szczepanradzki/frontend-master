import {gql} from "apollo-boost";

export const getAutomatizations = gql`    
    query Automatiozations($name: String) {
        automatyzacjas (where:  {name: $name}) {
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
