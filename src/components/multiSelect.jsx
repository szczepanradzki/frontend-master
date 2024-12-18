import React, { useContext, useEffect, useState } from 'react';
import { Block, Input, ListItem } from 'framework7-react';
import { ComposeOffer } from '../js/contexts';

export function MultiSelect({placeholder, data, respAttribute, defaultItem = []}) {
    const {state, dispatch} = useContext(ComposeOffer);
    const [defaultSelected, setDefaultSelected] = useState({});

    useEffect(() => {
        if(defaultItem.length > 0) {
            let element = {};
            defaultItem.forEach(el => {
                element = {
                    ...element,
                    [el.name]: {bool: true, price: el.price}
                };
            });
            setDefaultSelected(element);
        }
    }, []);

    useEffect(() => {
        const names = [];
        let totalPrice = 0;
        Object.keys(defaultSelected).forEach(key => {
            if(defaultSelected[key].bool) {
                names.push(key);
                totalPrice += +defaultSelected[key].price;
            }
        });
        dispatch({type: 'CHANGE', payload: {key: respAttribute, value: names.join('; '), price: totalPrice}});
    }, [defaultSelected]);

    const handleSelected = (e) => {
        const parsedValue = JSON.parse(e.target.value);
        const element = {
            ...defaultSelected,
            [parsedValue.name]: {bool: e.target.checked, price: parsedValue.price}
        };
        setDefaultSelected(element);
    };

    const checkDefaults = (item) => {
        let flag = false;
        if(defaultItem.length > 0) {
            defaultItem.forEach(el => {
                if(el.id === item.id) {
                    flag = true;
                }
            });
        }
        return flag;
    };
    return (
        <Block className="no-padding-left no-padding-right select__multiple">
            <p>{`Wybierz ${placeholder}`}</p>
            <Block className="select__multiple--container">
                {data.map(option => {
                        return (
                            <ListItem key={option.id}
                                      checkbox
                                      value={JSON.stringify(option)}
                                      name={option.name}
                                      title={option.name}
                                      defaultChecked={checkDefaults(option)}
                                      tooltip={option.Opis && option.Opis.short_description}
                                      onChange={handleSelected}
                            />
                        );
                    }
                )}
            </Block>
        </Block>
    );
}
