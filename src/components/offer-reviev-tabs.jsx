import React from "react";
import {BlockTitle, Tab, Tabs} from "framework7-react";
import {OfferDetails} from "./offers-details";
import {AddonsDetails} from "./addons-details";

export function ActiveTabReview({offers}) {
    return (
        <Tabs>
            {offers &&
            offers.map((offer, index) =>
                <Tab key={Math.random()} id={`tab-${index + 1}`} className="page-content">
                    <div className="data-table card review-offer">
                        <BlockTitle>
                            <strong>Wybrane elementy</strong>
                        </BlockTitle>
                        <table>
                            <thead>
                            <tr>
                                <th>Typ elementu</th>
                                <th>Nazwa</th>
                                <th>Cena</th>
                            </tr>
                            </thead>
                            <tbody>
                            <OfferDetails offer={offer}/>
                            </tbody>
                        </table>
                        <BlockTitle>
                            <strong>Dodatkowe usługi</strong>
                        </BlockTitle>
                        <table>
                            <thead>
                            <th>Nazwa</th>
                            <th>Cena jednostkowa</th>
                            <th>Ilość</th>
                            <th>Suma</th>
                            </thead>
                            <tbody>
                            <AddonsDetails offer={offer}/>
                            </tbody>
                        </table>
                        <BlockTitle>
                            <strong>Informacje dodatkowe</strong>
                        </BlockTitle>
                        <table>
                            <thead>
                            <th>Komentarz</th>
                            <th>Wartość</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{offer.komentarz}</td>
                                <td>{offer.additionalPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Tab>
            )}
        </Tabs>
    );
}
