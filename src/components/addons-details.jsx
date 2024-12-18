import React, {Fragment, useEffect, useState} from "react";
import {getServices} from "../graphql/additions-services";
import {useQuery} from "@apollo/react-hooks";

export function AddonsDetails({offer}) {
    const splittedServices = offer.uslugi && offer.uslugi.split("; ");
    const {loading, error, data} = useQuery(getServices);
    const [finalServices, setFinalServices] = useState([]);

    useEffect(() => {
        takenServices();
    }, [data]);

    const getQtys = () => {
        if(splittedServices) {
            return splittedServices.map(service => {
                    const startIndex = service.indexOf("{");
                    const endIndex = service.indexOf("}");
                    return {name: service, qty: +service.substring(startIndex + 1, endIndex)};
                }
            );
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
        <Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {JSON.stringify(error)}</p>}
            {finalServices && finalServices.map(service =>
                <tr key={service.id}>
                    <td>
                        {service.service.name}
                    </td>
                    <td>
                        {service.service.price ? service.service.price : ""}
                    </td>
                    <td>
                        {service.qty ? service.qty : ""}
                    </td>
                    <td>
                        {service.qty ? (service.qty * service.service.price) : ""}
                    </td>
                </tr>
            )}
        </Fragment>
    );
}
