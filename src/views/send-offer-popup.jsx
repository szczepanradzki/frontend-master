import React, { useState } from "react";
import { Block, Button, Link, Navbar, NavRight, Page, Popup, Toggle } from "framework7-react";
import { NewClient } from "./new-client";
import { ExistClient } from "./exist-client";

export function SendOfferPopup(props) {
    const [popupContent, setPopupContent] = useState(true);
    const [newClient, setNewClient] = useState(false);

    return (
        <Popup className="popup popup__send-offer"
               opened={props.popupOpen}
               onPopupClosed={() => props.setPopupOpen()}
        >
            <Page>
                <Navbar title="Wyślij ofertę">
                    <NavRight>
                        <Link popupClose onClick={() => setPopupContent(true)}>Zamknij</Link>
                    </NavRight>
                </Navbar>
                <Block>
                    {popupContent ?
                        <Block>
                            <Block className="offer-details">
                                <span>Szczegółowa oferta</span>
                                <Toggle defaultChecked onChange={(e) => props.setDetailedPdf(e.target.checked)}/>
                            </Block>
                            <Block className="offer-details">
                                <span>Czy załączyć wszystkie opisy</span>
                                <Toggle onChange={(e) => props.setFullSpecs(e.target.checked)}/>
                            </Block>
                            <Button text="Nowy klient" onClick={() => {
                                setPopupContent(false);
                                setNewClient(true);
                            }}/>
                            <Button text="Istniejący klient" onClick={() => {
                                setPopupContent(false);
                                setNewClient(false);
                            }}/>
                        </Block>
                        :
                        newClient ?
                            <NewClient getBack={() => {
                                setPopupContent(true);
                                props.setDetailedPdf(true)
                                props.getBack();
                            }}
                                       isSaving={(e) => props.saving(e)}
                            /> :
                            <ExistClient getBack={() => {
                                setPopupContent(true);
                                props.setDetailedPdf(true)
                                props.getBack();
                            }}
                                         isSaving={(e) => props.saving(e)}
                            />
                    }
                </Block>
            </Page>
        </Popup>
    );
}
