import React from "react";
import {Page, Card, Link, Block} from "framework7-react";
import {TopBar} from "../components/topbar";

export default (props) => {
    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <Block className="dashboard">
                <Link href="/new-offer/"><Card footer="Nowa oferta"/></Link>
                <Link href="/global-offer/"><Card footer="Oferta główna"/></Link>
                <Link href="/get-offers/"><Card footer="Przeglądaj oferty"/></Link>
            </Block>
        </Page>
    );
}

