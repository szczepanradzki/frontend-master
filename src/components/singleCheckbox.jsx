import React, { useState } from "react";
import { ListItem } from "framework7-react";

export function SingleCheckbox({name, value, checkHandler, defaultCheck}) {
    const [checked, setChecked] = useState(defaultCheck);

    return (
        <ListItem checkbox
                  name={name}
                  title={name}
                  value={value}
                  checked={checked}
                  onChange={(e) => {
                      checkHandler(e);
                      setChecked(!checked);
                  }}
        />
    );
}
