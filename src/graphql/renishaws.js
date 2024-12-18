import {gql} from "apollo-boost";

export const getRenishaws = gql`
    query Renishaws($name: String) {
        renishaws (where: {name: $name}) {
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
