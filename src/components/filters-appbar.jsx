import React from "react";
import {Appbar, Input} from "framework7-react";

export function OfferAppbar({search}) {
    return (
        <Appbar noHairline noShadow className="appbar__filter no-padding-left no-padding-right">
            <Input type="text"
                   className="input__search"
                   name="nr_oferty"
                   placeholder="Nr. oferty"
                   outline
                   clearButton
                   onInput={(e) => search(e.target.name, e.target.value)}
            />
            <Input type="text"
                   className="input__search"
                   name="createdAt"
                   placeholder="Data"
                   outline
                   clearButton
                   onInput={(e) => search(e.target.name, e.target.value)}
            />
            <Input type="text"
                   className="input__search"
                   name="sprzedawca"
                   placeholder="Sprzedawca: Imię i nazwisko"
                   outline
                   clearButton
                   onInput={(e) => search(e.target.name, e.target.value)}
            />
            <Input type="text"
                   className="input__search"
                   name="klient"
                   placeholder="Klient"
                   outline
                   clearButton
                   onInput={(e) => search(e.target.name, e.target.value)}
            />
            <Input type="text"
                   className="input__search"
                   name="clientEmail"
                   placeholder="E-mail klienta"
                   outline
                   clearButton
                   onInput={(e) => search(e.target.name, e.target.value)}
            />
        </Appbar>
    );
}
