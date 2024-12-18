import {gql} from "apollo-boost";

export const getSoftwareOptions = gql`
    query SoftwareOptions($name: String) {
        opcjeSoftwares (where: {name: $name}) {
            id
            name
            Opis {
                short_description
                full_description {
                    url
                }
            }
            price
            default
            controllers {
                id
            }
        }
    }
`;
