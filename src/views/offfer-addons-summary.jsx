import React, {useContext, useState, useEffect} from "react";
import {ComposeOffer} from "../js/contexts";
import {Block} from "framework7-react";
import {getServices} from "../graphql/additions-services";
import {useQuery} from "@apollo/react-hooks";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function AddonsSummary() {
    const {state} = useContext(ComposeOffer);
    const [finalServices, setFinalServices] = useState([]);
    const splittedServices = state.services && state.services.value.split("; ");
    const {loading, error, data} = useQuery(getServices);

    useEffect(() => {
        takenServices();
    }, [data]);


    const getQtys = () => {
        if(splittedServices) {
            return splittedServices.map(service => {
                const startIndex = service.indexOf("{");
                const endIndex = service.indexOf("}");
                const amount = +service.substring(startIndex + 1, endIndex);
                return {name: service, qty: amount || null};
            });
        }
    };

    const takenServices = () => {
        if(data) {
            const finalArray = [];
            const allServices = data.services.map(service => service);
            const selectedServices = getQtys() && getQtys().map(service => service);
            if(allServices && selectedServices) {
                allServices.forEach(service => selectedServices.forEach(selected => {
                    const fuIndex = selected.name.indexOf("{");
                    const getName = selected.name.substring(0, fuIndex !== -1 ? fuIndex - 1 : selected.name.length);
                    const cost = service.price * selected.qty;
                    if(getName === service.name) {
                        return finalArray.push({service, cost, qty: selected.qty});
                    }
                }));
            }
            setFinalServices(finalArray);
        }
    };

    return (
        <Block>
            <table className="data-table card summary-offer summary-offer__addons">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Cena jednostkowa</th>
                    <th>Ilość</th>
                    <th>Suma EUR/netto</th>
                </tr>
                </thead>
                <tbody>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {JSON.stringify(error)}</p>}
                {(data && finalServices) && finalServices.map(service =>
                    <tr key={service.service.id}>
                        <td>{service.service.name}</td>
                        <td>{service.service.Opis && service.service.Opis}</td>
                        <td>{numbersWithSpaces(service.service.price) || ""}</td>
                        <td>{service.qty ? service.qty : ""}</td>
                        <td>{service.cost ? numbersWithSpaces(service.cost) : ""}</td>
                    </tr>
                )}
                <tr>
                    <td colSpan={4} style={{textAlign: "right"}}>{state["comment"] ? state["comment"].value : ""}</td>
                    <td>{state["addedPrice"] ? numbersWithSpaces(+state["addedPrice"].price) : ""}</td>
                </tr>
                </tbody>
            </table>
        </Block>
    );
}
