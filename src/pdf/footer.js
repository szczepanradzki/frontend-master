import React from "react";
import {View, Text, StyleSheet} from "@react-pdf/renderer";

export function Footer(props) {
    const styles = StyleSheet.create({
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 35,
            backgroundColor: "#fed100"
        },
        footerText: {
            textAlign: "center",
            fontSize: 6
        },
        pageNumber: {
            fontSize: 8
        }
    });
    return (
        <View style={styles.footer} fixed>
            <View style={{width: 20+"%"}}>
                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </View>
            <View style={{width: 60+"%"}}>
                <Text style={styles.footerText}>FANUC Polska Sp. z o.o., ul. Tadeusza Wendy 2, 52-407 Wrocław , Poland – NIP: PL 894-29-23-341 REGON:
                                                020602752</Text>
                <Text style={styles.footerText}>Rej. BDO 000020848</Text>
                <Text style={[styles.footerText, {marginBottom: 10}]}>Tel.: (+48) 71 77 66 170 Fax: (+48) 71 77 66 179 http://www.fanuc.pl</Text>
                <Text style={styles.footerText}>Deutsche Bank Polska S.A. , Al. Amii Ludowej 26, PL-00-609 Warszawa Poland</Text>
                <Text style={styles.footerText}>PLN bank account number: IBAN: PL68 1880 0009 0000 0011 0181 5000 SWIFT- DEUTPLPX</Text>
                <Text style={styles.footerText}>EUR bank account number: IBAN: PL41 1880 0009 0000 0011 0181 5001 SWIFT- DEUTPLPX</Text>
                <Text style={styles.footerText}>Register of Commerce: KRS 0000291932, FANUC Polska Sp. z o.o. jest Dużym Przedsiębiorcą</Text>
            </View>
            <View style={{width: 20+"%"}}/>
        </View>
    );
}
