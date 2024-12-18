import React, { useContext, useEffect, useState } from "react";
import { List, Input, ListItem, Block } from "framework7-react";
import { ComposeOffer } from "../js/contexts";

export function Select({placeholder, data, respAttribute, defaultItem, checkboxes, getProbes}) {
    const {state, dispatch} = useContext(ComposeOffer);
    const [active, setActive] = useState({});
    const [blums, setBlums] = useState({});
    const [metrols, setMetrols] = useState({});
    const [renishaws, setRenishaws] = useState({});

    useEffect(() => {
        const selectedBlums = state["blums"] && state["blums"].value.split("; ");
        const selectedMetrols = state["metrols"] && state["metrols"].value.split("; ");
        const selectedRenishaws = state["renishaws"] && state["renishaws"].value.split("; ");

        let newBlums = {};
        let newMetrols = {};
        let newRenishaws = {};

        if(respAttribute === "blums" && selectedBlums) {
            const filtered = selectedBlums.map(item =>
                data.filter(element => element.name === item)
            ).flat();
            filtered.map(item => newBlums = {
                ...newBlums,
                [item.name]: {bool: true, price: item.price}
            });
            setBlums(newBlums);
        }

        if(respAttribute === "metrols" && selectedMetrols) {
            const filtered = selectedMetrols.map(item =>
                data.filter(element => element.name === item)
            ).flat();
            filtered.map(item => newMetrols = {
                ...newMetrols,
                [item.name]: {bool: true, price: item.price}
            });
            setMetrols(newMetrols);
        }

        if(respAttribute === "renishaws" && selectedRenishaws) {
            const filtered = selectedRenishaws.map(item =>
                data.filter(element => element.name === item)
            ).flat();
            filtered.map(item => newRenishaws = {
                ...newRenishaws,
                [item.name]: {bool: true, price: item.price}
            });
            setRenishaws(newRenishaws);
        }
    }, []);

    useEffect(() => {
        if(defaultItem.length === 1) {
            setActive(JSON.stringify({name: defaultItem[0].name, price: defaultItem[0].price ? defaultItem[0].price : 0}));
            dispatch({type: 'CHANGE', payload: {key: respAttribute, value: defaultItem[0].name, price: defaultItem[0].price || 0}});
        } else if(defaultItem.length > 1) {
            const names = [];
            let price = 0;
            let selectedBlums = {};
            let selectedMetrols = {};
            let selectedRenishaws = {};
            defaultItem.map(item => {
                names.push(item.name);
                price += item.price;
                if(respAttribute === "blums") {
                    selectedBlums = {
                        ...selectedBlums,
                        [item.name]: {bool: true, price: item.price}
                    };
                }
                if(respAttribute === "metrols") {
                    selectedMetrols = {
                        ...selectedMetrols,
                        [item.name]: {bool: true, price: item.price}
                    };
                }
                if(respAttribute === "renishaws") {
                    selectedRenishaws = {
                        ...selectedRenishaws,
                        [item.name]: {bool: true, price: item.price}
                    };
                }
            });
            setBlums(selectedBlums);
            setMetrols(selectedMetrols);
            setRenishaws(selectedRenishaws);
            dispatch({type: "CHANGE", payload: {key: respAttribute, value: names.join("; "), price: price || 0}});
        }
    }, []);

    useEffect(() => {
        if(state[respAttribute]) {
            setActive(JSON.stringify({name: state[respAttribute].value, price: state[respAttribute].price ? state[respAttribute].price : 0}));
        }
    }, [state]);

    useEffect(() => {
        if(checkboxes) {
            getProbes({blums, metrols, renishaws});
        }
    }, [blums, metrols, renishaws]);

    const handleChange = (name, value) => {
        const selectedValue = JSON.parse(value);
        dispatch({type: "CHANGE", payload: {key: name, value: selectedValue.name, price: selectedValue.price ? selectedValue.price : 0}});
    };

    const handleCheckboxes = (event, price) => {
        switch (event.target.name) {
            case "blums":
                setBlums({
                        ...blums,
                        [event.target.value]: {bool: event.target.checked, price}
                    }
                );
                break;
            case "metrols":
                setMetrols({
                    ...metrols,
                    [event.target.value]: {bool: event.target.checked, price}
                });
                break;
            case "renishaws":
                setRenishaws({
                    ...renishaws,
                    [event.target.value]: {bool: event.target.checked, price}
                });
                break;
            default :
                return true;
        }
    };

    return (
        <List className="list__selectBox"
              noHairlines
        >
            {checkboxes ?
                <Block className="no-padding-left">
                    <p>{`Wybierz ${placeholder}`}</p>
                    {data &&
                    data.map(item => {
                            const selectedBlums = blums && Object.keys(blums).includes(item.name) && blums[item.name].bool;
                            const selectedMetrols = metrols && Object.keys(metrols).includes(item.name) && metrols[item.name].bool;
                            const selectedRenishaws = renishaws && Object.keys(renishaws).includes(item.name) && renishaws[item.name].bool;
                            return (
                                <ListItem key={item.id}
                                          checkbox
                                          value={item.name}
                                          name={respAttribute}
                                          title={item.name}
                                          checked={selectedBlums || selectedMetrols || selectedRenishaws}
                                          tooltip={item.Opis && item.Opis.short_description}
                                          onChange={(e) => handleCheckboxes(e, item.price)}
                                />
                            );
                        }
                    )}
                </Block> :
                <Input
                    type="select"
                    outline
                    name={respAttribute}
                    value={active}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                    <option value={JSON.stringify({name: "", price: 0})}>{`Wybierz ${placeholder}`}</option>
                    {data &&
                    data.map(item => {
                        return (
                            <option key={item.id} value={JSON.stringify({name: item.name, price: item.price ? item.price : 0})}
                                    title={item.Opis ? item.Opis.short_description : ""}
                            >
                                {item.name}
                            </option>);
                    })}
                </Input>
            }
        </List>
    );
}
