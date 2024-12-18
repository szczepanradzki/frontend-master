import {gql} from "apollo-boost";

export const getStandardHeights = gql`
    query StandardHeights($name: String) {
        wysokoscKolumnyStandards (where: {name: $name}) {
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
