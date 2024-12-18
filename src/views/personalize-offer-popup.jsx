import React, { useState, useContext } from "react";
import { Block, Button, Input, Link, Navbar, NavRight, Page, Popup } from "framework7-react";
import { SummaryContext } from "../js/contexts";
import { initialState } from "../js/initialPdfTexts";

export function PersonalizePopup(props) {
    const {dispatchSummary} = useContext(SummaryContext);
    const [editableFields, setEditableFields] = useState(initialState);
    const [charsLeft, setCharsLeft] = useState(1500 - editableFields["coverLetter"].text.length);

    const charsLeftHandler = (length) => {
        setCharsLeft(1500 - length);
    };

    const setEditedFields = () => {
        dispatchSummary({type: "CHANGE", payload: {name: "editedFields", value: editableFields}});
    };

    return (
        <Popup className="popup__personalize"
               opened={props.popupOpen}
               onPopupClosed={() => props.setPopupOpen(false)}
        >
            <Page>
                <Navbar title="Personalizacja dokumentu oferty">
                    <NavRight>
                        <Link popupClose>Zamknij</Link>
                    </NavRight>
                </Navbar>
                <Block>
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wprowadź nagłówek powitalny"
                           name="title"
                           value={editableFields["coverLetter"].title}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   coverLetter: {
                                       ...editableFields.coverLetter,
                                       [e.target.name]: e.target.value
                                   }
                               }
                           )}
                           outline
                    />
                    <p className="popup__personalize--chars-left">
                        Pozostała ilość znaków: {charsLeft}
                    </p>
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wprowadź tekst powitalny"
                           name="text"
                           value={editableFields["coverLetter"].text}
                           maxlength={1500}
                           onInput={e => {
                               setEditableFields({
                                   ...editableFields,
                                   coverLetter: {
                                       ...editableFields.coverLetter,
                                       [e.target.name]: e.target.value
                                   }
                               });
                               charsLeftHandler(e.target.value.length);
                           }}
                           outline
                    />
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wprowadź termin dostawy"
                           name="deliveryTerm"
                           value={editableFields["customOfferTerms"].deliveryTerm}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   customOfferTerms: {
                                       ...editableFields.customOfferTerms,
                                       [e.target.name]: e.target.value
                                   }
                               }
                           )}
                           outline
                    />
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wprowadź warunki dostawy"
                           name="deliveryConditions"
                           value={editableFields["customOfferTerms"].deliveryConditions}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   customOfferTerms: {
                                       ...editableFields.customOfferTerms,
                                       [e.target.name]: e.target.value
                                   }
                               }
                           )}
                           outline
                    />
                    <Input type="textarea"
                           className="popup__personalize--textarea"
                           placeholder="Wprowadź warunki płatności"
                           name="paymentConditions"
                           value={editableFields["customOfferTerms"].paymentConditions}
                           onInput={e => setEditableFields({
                                   ...editableFields,
                                   customOfferTerms: {
                                       ...editableFields.customOfferTerms,
                                       [e.target.name]: e.target.value
                                   }
                               }
                           )}
                           outline
                    />
                </Block>
                <Block>
                    <Button text="Anuluj" popupClose onClick={() => setEditableFields(initialState)}/>
                    <Button text="Wstaw" popupClose onClick={() => {
                        setEditedFields(editableFields);
                    }}/>
                </Block>
            </Page>
        </Popup>
    );
}
