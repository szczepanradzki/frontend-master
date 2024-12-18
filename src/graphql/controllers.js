import { gql } from "apollo-boost";

export const getControllers = gql`
    query Controllers($name: ID) {
        controllers (where: {name: $name}) {
            id
            name
            Opis {
                short_description
                full_description {
                    url
                }
            }
            opcje_softwares {
                id
                name
                price
                Opis {
                    short_description
                    full_description {
                        url
                    }
                }
            }
        }
    }
`;
