import { gql } from "apollo-boost";

export const getTables = gql`
    query Tables($name: String) {
        tables (where: {name: $name}) {
            id
            name
            Opis {
                short_description
                full_description {
                    url
                }
            }
            price
            opcje_do_stolows {
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
    }
`;
