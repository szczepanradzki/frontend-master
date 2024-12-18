import {gql} from "apollo-boost";

export const getOffers = gql`
    query Oferty($salesman: String) {
        oferties (
            where: {sprzedawca: $salesman}
            sort: "createdAt:DESC"
        ) {
            id
            createdAt
            updatedAt
            nr_oferty
            maszyna
            automatyzacja
            software
            pozostale
            blum
            sterownik
            klient
            clientEmail
            metrol
            opcje_do_stolow
            renishaw
            uslugi
            stol
            sprzedawca
            wiory
            wrzeciona
            wysokosc_adv
            wysokosc_standard
            komentarz
            additionalPrice
            Suma
            discount
            pdf {
                url
            }
            custom_offer
        }
    }

`;
