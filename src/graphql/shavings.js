import {gql} from "apollo-boost";

export const getShavings = gql`
    query Shavings($name: String) {
        wiories (where: {name: $name}) {
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
