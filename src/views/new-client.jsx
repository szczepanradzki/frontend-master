import React, { useState, useContext } from "react";
import { List, ListInput, Button, Block } from "framework7-react";
import axios from "axios";
import { Auth } from "../js/auth";
import { PersonalizePopup } from "./personalize-offer-popup";
import { AttachmentsPopup } from "./attachments-popup";
import { SummaryContext } from "../js/contexts";
import { PersonalizeEmailPopup } from "./personalize-mail-popup";

export function NewClient(props) {
    const auth = new Auth();
    const {dispatchSummary} = useContext(SummaryContext);
    const [clientDetails, setClientDetails] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);
    const [attachmentsPopupOpen, setAttachmentsPopupOpen] = useState(false);

    const handleClientsSet = (e) => {
        setClientDetails({
            ...clientDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleClientChange = (client, send = false) => {
        props.isSaving(true);
        dispatchSummary({type: "CHANGE", payload: {name: "client", value: client}});
        if(send) {
            if(!!clientDetails.email) {
                dispatchSummary({type: "CHANGE", payload: {name: "send", value: send}});
            } else {
                dispatchSummary({type: "CHANGE", payload: {name: "send", value: false}});
                alert("Brak wprowadzonego adresu e-mail");
            }
        }
    };

    const saveClient = async () => {
        const token = auth.getToken;
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/kliencis`, {...clientDetails}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    };

    const searchByNip = async (nip) => {
        const validateNip = nip.indexOf("-") !== -1 ? nip.replace(/-/g, "") : nip;
        setClientDetails({nip: validateNip});
        const request = await axios.post(`/GusApi/regon.php`, {NIP: validateNip});
        const details = request.data;
        setClientDetails({...clientDetails, ...details});
    };

    return (
        <List>
            <ListInput
                outline
                label="Nazwa firmy"
                floatingLabel
                type="text"
                clearButton
                name="name"
                value={clientDetails["name"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="Ulica"
                floatingLabel
                type="text"
                clearButton
                name="street"
                value={clientDetails["street"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="Numer budynku"
                floatingLabel
                type="text"
                clearButton
                name="houseno"
                value={clientDetails["houseno"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="Miasto"
                floatingLabel
                type="text"
                clearButton
                name="city"
                value={clientDetails["city"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="Kod pocztowy"
                floatingLabel
                type="text"
                clearButton
                name="zipcode"
                value={clientDetails["zipcode"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="E-mail"
                floatingLabel
                type="email"
                clearButton
                name="email"
                value={clientDetails["email"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="Telefon"
                floatingLabel
                type="tel"
                clearButton
                name="phone"
                value={clientDetails["phone"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <ListInput
                outline
                label="NIP"
                floatingLabel
                type="text"
                clearButton
                name="nip"
                value={clientDetails["nip"]}
                onChange={(e) => handleClientsSet(e)}
            />
            <Block className="offer-actions center">
                <Button text="Znajdź klienta"
                        outline
                        onClick={() => {
                            searchByNip(clientDetails.nip);
                        }}/>
                <Button text="Personalizuj dokument oferty"
                        outline
                        onClick={() => {
                            setPopupOpen(true);
                        }}/>
                <Button text="Personalizuj wiadomość e-mail"
                        outline
                        onClick={() => {
                            setEmailPopupOpen(true);
                        }}/>
                <Button text="Wybierz dodatkowe załączniki"
                        outline
                        onClick={() => {
                            setAttachmentsPopupOpen(true);
                        }}/>
                <Button text="Zapisz i wyślij"
                        outline
                        onClick={() => {
                            saveClient();
                            handleClientChange(clientDetails, true);
                        }}/>
                <Button text="Zapisz"
                        outline
                        onClick={() => {
                            saveClient();
                            handleClientChange(clientDetails);
                        }}/>
                <Button text="Cofnij"
                        outline
                        onClick={() => {
                            props.getBack();
                        }}/>
            </Block>
            <AttachmentsPopup attachmentsPopupOpen={attachmentsPopupOpen}
                              setAttachmentsPopupOpen={(e) => setAttachmentsPopupOpen(e)}
            />
            <PersonalizePopup popupOpen={popupOpen}
                              setPopupOpen={(e) => setPopupOpen(e)}
            />
            <PersonalizeEmailPopup emailPopupOpen={emailPopupOpen}
                                   setEmailPopupOpen={(e) => setEmailPopupOpen(e)}
            />
        </List>
    );
}
