import {gql} from "apollo-boost";

export const getSpindles = gql`
    query Spindles($name: String) {
        wrzecionas (where: {name: $name}) {
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
