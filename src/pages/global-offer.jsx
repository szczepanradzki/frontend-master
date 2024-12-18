import React from "react";
import {ChooseMachine} from "../views/choose-machine";

export function GlobalOffer(props) {
    return (
        <ChooseMachine {...props} redirectTo="global-offer" />
    )
}
