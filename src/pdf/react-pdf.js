import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { Header } from "./header";
import { Client } from "./client";
import { DocumentTitle } from "./document-title";
import { DeliveryDetails } from "./delivery-details";
import { CoverLetter } from "./cover-letter";
import { Footer } from "./footer";
import { ContentTable } from "./content-table";

export const ReactPdf = (props) => {

    return (
        <Document title={props.offerNo}>
            <Page size="A4" style={styles.page}>
                <Header/>
                <View style={styles.client}>
                    <Client client={props.client}/>
                    <DocumentTitle offerNo={props.offerNo} user={props.user}/>
                </View>
                <CoverLetter user={props.user} offerNo={props.offerNo} coverLetter={props.coverLetter}/>
                <Text style={styles.safety}>Polityka FANUC zakazuje jakiegokolwiek wykorzystania wszystkich swoich produktów do rozwoju,
                                            produkcji lub gromadzenia zapasów broni jądrowej, biologicznej, chemicznej lub pocisków rakietowych.
                                            Produkty oznaczone jako "DUAL USE GOODS" ("PRODUKTY PODWÓJNEGO ZASTOSOWANIA") są wymienione w
                                            rozporządzeniu Rady (WE) 428/2009 i podlegają kontroli w przypadku wywozu z Unii Europejskiej.
                                            Ponadto każdy dalszy wywóz produktów do innych krajów może podlegać dodatkowym kontrolom zgodnie z
                                            krajowym ustawodawstwem kraju wywozu.</Text>
                <Footer/>
            </Page>
            <Page size="A4" style={styles.page}>
                <Header fixed/>
                <View style={styles.client}>
                    <DeliveryDetails client={props.client} offerTerms={props.offerTerms}/>
                    <DocumentTitle offerNo={props.offerNo} user={props.user}/>
                </View>
                <Text style={styles.tableTitle}>Konfiguracja (opis produktu)</Text>
                <Text style={styles.tableSubtitle}>Lista części podstawowych</Text>
                <ContentTable comment={props.comment}
                              machineCost={props.machineCost}
                              offerNo={props.offerNo}
                              detailed={props.detailed}
                              content={props.content}
                              services={props.services}
                              addedPrice={props.addedPrice}
                              discount={props.discount}
                              discountValue={props.discountValue}
                              total={props.total}
                />
                <Footer/>
            </Page>
        </Document>
    );
};

Font.register({
    family: "Lato-Regular",
    src: "/static/pdf/Lato-Regular.ttf"
});

Font.register({
    family: "Lato-RegularItalic",
    src: "/static/pdf/Lato-RegularItalic.ttf"
});

Font.register({
    family: "Lato-Bold",
    src: "/static/pdf/Lato-Bold.ttf"
});

Font.register({
    family: "Lato-BoldItalic",
    src: "/static/pdf/Lato-BoldItalic.ttf"
});

const styles = StyleSheet.create({
    page: {
        position: "relative",
        paddingTop: 35,
        paddingBottom: 100,
        paddingHorizontal: 35,
        fontFamily: "Lato-Regular"
    },
    client: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    safety: {
        position: "absolute",
        bottom: 100,
        left: 35,
        fontSize: 9
    },
    tableTitle: {
        fontSize: 12,
        fontFamily: "Lato-Bold"
    },
    tableSubtitle: {
        fontSize: 8
    }
});
