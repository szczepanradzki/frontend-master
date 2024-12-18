import React, { useContext, useEffect, useState } from "react";
import { ComposeOffer } from "../js/contexts";
import { QueriesMap } from "../graphql/queries-map";
import { SummaryTableRow } from "../components/summary-table";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function OfferSummary() {
    const {state} = useContext(ComposeOffer);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const elements = [];
        QueriesMap.filter(element => {
            if(state.hasOwnProperty(element.content)) {
                elements.push({...element, id: state[element.content].value});
            }
        });
        setElements(elements);
    }, []);

    return (
        <div className="data-table card summary-offer">
            <table>
                <thead>
                <tr>
                    <th>Typ elementu</th>
                    <th>Nazwa</th>
                    <th className="text-center">Opis</th>
                    <th>Cena EUR/netto</th>
                </tr>
                </thead>
                <tbody>
                {elements.length > 0 &&
                elements.map(element => {
                        if(element.id) {
                            const singleValue = element.id.split("; ");
                            return singleValue.map(value =>
                                <SummaryTableRow key={element.id}
                                                 query={element.query}
                                                 name={value}
                                                 requested={element.key}
                                                 category={element.name}
                                />
                            );
                        }
                    }
                )}
                <tr style={{borderTop: "1px solid #000"}}>
                    <td colSpan={3} style={{textAlign: "right"}}>Cena maszyny:</td>
                    <td style={{textAlign: "right"}}>{state["machineCost"] && numbersWithSpaces((state["machineCost"].price).toFixed(2))}</td>
                </tr>
                {state["discount"] &&
                <tr>
                    <td colSpan={3} style={{textAlign: "right"}}>Wielkość rabatu:</td>
                    <td style={{textAlign: "right"}}>{state["discount"] && state["discount"].price}%</td>
                </tr>
                }
                {state["discountedValue"] &&
                <tr>
                    <td colSpan={3} style={{textAlign: "right"}}>Kwota rabatu:</td>
                    <td style={{textAlign: "right"}}>
                        {state["discountedValue"] && numbersWithSpaces((+state["discountedValue"].price).toFixed(2))}
                    </td>
                </tr>

                }
                {state["discountedValue"] &&
                <tr>
                    <td colSpan={3} style={{textAlign: "right"}}>Cena maszyny po rabacie:</td>
                    <td style={{textAlign: "right"}}>
                        {(state["machineCost"] && state["discountedValue"]) &&
                        numbersWithSpaces((+state["machineCost"].price - +state["discountedValue"].price).toFixed(2))
                        }
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
}
