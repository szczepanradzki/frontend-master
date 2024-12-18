import {gql} from "apollo-boost";

export const getMetrols = gql`
    query Metrols($name: String) {
        metrols (where: {name: $name}) {
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
