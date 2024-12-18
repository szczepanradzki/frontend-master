import {gql} from "apollo-boost";

export const getSingleOffer = gql`    
    query Oferty($offerNo: String) {
        oferties (where: {nr_oferty: $offerNo}) {
            id
            createdAt
            updatedAt
            nr_oferty
            maszyna
            automatyzacja
            blum
            sterownik
            software
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
            pozostale
            additionalPrice
            Suma
            discount
            pdf {
                url
            }
        }
    }

`;
