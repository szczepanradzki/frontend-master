import {gql} from "apollo-boost";

export const getMailsAddons = gql`
    query MailsAddons {
        mailsAddons {
            id
            pdfs {
                id
                name
                url
            }
            default
        }
    }
`;
