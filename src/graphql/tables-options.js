import {gql} from "apollo-boost";

export const getTablesOptions = gql`
    query TablesOptions($name: String) {
        opcjeDoStolows (where: {name: $name}) {
            id
            name
            price
            Opis {
                short_description
                full_description {
                    url
                }
            }
            tables {
                id
            }
        }
    }
`;
