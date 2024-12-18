import {gql} from "apollo-boost";

export const fullMachineQuery = gql`
    {
        machines {
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
