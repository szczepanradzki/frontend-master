import React, { Fragment, useState, useEffect, useContext } from "react";
import { Block, Page, Button, BlockTitle, Input, List } from "framework7-react";
import { TopBar } from "../components/topbar";
import { ComposeOffer } from "../js/contexts";
import { Query } from "../js/query";
import { getServices } from "../graphql/additions-services";
import { Checkbox } from "../components/checkbox";
import { useQuery } from "@apollo/react-hooks";
import { getSingleOffer } from "../graphql/single-offer";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function EditOfferAddons(props) {
    const offerNo = props.id.replace(/-/g, "/");
    const {state, dispatch} = useContext(ComposeOffer);
    const [optionalServices, setOptionalServices] = useState({});
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [comment, setComment] = useState("");
    const [totalMachineCost, setTotalMachineCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [defaults, setDefaults] = useState([]);

    const queryMultiple = () => {
        const res1 = useQuery(getSingleOffer, {variables: {offerNo: offerNo || null}});
        const res2 = useQuery(getServices);
        return [res1, res2];
    };

    const [
        {loading: loading1, error: error1, data: data1},
        {loading: loading2, error: error2, data: data2}
    ] = queryMultiple();

    useEffect(() => {
        let totalCost = 0;
        Object.keys(state).map(item => {
            if(state[item].price && (
                item !== "discount" &&
                item !== "addedPrice" &&
                item !== "services" &&
                item !== "discountedValue" &&
                item !== "machineCost" &&
                item !== "priceAfterDiscount")
            ) {
                totalCost += state[item].price;
            }
        });
        setTotalMachineCost(totalCost);
    }, []);
    useEffect(() => {
        if(data1 && data1.oferties[0]["uslugi"]) {
            const splitted = data1.oferties[0].uslugi.split("; ");
            const array = [];
            splitted.map(item => {
                const firstQty = item.indexOf("{");
                const lastQty = item.lastIndexOf("}");
                if(loading2) {
                    return <p>Loading...</p>;
                }
                if(error2) {
                    return <p>Error: {JSON.stringify(error2)}</p>;
                }
                if(data2) {
                    return data2.services.map(service => {
                        if(firstQty === -1) {
                            if(service.name === item) {
                                array.push({name: item, price: service.price || 0});
                            }
                        } else {
                            if(service.name === item.substring(0, firstQty - 1)) {
                                const qty = +item.substring(firstQty + 1, lastQty);
                                array.push({name: item.substring(0, firstQty - 1), quantity: qty, price: qty * service.price || 0});
                            }
                        }
                    });
                }
            });
            let selectedServices = {};
            array.map(item => {
                selectedServices = {
                    ...selectedServices,
                    [item.name]: {qty: item.quantity, price: item.price || 0}
                };
            });
            setOptionalServices(selectedServices);
            setDefaults(array);
        }
    }, [data1, data2]);
    useEffect(() => {
        if(data1) {
            const offer = data1.oferties[0];
            setAdditionalPrice(offer.additionalPrice);
            setComment(offer.komentarz);
            setDiscount(offer.discount);
            discountHandler(offer.discount);
        }
    }, [loading1, error1, data1, totalMachineCost]);
    useEffect(() => {
        dispatch({type: "CHANGE", payload: {key: "discount", price: +discount}});
        dispatch({type: "CHANGE", payload: {key: "discountedValue", price: +discountValue}});
        dispatch({type: "CHANGE", payload: {key: "priceAfterDiscount", price: +priceAfterDiscount}});
        dispatch({type: "CHANGE", payload: {key: "addedPrice", price: +additionalPrice}});
        dispatch({type: "CHANGE", payload: {key: "comment", value: comment}});
        dispatch({type: "CHANGE", payload: {key: "services", value: serviceValueHandler().values, price: serviceValueHandler().price || 0}});
    }, [discount, additionalPrice, comment, optionalServices, discountValue, priceAfterDiscount]);

    const discountHandler = (e) => {
        const discountedValue = (totalMachineCost / 100) * e;
        const discountedPrice = totalMachineCost - discountedValue;
        setDiscount(e);
        setDiscountValue(discountedValue);
        setPriceAfterDiscount(discountedPrice);
    };

    const additionalPriceHandler = (e) => {
        setAdditionalPrice(e);
    };

    const goToSummary = () => {
        dispatch({type: "CHANGE", payload: {key: "machineCost", price: totalMachineCost}});
        props.$f7router.navigate(`/new-offer/${props.id}/3/`);
    };

    const handleCheckboxes = (e) => {
        if(e.checked) {
            if(e.qty) {
                setOptionalServices({
                    ...optionalServices,
                    [e.name]: {qty: e.qty, price: e.price || 0}

                });

            } else {
                setOptionalServices({
                    ...optionalServices,
                    [e.name]: true
                });
            }
        } else {
            Object.keys(optionalServices).map(service => {
                if(service === e.name) {
                    setOptionalServices({
                        ...optionalServices,
                        [e.name]: false
                    });
                }
            });
        }
    };

    const serviceValueHandler = () => {
        const values = Object.keys(optionalServices).map(service => {
            if(optionalServices[service]) {
                return `${service}${typeof optionalServices[service] === "object" ? " {" + optionalServices[service].qty + "}" : ""}`;
            }
        }).filter(item => item).join("; ");
        const price = Object.keys(optionalServices).map(service => {
            if(optionalServices[service]) {
                return optionalServices[service].price ? optionalServices[service].price : 0;
            }
        }).reduce((acc, val = 0) => {
            return acc + val;
        }, 0);
        return {values, price};
    };

    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <Block className="half-container offer-addons">
                <Block className="no-padding-left row">
                    <Input type="number"
                           className="discount"
                           name="discount"
                           outline
                           value={discount}
                           min={0}
                           step={1}
                           placeholder="Rabat"
                           info="%"
                           pattern="[0-9]"
                           validate
                           errorMessage="Podaj prawidłową wartość rabatu"
                           onChange={(e) => discountHandler(e.target.value)}
                    />
                    <Block className="no-padding-right no-margin font-regular">
                        <p>Cena maszyny: {numbersWithSpaces(totalMachineCost.toFixed(2))} EUR/netto</p>
                        {discount > 0 &&
                        <Fragment>
                            <p>Wartość rabatu: {numbersWithSpaces(+discountValue.toFixed(2))} EUR/netto</p>
                            <p>Cena maszyny po rabacie: {numbersWithSpaces(+priceAfterDiscount.toFixed(2))} EUR/netto</p>
                        </Fragment>
                        }
                    </Block>
                </Block>
                <Block className="clear-both no-padding-left services">
                    <BlockTitle large>Usługi dodatkowe</BlockTitle>
                    <Query query={getServices}>
                        {({data: {services}}) =>
                            <List mediaList className="font-regular">
                                {services.map(service => {
                                    return (
                                        <Checkbox key={service.id}
                                                  id={service.id}
                                                  name={service.name}
                                                  after={service.price}
                                                  label="Ilość"
                                                  max={9999}
                                                  min={1}
                                                  qty={service.measurement}
                                                  tooltip={service.Opis}
                                                  defaults={defaults}
                                                  checkboxOutput={e => handleCheckboxes(e)}
                                        />
                                    );
                                })}
                            </List>
                        }
                    </Query>
                </Block>
                <Block className="additional-info row no-padding-left">
                    <BlockTitle large>Dodatkowe informacje</BlockTitle>
                    <Input className="comment-input"
                           type="textarea"
                           name="comment"
                           placeholder="Komentarz do zamówienia"
                           clearButton
                           outline
                           value={comment}
                           onInput={(e) => setComment(e.target.value)}
                    />
                    <Input className="additional-price"
                           type="number"
                           name="additionalPrice"
                           id="additional-price"
                           outline
                           value={additionalPrice}
                           min={0}
                           step={0.01}
                           placeholder="0,00"
                           info="EUR"
                           pattern="^\d+(\.|\,)\d{2}$"
                           validate
                           errorMessage="Podaj prawidłową wartość kwoty"
                           onChange={(e) => additionalPriceHandler(e.target.value)}
                    />
                </Block>
                <Button type="button" onClick={() => goToSummary()} text="Przejdź do podsumowania"/>
            </Block>
        </Page>
    );
};
