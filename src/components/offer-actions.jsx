import React from "react";
import { Block, Button } from "framework7-react";

export function OfferActions(props) {
    return (
        <Block className="offer-actions">
            <Button type="button"
                    className="btn__action btn__action--confirm"
                    text="Wyślij ofertę"
                    onClick={() => props.setPopupOpen(true)}
            />
            <Button type="button"
                    className="btn__action btn__action--confirm"
                    text="Zapisz ofertę"
                    onClick={() => {
                        props.saveOffer();
                    }}
                    disabled={props.disabled}
            />
            <Button type="button"
                    className="btn__action btn__action--cancel"
                    text="Zakończ"
                    onClick={() => props.closeOffer()}
            />
        </Block>
    );
}
