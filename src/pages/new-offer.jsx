import React from "react";
import {ChooseMachine} from "../views/choose-machine";

export function NewOffer(props) {
    return (
        <ChooseMachine {...props} redirectTo="new-offer"/>
    );
}

