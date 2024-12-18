import React, { useState, useEffect } from "react";
import { Page, Block, Popup } from "framework7-react";

export function SavingOfferPopup({saving, popupOpen, setPopupOpen}) {
    const [savingText, setSavingText] = useState("Zapisywanie...");

    useEffect(() => {
        if(saving) {
            setSavingText("Zapisano");
            setTimeout(() => {
                setPopupOpen(false);
                setSavingText("Zapisywanie...");
            }, 2000);
        }
    }, [saving]);

    return (
        <Popup className="popup__saving"
               opened={popupOpen}
               onPopupClosed={() => setPopupOpen(false)}
        >
            <Page>
                <Block>
                    <p className="popup__saving--text">
                        {savingText}
                    </p>
                </Block>
            </Page>
        </Popup>
    );
}
