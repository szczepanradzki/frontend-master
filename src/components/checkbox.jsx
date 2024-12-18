import React, { useState, useEffect } from "react";
import { ListItem, ListInput } from "framework7-react";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function Checkbox({id, name, after, tooltip, qty, label, min, max, checkboxOutput, defaults}) {
    const [value, setValue] = useState(min);
    const [inputChecked, setInputChecked] = useState(false);
    const [inputValidated, setInputValidated] = useState(true);

    useEffect(() => {
        if(defaults) {
            defaults.map(item => {
                if(name === item.name) {
                    setInputChecked(true);
                    if(item.quantity) {
                        setValue(item.quantity);
                    }
                }
            });
        }
    }, [defaults]);

    useEffect(() => {
        checkboxOutput({name: name, checked: inputChecked, qty: qty ? +value : 1, price: after ? value * after : 0});
    }, [value, inputChecked]);

    return (
        <ListItem key={id}
                  checkbox
                  name={name}
                  title={name}
                  subtitle={after && `Suma: ${numbersWithSpaces(value * after)}`}
                  after={numbersWithSpaces(after)}
                  tooltip={tooltip}
                  checked={inputValidated ? inputChecked : false}
                  onChange={() => setInputChecked(!inputChecked)}
        >
            {qty &&
            <ListInput type="number"
                       name={name}
                       label={label}
                       inlineLabel={true}
                       min={min}
                       max={max}
                       validate
                       onValidate={(isValid) => setInputValidated(isValid)}
                       outline
                       value={value}
                       required
                       disabled={!inputChecked}
                       onInput={e => setValue(e.target.value)}
            />
            }
        </ListItem>
    );
}
