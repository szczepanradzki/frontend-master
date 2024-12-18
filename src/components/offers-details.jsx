import React, {Fragment, useEffect, useState} from "react";
import {QueriesMap} from "../graphql/queries-map";
import {SummaryTableRow} from "./summary-table";

export function OfferDetails({offer}) {
    const [elements, setElements] = useState([]);
    useEffect(() => {
        const elements = [];
        QueriesMap.filter(element => {
            if(offer.hasOwnProperty(element.savedOffer)) {
                if(offer[element.savedOffer]) {
                    elements.push({...element, id: offer[element.savedOffer]});
                }
            }
        });
        setElements(elements);
    }, []);

    return (
        <Fragment>
            {elements.length &&
            elements.map(element => {
                    if(element.id) {
                        const singleValue = element.id.split("; ");
                        return singleValue.map(value =>
                            <SummaryTableRow key={Math.random()}
                                             query={element.query}
                                             name={value}
                                             requested={element.key}
                                             category={element.name}
                                             review
                            />
                        );
                    }
                }
            )}
        </Fragment>
    );
};
