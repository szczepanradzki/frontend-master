// Import React
import React from "react";

// Import ReactDOM
import ReactDOM from "react-dom";

// Import F7 Bundle
import Framework7 from "framework7/framework7-lite.esm.bundle.js";

// Import F7-React Plugin
import Framework7React from "framework7-react";

// Init F7-React Plugin
Framework7.use(Framework7React);

// Import Main App component
import App from "../components/app";

// Import styles
import "../css/icons.css";
import "../css/app.scss";
import "framework7/css/framework7.bundle.css";
import "../css/customs.scss";

// Import Apollo
import {ApolloProvider} from "react-apollo";
import {apolloClient} from "../utils/apolloClient";

// Mount React App
ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App/>
    </ApolloProvider>,
    document.getElementById("app")
);
