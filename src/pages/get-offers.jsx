import React, { useState, useEffect } from "react";
import { BlockTitle, Page, Link, List, ListItem, Tab, Tabs, Block, Icon, Button } from "framework7-react";
import { TopBar } from "../components/topbar";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import { getOffers } from "../graphql/oferty";
import { OfferAppbar } from "../components/filters-appbar";
import { multipleFieldFiltering } from "../js/multi-field-filtering";
import { ActiveTabReview } from "../components/offer-reviev-tabs";

export function GetOffers(props) {
    const [offers, setOffers] = useState(null);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const salesman = {
        name: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("userEmail"),
        phone: sessionStorage.getItem("userPhone"),
        role: sessionStorage.getItem("role")
    };
    const {loading, error, data} = useQuery(getOffers, {
        variables: salesman.role === "administrators" ? null : {salesman: salesman.name}
    });

    useEffect(() => {
        if(data) {
            setOffers(data.oferties);
            setFilteredOffers(data.oferties);
        }
    }, [loading, error, data]);

    useEffect(() => {
        setOffers(multipleFieldFiltering(filteredOffers, activeFilters));
    }, [activeFilters]);

    const dateHandler = (date) => {
        return moment(date).format("yyyy-MM-DD");
    };

    const handlerEditOffer = (offerNo) => {
        const parsedOfferNo = offerNo.replace(/\//g, "-");
        props.$f7router.navigate(`/edit-offer/${parsedOfferNo}/`);
    };

    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <BlockTitle large>
                Przeglądaj zapisane oferty
            </BlockTitle>
            <Block>
                <OfferAppbar search={(name, value) => setActiveFilters({...activeFilters, [name]: value})}/>
            </Block>
            <Block>
                <List>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {JSON.stringify(error)}</p>}
                    {(data && offers) ?
                        offers.map((offer, index) =>
                            <ListItem key={offer.id} className="review__list">
                                <Link tabLink={`#tab-${index + 1}`}
                                      className="item"
                                >
                                    {offer.nr_oferty}
                                </Link>
                                <span className="item">{dateHandler(offer.createdAt)}</span>
                                <span className="item">{offer.sprzedawca}</span>
                                <span className="item">{offer.klient || ""}</span>
                                <span className="item">{offer.clientEmail || ""}</span>
                                <div className="action item">
                                <span>
                                    {offer.pdf &&
                                    <Link href={`${process.env.REACT_APP_BACKEND_URL}${offer.pdf.url}`}
                                          target="_blank"
                                          external
                                    >
                                        <Icon material="picture_as_pdf"/>
                                    </Link>
                                    }
                                </span>
                                    <span>
                                {offer.custom_offer &&
                                <Button onClick={() => handlerEditOffer(offer.nr_oferty)}>
                                    <Icon material="edit"/>
                                </Button>
                                }
                                </span>
                                </div>
                            </ListItem>
                        ) :
                        <p>Brak wyników</p>
                    }
                </List>
            </Block>
            <ActiveTabReview offers={(data && offers) ? offers : []}/>
        </Page>
    );
};
