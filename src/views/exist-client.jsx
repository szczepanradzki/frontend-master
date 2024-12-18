import React, { useContext, useState } from "react";
import { Block, Popover, BlockTitle, Input, List, Link, ListItem, Radio, Button } from "framework7-react";
import { Query } from "../js/query";
import { searchClients } from "../graphql/clients";
import { PersonalizePopup } from "./personalize-offer-popup";
import { AttachmentsPopup } from "./attachments-popup";
import { SummaryContext } from "../js/contexts";
import { PersonalizeEmailPopup } from "./personalize-mail-popup";

export function ExistClient(props) {
    const {dispatchSummary} = useContext(SummaryContext);
    const [searchingName, setSearchingName] = useState("");
    const [client, setClient] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);
    const [attachmentsPopupOpen, setAttachmentsPopupOpen] = useState(false);
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);

    const handleClientChange = (client, send = false) => {
        props.isSaving(true);
        dispatchSummary({type: "CHANGE", payload: {name: "client", value: client}});
        if(send) {
            if(!!client.email) {
                dispatchSummary({type: "CHANGE", payload: {name: "send", value: send}});
            } else {
                dispatchSummary({type: "CHANGE", payload: {name: "send", value: false}});
                alert("Brak wprowadzonego adresu e-mail");
            }
        }
    };

    return (
        <Block className="list__client">
            <Block>
                <BlockTitle>Znajdź kontrahenta</BlockTitle>
                <Input type="text"
                       placeholder="Wpisz nazwę firmy"
                       onInput={(e) => setSearchingName(e.target.value)}/>
            </Block>
            <Query query={searchClients}>
                {({data: {kliencis}}) => {
                    return (
                        kliencis.length > 0 ?
                            kliencis.map(client => {
                                let popoverClass = (Math.random() + "").replace(/\./g, "");
                                popoverClass = `random-${popoverClass}`;
                                return (
                                    client.name.toLowerCase().match(searchingName.toLowerCase()) &&
                                    <Block key={client.id}>
                                        <Radio value={client.email}
                                               name="client"
                                               className="client-checkbox"
                                               onChange={() => setClient(client)}
                                        />
                                        <Link popoverOpen={`.${popoverClass}`}>{client.name}</Link>
                                        <Popover className={`popover-menu ${popoverClass}`}
                                                 closeOnEscape
                                        >
                                            <List>
                                                <ListItem title="Adres 1" after={`${client.street} ${client.houseno}`}/>
                                                <ListItem title="Adres 2" after={`${client.zipcode} ${client.city}`}/>
                                                <ListItem title="Tel" after={client.phone}/>
                                                <ListItem title="E-mail" after={client.email}/>
                                                <ListItem title="NIP" after={client.nip}/>
                                            </List>
                                        </Popover>
                                    </Block>
                                );
                            }) :
                            <Block>
                                <p>Brak dopasowań</p>
                            </Block>
                    );
                }}
            </Query>
            <Block className="offer-actions center">
                <Button text="Personalizuj dokument oferty"
                        outline
                        onClick={() => {
                            setPopupOpen(true);
                        }}
                />
                <Button text="Personalizuj wiadomość e-mail"
                        outline
                        onClick={() => {
                            setEmailPopupOpen(true);
                        }}
                />
                <Button text="Wybierz dodatkowe załączniki"
                        outline
                        onClick={() => {
                            setAttachmentsPopupOpen(true);
                        }}
                />
                <Button text="Zapisz i wyślij"
                        outline
                        onClick={() => {
                            handleClientChange(client, true);
                        }}
                />
                <Button text="Zapisz"
                        outline
                        onClick={() => {
                            handleClientChange(client);
                        }}
                />
                <Button text="Cofnij"
                        outline
                        onClick={() => {
                            props.getBack();
                        }}
                />
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
        </Block>
    );
}
