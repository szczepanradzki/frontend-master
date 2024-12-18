import React, {useEffect, useReducer} from "react";
import {f7ready} from "framework7-react";
import {Device} from "framework7/framework7-lite.esm.bundle.js";
import {
    App,
    View
} from "framework7-react";
import cordovaApp from "../js/cordova-app";
import routes from "../js/routes";
import {Header} from "./header";
import {offerComponent} from "../js/reducer";
import {ComposeOffer} from "../js/contexts";

const f7params = {
    id: "io.framework7.offer",
    name: "Fanuc-Digital-Marketing",
    theme: "auto",
    routes,
    input: {
        scrollIntoViewOnFocus: Device.cordova && !Device.electron,
        scrollIntoViewCentered: Device.cordova && !Device.electron
    },
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false
    }
};

export default () => {
    const [state, dispatch] = useReducer(offerComponent, {});
    useEffect(() => {
        f7ready((f7) => {
            if(Device.cordova) {
                cordovaApp.init(f7);
            }
        });
    });

    return (
        <App params={f7params}>
            <Header/>
            <ComposeOffer.Provider value={{state, dispatch}}>
                <View id="main-view"
                      main
                      pushState={true}
                      pushStateSeparator="#"
                />
            </ComposeOffer.Provider>
        </App>
    );
}
