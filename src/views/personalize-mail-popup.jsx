import React, { useState, useContext } from "react";
import { Block, Button, Input, Link, Navbar, NavRight, Page, Popup } from "framework7-react";
import { SummaryContext } from "../js/contexts";
import { initialEmail } from "../js/initialPdfTexts";

export function PersonalizeEmailPopup(props) {
    const {dispatchSummary} = useContext(SummaryContext);
    const [editableFields, setEditableFields] = useState(initialEmail);

    const setEditedFields = () => {
        dispatchSummary({type: "CHANGE", payload: {name: "personalizedEmail", value: editableFields}});
    };

    return (
        <Popup className="popup__personalize"
               opened={props.emailPopupOpen}
               onPopupClosed={() => props.setEmailPopupOpen(false)}
        >
            <Page>
                <Navbar title="Personalizacja wiadomości e-mail">
                    <NavRight>
                        <Link popupClose>Zamknij</Link>
                    </NavRight>
                </Navbar>
                <Block>
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wpisz nagłówek"
                           name="title"
                           value={editableFields.title}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   [e.target.name]: e.target.value
                               }
                           )}
                           outline
                    />
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wpisz wiadomość e-mail"
                           name="description"
                           value={editableFields.description}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   [e.target.name]: e.target.value
                               }
                           )}
                           outline
                    />
                </Block>
                <Block>
                    <Button text="Anuluj" popupClose onClick={() => setEditableFields(initialEmail)}/>
                    <Button text="Wstaw" popupClose onClick={() => {
                        setEditedFields(editableFields);
                    }}/>
                </Block>
            </Page>
        </Popup>
    );
}
