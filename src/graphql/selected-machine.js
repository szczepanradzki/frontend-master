import {gql} from "apollo-boost";

export const getSelectedMachine = gql`
    query Machines($name: String) {
        machines (where: {name: $name}) {
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
