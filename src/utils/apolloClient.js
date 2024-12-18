import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth } from "../js/auth";

const auth = new Auth();
const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`
});

const authLink = setContext((_) => {
    return {
        headers: {
            Authorization: `Bearer ${auth.getToken}`
        }
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
